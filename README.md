# Threem

Threem, steganografi ve şifreleme teknolojilerini kullanan modern bir full-stack uygulama projesidir. Proje, React tabanlı frontend uygulamaları ve Node.js/Express tabanlı backend servislerinden oluşmaktadır.

## 📁 Proje Yapısı

Proje iki ana dizinden oluşmaktadır:

```
Threem/
├── Backend/          # Backend API ve steganografi servisleri
│   ├── src/          # Kaynak kodlar
│   ├── docs/         # Dokümantasyon ve demo dosyaları
│   └── package.json
│
└── Frontend/         # Frontend uygulamaları
    ├── wdkpro/       # Ana frontend uygulaması (WDK Pro)
    ├── genel transfer/  # Genel transfer uygulaması
    ├── login ekranı/   # Login ekranı uygulaması
    └── zk teknolojisi/ # Zero-Knowledge teknolojisi uygulaması
```

## 🛠️ Kullanılan Teknolojiler

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Dil**: TypeScript
- **Görüntü İşleme**: Sharp, PNGjs
- **Özellikler**: Steganografi, Dosya Yükleme (Multer), AES-256-GCM, ChaCha20-Poly1305

### Frontend (WDK Pro)
- **Framework**: React (Vite ile)
- **Stil**: Tailwind CSS
- **UI Bileşenleri**: Radix UI
- **State Yönetimi**: Zustand
- **Animasyon**: Framer Motion
- **Validasyon**: Zod & React Hook Form

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v18 veya üzeri önerilir)
- npm veya yarn

### Backend Kurulumu

1. Backend dizinine gidin:
   ```bash
   cd Backend
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme modunda çalıştırın:
   ```bash
   npm run dev
   ```
   veya production build için:
   ```bash
   npm run build
   npm run start:prod
   ```

   Backend varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

### Frontend Kurulumu (WDK Pro)

1. Frontend dizinine gidin:
   ```bash
   cd Frontend/wdkpro
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

4. Production build için:
   ```bash
   npm run build
   npm run preview
   ```

### Diğer Frontend Projeleri

Proje içinde aşağıdaki ek frontend uygulamaları da bulunmaktadır:

#### Genel Transfer
```bash
cd Frontend/genel\ transfer
npm install
npm run dev
```

#### Login Ekranı
```bash
cd Frontend/login\ ekranı
npm install
npm run dev
```

#### ZK Teknolojisi
```bash
cd Frontend/zk\ teknolojisi
# Bu proje için package.json kontrol edin
```

## ✨ Özellikler

### Backend
- **Steganografi**: Verileri görüntüler içinde gizleme
- **Şifreleme**: AES-256-GCM ve ChaCha20-Poly1305 algoritmaları
- **Çoklu Veri Tipi Desteği**: Metin, sayı, dosya ve ses kayıtları
- **RESTful API**: `/encode` endpoint'i ile veri gömme

### Frontend (WDK Pro)
- **Modern UI**: Responsive ve erişilebilir arayüz
- **Steganografi Yönetimi**: Görüntü içinde veri saklama ve çıkarma
- **Güvenlik**: İki faktörlü kimlik doğrulama (2FA)
- **Zero-Knowledge Proof**: ZK teknolojisi entegrasyonu
- **Cüzdan Yönetimi**: Kripto cüzdan özellikleri

## 📚 API Dokümantasyonu

### POST /encode

Görüntü içine veri gömme endpoint'i.

**Request:**
- `image`: PNG görüntü dosyası (multipart/form-data)
- `type`: Veri tipi (`text`, `number`, `file`, `audio`)
- `content`: Veri içeriği (type'a göre)
- `password`: Şifre (pattern lock)
- `algorithm`: Şifreleme algoritması (`AES-256-GCM` veya `ChaCha20-Poly1305`)

**Response:**
```json
{
  "stegoImageBase64": "base64_encoded_image",
  "mimeType": "image/png",
  "debug": { ... }
}
```

## 🧪 Test

Backend testleri:
```bash
cd Backend
npm test
```

## 📝 Lisans

Bu proje bir hackathon projesidir.

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız için issue açabilirsiniz.

---

**Not**: Bu proje geliştirme aşamasındadır. Production kullanımı için ek güvenlik önlemleri alınmalıdır.
