# 🎁 Trang Web Tặng Quà Sinh Nhật - Hướng Dẫn Sử Dụng

Đây là một trang web tương tác lãng mạn để chúc mừng sinh nhật người yêu với nhiều tính năng đặc biệt.

## 📑 Các Trang Chính

### 1. **Trang Chủ (index.html)** - Màn Hình Chào Mừng
- Hiệu ứng hạt tim và sao bay lơ lửng
- Âm nhạc tự động phát (có thể bật/tắt)
- Nút "Mở Quà Đi Nào" để chuyển đến trang tiếp theo

**Tùy chỉnh:**
- Thay `Happy Birthday` bằng tên bé yêu

### 2. **Trang Mở Quà (gift-box.html)** - Hộp Quà 3D
- Hộp quà 3D đầy màu sắc
- Hiệu ứng rung khi click
- Hiệu ứng confetti bung ra khi mở
- Âm thanh đặc biệt

### 3. **Trang Kỷ Niệm (timeline.html)** - Carousel Ảnh
- Carousel quay tròn các kỷ niệm
- Ảnh dạng Polaroid
- Mỗi ảnh có ngày, tiêu đề và mô tả
- Nút điều hướng trước/sau
- Chấm chỉ báo (dots)

**Tùy chỉnh:**
- Thay ảnh placeholder bằng ảnh thực tế
- Cập nhật ngày, tiêu đề, và mô tả trong `timeline.html`

### 4. **Trang Video (video.html)** - Video Bí Mật
- Nhúng video từ YouTube
- Ghi chú lãng mạn

**Tùy chỉnh:**
- Thay YouTube ID `dQw4w9WgXcQ` bằng ID video thực của bạn

### 5. **Trang 100 Lý Do (reasons.html)** - Thẻ Lật 3D
- 20 lý do yêu em (có thể thêm nhiều hơn)
- Hiệu ứng lật thẻ 3D
- Grid nhỏ để chọn lý do
- Bấm để lật, click mũi tên để xem tiếp

**Tùy chỉnh:**
- Chỉnh sửa danh sách lý do trong `js/reasons.js`

### 6. **Trang Camera (camera.html)** - Chụp Ảnh Kỷ Niệm
- Bấm "Bật Camera" để mở camera
- Chụp ảnh
- Tải xuống ảnh dưới dạng PNG

**Tính năng:**
- Yêu cầu quyền truy cập camera
- Lưu ảnh vào máy tính

### 7. **Trang Thư Tình (letter.html)** - Thư Tay Vintage
- Phong bì 3D có thể mở
- Bấm phong bì để mở
- Nội dung thư viết tay phong cách cổ điển
- Ngày tháng tự động cập nhật

**Tùy chỉnh:**
- Thay đổi nội dung thư trong `letter.html`

### 8. **Trang Bánh Sinh Nhật (cake.html)** - Bánh với Pháo Hoa
- Bánh sinh nhật SVG đẹp
- Nến trên bánh
- Bấm bánh để thổi nến
- Hiệu ứng pháo hoa nổ
- Lời chúc ngọt ngào

**Tính năng:**
- Pháo hoa đa màu
- Âm thanh kỳ lạ
- Lời chúc ngẫu nhiên (có thể tùy chỉnh)

## 🎨 Màu Sắc & Giao Diện

**Bảng Màu Light Theme:**
- Màu chính: Hot Pink (#FF69B4)
- Màu phụ: Light Pink (#FFB6D9)
- Vàng: Gold (#FFD700)
- Nền: Trắng (#FFFFFF)

**Phông Chữ:**
- Heading: Playfair Display
- Script: Great Vibes
- Text: Dancing Script, Segoe UI

## 🔧 Tùy Chỉnh Cá Nhân Hóa

### Thay Tên:
Tìm và thay thế:
- `[Tên bé yêu]` → Tên thực của em
- `[Tên anh]` → Tên của bạn

### Thay Ảnh:
1. Chuẩn bị ảnh của bạn (JPG hoặc PNG)
2. Lưu vào folder `/images/` (tạo mới nếu chưa có)
3. Cập nhật đường dẫn trong `timeline.html`

### Thay Video:
1. Upload video lên YouTube
2. Lấy YouTube ID (sau dấu `v=` trong URL)
3. Thay thế `dQw4w9WgXcQ` bằng ID của bạn trong `video.html`

### Thay Nội Dung:
- **Timeline:** Chỉnh sửa tiêu đề, mô tả, ngày tháng
- **Lý Do:** Thêm hoặc chỉnh sửa danh sách trong `js/reasons.js`
- **Thư Tình:** Chỉnh sửa nội dung trong `letter.html`

## 🎵 Nhạc Nền

Hiện tại sử dụng nhạc placeholder. Để thay bằng nhạc của bạn:
1. Tìm file nhạc (MP3 hoặc OGG)
2. Lưu vào folder `/audio/`
3. Cập nhật URL trong `<audio>` tag của các HTML files

## 📱 Responsive Design

Website hoàn toàn responsive:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## 🚀 Cách Sử Dụng

1. **Cục bộ:** Mở `index.html` trong trình duyệt
2. **Deploy:** 
   - Upload tất cả file lên GitHub
   - Deploy trên Vercel, Netlify, hoặc bất kì hosting nào

## ⚙️ Tính Năng Kỹ Thuật

- **Vanilla JavaScript**: Không cần framework
- **Canvas API**: Cho animation hạt, confetti, pháo hoa
- **Web Audio API**: Âm thanh tương tác
- **Web Camera API**: Camera tương tác
- **3D CSS Transforms**: Hiệu ứng 3D các hộp, thẻ, phong bì

## 🎯 Danh Sách Kiểm Tra Tùy Chỉnh

- [ ] Thay tên bé yêu
- [ ] Thay tên của bạn
- [ ] Thêm ảnh kỷ niệm (tối thiểu 4)
- [ ] Cập nhật YouTube video ID
- [ ] Chỉnh sửa 100 lý do
- [ ] Thay nội dung thư tình
- [ ] Cập nhật cấu hình âm nhạc
- [ ] Test trên mobile
- [ ] Deploy lên hosting

## 💝 Ghi Chú

Website này được tạo ra với tình yêu thương để làm cho sinh nhật người yêu thêm đặc biệt. Mỗi trang được thiết kế cẩn thận với hoạt ảnh mịn màng và tương tác vui vẻ.

**Hãy tận hưởng và chúc em sinh nhật vui vẻ!** 🎉💕
