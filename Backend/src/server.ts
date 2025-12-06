// src/server.ts
// Minimal Node.js + TypeScript style backend for crypto + stego PoC
// Features:
// - AES-256-GCM / ChaCha20-Poly1305 encryption
// - PBKDF2 key derivation
// - Binary payload with magic header "STEG1"
// - LSB steganography into PNG (R/G/B channels)
// - Embedding trace (which bit -> which pixel/channel)
// - SHA-256 commitment of the embedded payload
// - /encode and /decode HTTP endpoints (Express)

import express from "express";
import multer from "multer";
import crypto from "crypto";
import sharp from "sharp";

const app = express();
const upload = multer();

// Basic JSON parsing for non-file fields
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('docs/demo')); // Serve demo files

// ---- Types & constants ----

const MAGIC_HEADER = "STEG1";

export enum AlgorithmId {
    AES_GCM = 0x01,
    CHACHA20_POLY1305 = 0x02,
}

export type AlgorithmName = "AES-256-GCM" | "ChaCha20-Poly1305";

interface AlgorithmConfig {
    id: AlgorithmId;
    name: AlgorithmName;
    cipherName: string;
    nonceLength: number;
    authTagLength: number;
}

interface EncryptResult {
    payload: Buffer;
    algorithmId: AlgorithmId;
    salt: Buffer;
    nonce: Buffer;
    authTag: Buffer;
    ciphertext: Buffer;
    commitmentHex: string;
}

interface ParsedPayload {
    payload: Buffer; // exact payload slice
    algorithmId: AlgorithmId;
    salt: Buffer;
    nonce: Buffer;
    authTag: Buffer;
    ciphertext: Buffer;
}

type Channel = "R" | "G" | "B";

interface EmbedTraceEntry {
    bitIndex: number;      // which bit in the payload bit stream
    pixelIndex: number;    // index of the pixel (0-based)
    channel: Channel;      // "R" | "G" | "B"
    originalLSB: 0 | 1;    // LSB before embedding
    newLSB: 0 | 1;         // LSB after embedding
}

// ---- Algorithm config helper ----

function getAlgorithmConfig(name: AlgorithmName): AlgorithmConfig {
    if (name === "AES-256-GCM") {
        return {
            id: AlgorithmId.AES_GCM,
            name,
            cipherName: "aes-256-gcm",
            nonceLength: 12,
            authTagLength: 16,
        };
    }
    if (name === "ChaCha20-Poly1305") {
        return {
            id: AlgorithmId.CHACHA20_POLY1305,
            name,
            cipherName: "chacha20-poly1305",
            nonceLength: 12,      // 12 or 24 depending on OpenSSL; 12 is common
            authTagLength: 16,
        };
    }
    throw new Error(`Unsupported algorithm name: ${name}`);
}

// ---- KDF: PBKDF2 (password -> symmetric key) ----

// For PoC purposes we keep the PBKDF2 parameters here.
// In production, you may want higher iteration counts or Argon2.
function deriveKeyPBKDF2(
    password: string,
    salt: Buffer,
    keyLength = 32,
    iterations = 100_000,
    digest = "sha256"
): Buffer {
    return crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest);
}

// ---- Payload format helpers ----
//
// Binary layout:
//
// [0..4]   : 5 bytes magic header ASCII "STEG1"
// [5]      : 1 byte algorithmId
// [6]      : 1 byte saltLength
// [7]      : 1 byte nonceLength
// [8]      : 1 byte authTagLength
// [9..12]  : 4 bytes ciphertextLength (big-endian uint32)
// [13..]   : salt | nonce | authTag | ciphertext

function buildPayload(
    algorithmId: AlgorithmId,
    salt: Buffer,
    nonce: Buffer,
    authTag: Buffer,
    ciphertext: Buffer
): Buffer {
    const saltLen = salt.length;
    const nonceLen = nonce.length;
    const authTagLen = authTag.length;
    const cipherLen = ciphertext.length;

    const headerSize = 13;
    const totalSize =
        headerSize + saltLen + nonceLen + authTagLen + cipherLen;

    const buf = Buffer.alloc(totalSize);
    let offset = 0;

    // Magic
    buf.write(MAGIC_HEADER, offset, "ascii");
    offset += 5;

    // Algorithm Id
    buf.writeUInt8(algorithmId, offset);
    offset += 1;

    // Length fields
    buf.writeUInt8(saltLen, offset);
    offset += 1;

    buf.writeUInt8(nonceLen, offset);
    offset += 1;

    buf.writeUInt8(authTagLen, offset);
    offset += 1;

    buf.writeUInt32BE(cipherLen, offset);
    offset += 4;

    // Binary data
    salt.copy(buf, offset);
    offset += saltLen;

    nonce.copy(buf, offset);
    offset += nonceLen;

    authTag.copy(buf, offset);
    offset += authTagLen;

    ciphertext.copy(buf, offset);
    offset += cipherLen;

    return buf;
}

function parsePayload(buf: Buffer): ParsedPayload {
    if (buf.length < 13) {
        throw new Error("Payload too short");
    }

    let offset = 0;
    const magic = buf.subarray(offset, offset + 5).toString("ascii");
    if (magic !== MAGIC_HEADER) {
        throw new Error("Invalid magic header, not a STEG1 payload");
    }
    offset += 5;

    const algorithmId = buf.readUInt8(offset) as AlgorithmId;
    offset += 1;

    const saltLen = buf.readUInt8(offset);
    offset += 1;

    const nonceLen = buf.readUInt8(offset);
    offset += 1;

    const authTagLen = buf.readUInt8(offset);
    offset += 1;

    const cipherLen = buf.readUInt32BE(offset);
    offset += 4;

    const minSize =
        13 + saltLen + nonceLen + authTagLen + cipherLen;
    if (buf.length < minSize) {
        throw new Error("Buffer too small for declared payload size");
    }

    const salt = buf.subarray(offset, offset + saltLen);
    offset += saltLen;

    const nonce = buf.subarray(offset, offset + nonceLen);
    offset += nonceLen;

    const authTag = buf.subarray(offset, offset + authTagLen);
    offset += authTagLen;

    const ciphertext = buf.subarray(offset, offset + cipherLen);
    offset += cipherLen;

    const exactPayload = buf.subarray(0, offset);

    return {
        payload: exactPayload,
        algorithmId,
        salt,
        nonce,
        authTag,
        ciphertext,
    };
}

// ---- Crypto: encrypt ----

export function encryptData(
    data: string,
    password: string,
    algorithmName: AlgorithmName
): EncryptResult {
    const cfg = getAlgorithmConfig(algorithmName);

    const salt = crypto.randomBytes(16);
    const key = deriveKeyPBKDF2(password, salt, 32);

    const nonce = crypto.randomBytes(cfg.nonceLength);

    const cipher = crypto.createCipheriv(cfg.cipherName, key, nonce, {
        authTagLength: cfg.authTagLength,
    } as any);

    const ciphertext = Buffer.concat([
        cipher.update(data, "utf8"),
        cipher.final(),
    ]);

    const authTag = (cipher as any).getAuthTag();

    const payload = buildPayload(
        cfg.id,
        salt,
        nonce,
        authTag,
        ciphertext
    );

    const commitmentHex = crypto
        .createHash("sha256")
        .update(payload)
        .digest("hex");

    return {
        payload,
        algorithmId: cfg.id,
        salt,
        nonce,
        authTag,
        ciphertext,
        commitmentHex,
    };
}

// ---- Bit helpers ----

function bufferToBitArray(buf: Buffer): number[] {
    const bits: number[] = [];
    for (let i = 0; i < buf.length; i++) {
        const byte = buf[i];
        // big-endian bit order (MSB first)
        for (let b = 7; b >= 0; b--) {
            bits.push((byte >> b) & 1);
        }
    }
    return bits;
}

// ---- Stego: Embed payload into PNG via RGB LSBs ----

export async function embedPayloadIntoPng(
    imageBuffer: Buffer,
    payloadBytes: Buffer
): Promise<{
    stegoImageBuffer: Buffer;
    embedTrace: EmbedTraceEntry[];
    capacityBits: number;
    payloadBits: number;
}> {
    // Use sharp to get raw pixel data
    const { data, info } = await sharp(imageBuffer)
        .ensureAlpha() // RGBA
        .raw()
        .toBuffer({ resolveWithObject: true });

    const pixelCount = info.width * info.height;
    const channelsPerPixel = 4; // RGBA
    const usableChannels = 3; // R,G,B only

    const capacityBits = pixelCount * usableChannels;

    const payloadBitsArray = bufferToBitArray(payloadBytes);
    const payloadBits = payloadBitsArray.length;

    if (payloadBits > capacityBits) {
        throw new Error(
            `Image not big enough: capacity=${capacityBits} bits, payload=${payloadBits} bits`
        );
    }

    const embedTrace: EmbedTraceEntry[] = [];

    let bitIndex = 0;
    const channelNames: Channel[] = ["R", "G", "B"];

    for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex++) {
        for (let c = 0; c < usableChannels; c++) {
            if (bitIndex >= payloadBits) {
                break;
            }

            const bit = payloadBitsArray[bitIndex];
            const channelOffset =
                pixelIndex * channelsPerPixel + c;
            const original = data[channelOffset];
            const originalLSB = (original & 1) as 0 | 1;
            const newValue = (original & 0xfe) | bit;
            const newLSB = (newValue & 1) as 0 | 1;

            data[channelOffset] = newValue;

            embedTrace.push({
                bitIndex,
                pixelIndex,
                channel: channelNames[c],
                originalLSB,
                newLSB,
            });

            bitIndex++;
        }
        if (bitIndex >= payloadBits) {
            break;
        }
    }

    const stegoImageBuffer = await sharp(data, {
        raw: {
            width: info.width,
            height: info.height,
            channels: channelsPerPixel,
        },
    })
        .png()
        .toBuffer();

    return {
        stegoImageBuffer,
        embedTrace,
        capacityBits,
        payloadBits,
    };
}

// ---- HTTP routes ----

// POST /encode
// Form-data:
// - image: PNG file
// - type: "text" | "number" | "file" | "audio"
// - content: text content or number string
// - secretFile: file (if type=file)
// - audioFile: file (if type=audio)
// - password: passphrase
// - algorithm: "AES-256-GCM" or "ChaCha20-Poly1305"
app.post(
    "/encode",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "secretFile", maxCount: 1 },
        { name: "audioFile", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const imageFile = files["image"]?.[0];

            if (!imageFile) {
                return res
                    .status(400)
                    .json({ error: "Image file is required" });
            }

            if (
                imageFile.mimetype !== "image/png" &&
                !imageFile.originalname.toLowerCase().endsWith(".png")
            ) {
                return res.status(400).json({
                    error: "Only PNG images are supported",
                });
            }

            const type = req.body.type;
            const password = req.body.password;
            const algorithm = req.body.algorithm as AlgorithmName;

            if (!type || !password || !algorithm) {
                return res.status(400).json({
                    error: "Missing type, password or algorithm fields",
                });
            }

            if (
                algorithm !== "AES-256-GCM" &&
                algorithm !== "ChaCha20-Poly1305"
            ) {
                return res.status(400).json({
                    error: "Unsupported algorithm. Use AES-256-GCM or ChaCha20-Poly1305",
                });
            }

            let secretData: any = { type };

            if (type === "text") {
                secretData.content = req.body.content;
            } else if (type === "number") {
                secretData.content = req.body.content; // Keep as string to preserve precision if needed, or just consistency
            } else if (type === "file") {
                const secretFile = files["secretFile"]?.[0];
                if (!secretFile) {
                    return res.status(400).json({ error: "Secret file is required for type 'file'" });
                }
                secretData.content = secretFile.buffer.toString("base64");
                secretData.fileName = secretFile.originalname;
                secretData.mimeType = secretFile.mimetype;
            } else if (type === "audio") {
                const audioFile = files["audioFile"]?.[0];
                if (!audioFile) {
                    return res.status(400).json({ error: "Audio file is required for type 'audio'" });
                }
                secretData.content = audioFile.buffer.toString("base64");
                secretData.mimeType = audioFile.mimetype;
            } else {
                return res.status(400).json({ error: "Invalid type" });
            }

            const payloadString = JSON.stringify(secretData);
            const imageBuffer = imageFile.buffer;

            // 1) Encrypt secret data into binary payload
            const enc = encryptData(payloadString, password, algorithm);

            // 2) Embed payload into PNG via LSB steganography
            const {
                stegoImageBuffer,
                embedTrace,
                capacityBits,
                payloadBits,
            } = await embedPayloadIntoPng(
                imageBuffer,
                enc.payload
            );

            const stegoBase64 = stegoImageBuffer.toString("base64");

            return res.json({
                stegoImageBase64: stegoBase64,
                mimeType: "image/png",
                debug: {
                    algorithmId: enc.algorithmId,
                    algorithmName: algorithm,
                    payloadBytes: enc.payload.length,
                    payloadBits,
                    capacityBits,
                    capacityUsagePercent:
                        (payloadBits / capacityBits) * 100,
                    saltHex: enc.salt.toString("hex"),
                    nonceHex: enc.nonce.toString("hex"),
                    authTagHex: enc.authTag.toString("hex"),
                    ciphertextBytes: enc.ciphertext.length,
                    commitmentHex: enc.commitmentHex,
                },
                embeddingTrace: embedTrace,
            });
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({
                error:
                    err?.message ||
                    "Internal error during encode",
            });
        }
    }
);

// ---- Start server ----

const PORT = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(
            `Crypto+Stego PoC server running on http://localhost:${PORT}`
        );
    });
}
