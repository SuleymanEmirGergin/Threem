# Connection Pattern (Nokta Birleştirme) ✨

## 🎯 Değişiklik Özeti

**Eski:** Shape Pattern - Serbest çizim (daire, zigzag, ark çizme)
**Yeni:** Connection Pattern - Android pattern lock benzeri nokta birleştirme

## 🎨 Yeni Connection Pattern Özellikleri

### Setup Ekranı (`ShapePatternSetup.tsx`)

**Özellikler:**
- 3×3 grid = 9 nokta
- Kullanıcı noktaları parmağıyla/mouse ile birleştirir
- Minimum 4 nokta bağlanması gerekli
- Her nokta sadece bir kez kullanılabilir
- Gerçek zamanlı görsel geri bildirim

**Görsel Efektler:**
- ✨ **Boş noktalar**: Beyaz/transparan, küçük
- ✨ **Bağlı noktalar**: Cyan glow, büyür, numara gösterir
- ✨ **Çizgiler**: Cyan glow efektli çizgiler noktalar arası
- ✨ **Aktif çizim**: Mouse/parmak pozisyonuna kadar çizgi uzar

**Kullanım Akışı:**
```
1. Kullanıcı bir noktaya dokunur → İlk nokta seçilir
2. Parmağını/mouse'u hareket ettirirken → Çizgi gerçek zamanlı çizilir
3. Başka noktalara değdikçe → Otomatik bağlanır ve numaralandırılır
4. 4+ nokta bağlandıktan sonra → "Save Connection Pattern" aktif olur
5. Save → Pattern kaydedilir
```

**Canvas Boyutu:**
- 280×280 piksel
- Grid spacing: 80px
- Offset: 60px (ortalamak için)

### Auth Ekranı (`ShapePatternAuth.tsx`)

**Özellikler:**
- Aynı 3×3 grid yapısı
- Kullanıcı kaydettiği pattern'i tekrar çizer
- Otomatik doğrulama

**Doğrulama Mantığı:**
```typescript
// Pattern bittiğinde (mouse/parmak kaldırıldığında)
if (pattern.length === savedPattern.length) {
  // Sırayı ve noktaları kontrol et
  const isMatch = pattern.every((id, index) => 
    id === savedPattern[index]
  );
  
  if (isMatch) {
    ✅ Yeşil glow + "Pattern verified!"
    ✅ "Confirm Payment" butonu aktif
  } else {
    ❌ Kırmızı glow + "Pattern incorrect"
    ❌ 1.5 saniye sonra otomatik temizle
  }
}
```

**Görsel Geri Bildirim:**
- **Normal**: Cyan glow
- **Doğru**: Yeşil glow + "Pattern verified!"
- **Yanlış**: Kırmızı glow + "Pattern incorrect"

## 🔧 Teknik Detaylar

### Canvas Drawing Logic

```typescript
// Noktalar arası çizgi çiz
ctx.strokeStyle = 'rgba(34, 211, 238, 0.6)'; // Cyan
ctx.lineWidth = 4;
ctx.lineCap = 'round';
ctx.shadowBlur = 15;
ctx.shadowColor = 'rgba(34, 211, 238, 0.8)';

// Her bağlı noktayı çiz
pattern.forEach((pointId, index) => {
  const point = points.find(p => p.id === pointId);
  if (index === 0) {
    ctx.moveTo(point.x, point.y);
  } else {
    ctx.lineTo(point.x, point.y);
  }
});

// Aktif çizim durumunda mouse pozisyonuna kadar çiz
if (isDrawing && currentPos) {
  ctx.lineTo(currentPos.x, currentPos.y);
}
```

### Point Detection

```typescript
const getPointAtPosition = (x: number, y: number): Point | null => {
  const threshold = 25; // 25px yakınlık
  return points.find(point =>
    Math.sqrt(
      Math.pow(point.x - x, 2) + 
      Math.pow(point.y - y, 2)
    ) < threshold
  ) || null;
};
```

### Event Handlers

```typescript
// Mouse ve touch desteği
onMouseDown={handleStart}
onMouseMove={handleMove}
onMouseUp={handleEnd}
onMouseLeave={handleEnd}
onTouchStart={handleStart}
onTouchMove={handleMove}
onTouchEnd={handleEnd}
```

## 📱 Kullanıcı Deneyimi

### Setup Flow
```
Stego Selection 
  → Select "Connection Pattern"
  → Connection Pattern Setup
    → 3×3 grid görünür
    → "Touch a dot to start drawing"
    → Kullanıcı pattern çizer
    → "4 dots connected ✓"
    → "Save Connection Pattern" → QR Scan
```

### Payment Auth Flow
```
Payment Review 
  → "Authorize Payment"
  → Connection Pattern Auth
    → "Draw your pattern"
    → Kullanıcı pattern çizer
    → ✅ "Pattern verified!"
    → "Confirm Payment" → Processing → Success
```

## 🎨 Renk Sistematiği

### Setup (ShapePatternSetup)
- **Boş nokta**: `rgba(255, 255, 255, 0.1)` - border `rgba(255, 255, 255, 0.3)`
- **Bağlı nokta**: `rgba(34, 211, 238, 0.3)` - border `rgba(34, 211, 238, 0.8)`
- **İç nokta**: `rgba(34, 211, 238, 1)` (solid cyan)
- **Çizgiler**: `rgba(34, 211, 238, 0.6)` + glow

### Auth (ShapePatternAuth)
**Normal durum:**
- Cyan (setup ile aynı)

**Doğru pattern:**
- **Noktalar**: `rgba(34, 197, 94, ...)` (yeşil)
- **Çizgiler**: `rgba(34, 197, 94, ...)` (yeşil)
- **Glow**: Yeşil

**Yanlış pattern:**
- **Noktalar**: `rgba(239, 68, 68, ...)` (kırmızı)
- **Çizgiler**: `rgba(239, 68, 68, ...)` (kırmızı)
- **Glow**: Kırmızı

## ✨ Premium Özellikler

1. **Smooth Animations**
   - Nokta büyümesi: scale 1 → 1.2 → 1
   - Çizgi glow efekti
   - Renk geçişleri smooth

2. **Real-time Feedback**
   - Mouse/touch pozisyonu ile canlı çizgi
   - Otomatik nokta algılama
   - Anlık numara gösterimi

3. **Error Handling**
   - Yanlış pattern kırmızı glow
   - 1.5s sonra otomatik temizleme
   - Tekrar deneme imkanı

4. **Touch Optimized**
   - 25px threshold (parmak dokunuşu için ideal)
   - Smooth touch tracking
   - Canvas `touch-none` class (native scroll engelleme)

## 🔄 Diğer Ekranlarda Güncellenen Yerler

### StegoTypeSelectionScreen
```diff
- title: 'Shape Pattern'
- description: 'Draw a shape (circle, zigzag, arc)'
- icon: PenTool

+ title: 'Connection Pattern'
+ description: 'Connect dots to create unique pattern'
+ icon: Grid3x3
```

### StegoSettingsScreen
```diff
- title: 'Shape Pattern'
- description: 'Draw a shape (circle, zigzag, arc)'
- icon: PenTool

+ title: 'Connection Pattern'
+ description: 'Connect dots to create unique pattern'
+ icon: Grid3x3
```

## 🚀 Sonuç

Artık sistemde **Android Pattern Lock** benzeri premium bir nokta birleştirme sistemi var!

**Avantajlar:**
- ✅ Kullanıcı deneyimi çok daha iyi (daha tanıdık)
- ✅ Kolay öğrenilebilir
- ✅ Hızlı giriş
- ✅ Görsel olarak tatmin edici (glow efektleri)
- ✅ Touch ve mouse destekli
- ✅ Premium futuristik tasarım

**Pattern Özellikleri:**
- Minimum 4 nokta
- Maksimum 9 nokta (3×3 grid)
- Her nokta bir kez kullanılabilir
- Sıralama önemli (1-2-3-4 ≠ 4-3-2-1)
