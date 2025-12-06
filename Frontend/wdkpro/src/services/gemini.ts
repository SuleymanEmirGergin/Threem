export class GeminiService {
    static async explainZKProof(proofType: 'balance' | 'age'): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 800));
        if (proofType === 'balance') {
            return "This Zero-Knowledge proof cryptographically certifies that you have sufficient funds for this transaction without revealing your total wallet balance or transaction history to the recipient.";
        }
        return "This Zero-Knowledge proof verifies you are over 18 years old based on your committed identity, without revealing your actual birthdate or exact age.";
    }

    static async explainStego(mode: 'pattern' | 'pin' | 'audio'): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 800));
        const explanations = {
            pattern: "Pattern steganography embeds your authorization into the specific timing and path of your drawing, making it harder to replicate than a static password.",
            pin: "This mode hides your PIN entry within a larger set of decoy interactions.",
            audio: "Audio steganography uses a unique sound fingerprint as your key. The actual audio is never sent, only its mathematical derivative."
        };
        return explanations[mode];
    }

    static async getHelp(query: string): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return `[Gemini 3 Pro] I understand you're asking about "${query}". In this wallet, we prioritize privacy using ZK proofs. Your data stays local. (Mock response)`;
    }
}
