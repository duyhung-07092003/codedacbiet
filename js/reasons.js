document.addEventListener('DOMContentLoaded', () => {
    const jar = document.getElementById('loveJar');
    const heartsInside = jar.querySelector('.hearts-inside');
    const modal = document.getElementById('reasonModal');
    const modalText = modal.querySelector('.reason-text');
    const modalNumber = modal.querySelector('.reason-number');
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    const countDisplay = document.getElementById('countViewed');

    const reasons = [
        "Vì em luôn mỉm cười với anh mỗi khi chúng ta gặp nhau.",
        "Vì cách em chăm sóc anh mỗi khi anh mệt mỏi.",
        "Vì ánh mắt của em luôn làm anh cảm thấy bình yên.",
        "Vì em luôn lắng nghe những câu chuyện không đầu không cuối của anh.",
        "Vì em là người duy nhất hiểu được những trò đùa nhạt nhẽo của anh.",
        "Vì cách em vô tình nắm tay anh khi đi trên phố.",
        "Vì em có một trái tim vô cùng ấm áp và bao dung.",
        "Vì em luôn tin tưởng vào những điều anh làm.",
        "Vì em là động lực để anh cố gắng trở thành phiên bản tốt hơn mỗi ngày.",
        "Vì giọng nói của em là âm thanh ngọt ngào nhất anh từng nghe.",
        "Vì em luôn biết cách làm anh cười ngay cả khi anh buồn nhất.",
        "Vì cách em tập trung làm việc trông thật quyến rũ.",
        "Vì em luôn ủng hộ những ước mơ điên rồ của anh.",
        "Vì em không bao giờ bỏ cuộc khi chúng ta gặp khó khăn.",
        "Vì em có mùi hương đặc trưng làm anh luôn nhớ nhung.",
        "Vì cách em lo lắng cho sức khỏe của anh.",
        "Vì em luôn chia sẻ với anh mọi điều trong cuộc sống.",
        "Vì em là người đầu tiên anh muốn gọi mỗi khi có tin vui.",
        "Vì em cũng là người đầu tiên anh muốn tìm đến khi mệt mỏi.",
        "Vì cách em vụng về nhưng vẫn cố gắng nấu ăn cho anh.",
        "Vì em luôn tôn trọng không gian riêng của anh.",
        "Vì em là một người con gái vô cùng thông minh và sâu sắc.",
        "Vì cách em yêu thương gia đình của mình.",
        "Vì em luôn kiên nhẫn với tính cách bướng bỉnh của anh.",
        "Vì em có những suy nghĩ rất độc đáo làm anh bất ngờ.",
        "Vì em luôn nhắc nhở anh phải biết yêu thương bản thân.",
        "Vì cách em nhõng nhẽo mỗi khi muốn anh làm gì đó.",
        "Vì em không bao giờ phán xét những sai lầm của anh.",
        "Vì em là mảnh ghép hoàn hảo còn thiếu trong đời anh.",
        "Vì em làm cho những điều bình thường nhất cũng trở nên đặc biệt.",
        "Vì em luôn biết cách tạo ra những điều bất ngờ nhỏ bé.",
        "Vì em có gu thẩm mỹ rất tuyệt vời.",
        "Vì cách em bảo vệ những quan điểm của chính mình.",
        "Vì em luôn nhìn thấy điểm tốt ở người khác.",
        "Vì em là người duy nhất anh có thể hoàn toàn là chính mình khi ở bên.",
        "Vì những cái ôm của em có khả năng chữa lành mọi vết thương.",
        "Vì em luôn đồng hành cùng anh trong mọi hành trình.",
        "Vì cách em đỏ mặt khi được anh khen.",
        "Vì em không ngần ngại chỉ ra những lỗi sai của anh để anh sửa.",
        "Vì em luôn tin vào tình yêu của chúng ta.",
        "Vì em có một tâm hồn rất đẹp và thuần khiết.",
        "Vì cách em đối xử tử tế với mọi người xung quanh.",
        "Vì em luôn nhớ những kỷ niệm nhỏ nhất của hai đứa.",
        "Vì em là lý do để anh muốn về nhà thật nhanh mỗi ngày.",
        "Vì em làm anh cảm thấy mình được yêu thương vô điều kiện.",
        "Vì em có nụ cười tỏa nắng làm bừng sáng cả ngày của anh.",
        "Vì em luôn biết cách làm dịu đi những cơn nóng nảy của anh.",
        "Vì em là người bạn thân nhất mà anh từng có.",
        "Vì em luôn trân trọng những món quà nhỏ anh tặng.",
        "Vì cách em tự tin tỏa sáng theo cách của riêng mình.",
        "Vì em là cả thế giới đối với anh.",
        "Vì em luôn biết cách khích lệ anh khi anh mất niềm tin.",
        "Vì em có đôi bàn tay nhỏ bé nhưng rất mạnh mẽ.",
        "Vì cách em ngủ trông thật bình yên.",
        "Vì em luôn sẵn sàng thử những điều mới lạ cùng anh.",
        "Vì em không bao giờ đòi hỏi những điều xa xỉ.",
        "Vì em biết cách tận hưởng những niềm vui giản đơn.",
        "Vì em là người đầu tiên hiểu được ánh mắt của anh nói gì.",
        "Vì em luôn dành cho anh những lời khen chân thành.",
        "Vì cách em vuốt tóc mỗi khi suy nghĩ.",
        "Vì em làm anh tin vào định mệnh.",
        "Vì em luôn là bến đỗ bình yên nhất của đời anh.",
        "Vì em có những cử chỉ quan tâm rất tinh tế.",
        "Vì em không bao giờ để anh phải đối mặt với khó khăn một mình.",
        "Vì em là người làm anh cười nhiều nhất.",
        "Vì em luôn tạo cảm giác an toàn cho anh.",
        "Vì cách em gọi tên anh thật đặc biệt.",
        "Vì em luôn truyền năng lượng tích cực cho anh.",
        "Vì em là người con gái đẹp nhất trong mắt anh.",
        "Vì em luôn thấu hiểu những nỗi sợ thầm kín của anh.",
        "Vì em là người anh muốn cùng già đi.",
        "Vì em luôn biết cách hâm nóng tình cảm của chúng ta.",
        "Vì cách em ăn ngon lành món anh nấu.",
        "Vì em luôn kiêu hãnh về anh trước mặt mọi người.",
        "Vì em làm anh thấy cuộc đời này thật đáng sống.",
        "Vì em có khả năng làm anh quên đi mọi ưu phiền.",
        "Vì em luôn trung thực với cảm xúc của mình.",
        "Vì em là người phụ nữ độc lập và mạnh mẽ.",
        "Vì cách em dịu dàng với trẻ con.",
        "Vì em luôn giữ đúng lời hứa với anh.",
        "Vì em là người duy nhất anh muốn chia sẻ mọi bí mật.",
        "Vì em có một phong cách rất riêng biệt.",
        "Vì em luôn làm anh cảm thấy tự hào về em.",
        "Vì cách em phối đồ trông lúc nào cũng xinh xắn.",
        "Vì em luôn lắng nghe lời khuyên của anh.",
        "Vì em là người dạy anh cách yêu thương thực sự.",
        "Vì em không bao giờ bỏ mặc anh lúc ốm đau.",
        "Vì em có những ước mơ rất đẹp cho tương lai của chúng ta.",
        "Vì cách em cùng anh vượt qua những ngày giông bão.",
        "Vì em luôn là người đầu tiên chúc anh ngủ ngon.",
        "Vì em là người đầu tiên chúc anh ngày mới tốt lành.",
        "Vì em có một giọng cười rất giòn và đáng yêu.",
        "Vì em luôn biết cách làm anh cảm thấy mình quan trọng.",
        "Vì em là người anh có thể tin tưởng tuyệt đối.",
        "Vì em luôn làm mới tình yêu của chúng ta mỗi ngày.",
        "Vì cách em nắm chặt tay anh giữa đám đông.",
        "Vì em là món quà tuyệt vời nhất mà cuộc sống ban tặng cho anh.",
        "Vì đơn giản, em là chính em.",
        "Vì anh không thể hình dung ra cuộc sống nếu thiếu em.",
        "Vì anh yêu em, đơn giản vì đó là em."
    ];

    let viewedReasons = JSON.parse(localStorage.getItem('viewedReasons')) || [];
    countDisplay.innerText = viewedReasons.length;

    // Tạo trái tim bay trong hũ
    function createHearts() {
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('i');
            heart.className = 'fas fa-heart floating-heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.setProperty('--drift-x', (Math.random() * 100 - 50) + 'px');
            heart.style.setProperty('--duration', (Math.random() * 3 + 3) + 's');
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.fontSize = (Math.random() * 10 + 10) + 'px';
            heartsInside.appendChild(heart);
        }
    }

    createHearts();

    function getRandomReason() {
        // Ưu tiên những lý do chưa xem
        const unviewed = reasons.filter((_, index) => !viewedReasons.includes(index));
        
        let index;
        if (unviewed.length > 0) {
            const randomIndex = Math.floor(Math.random() * unviewed.length);
            const reasonText = unviewed[randomIndex];
            index = reasons.indexOf(reasonText);
        } else {
            // Nếu xem hết rồi thì bốc ngẫu nhiên tất cả
            index = Math.floor(Math.random() * reasons.length);
        }
        
        return { index: index + 1, text: reasons[index], originalIndex: index };
    }

    function showReason() {
        // Hiệu ứng rung hũ
        jar.classList.add('shake');
        setTimeout(() => jar.classList.remove('shake'), 400);

        const reason = getRandomReason();
        
        // Lưu vào danh sách đã xem nếu chưa có
        if (!viewedReasons.includes(reason.originalIndex)) {
            viewedReasons.push(reason.originalIndex);
            localStorage.setItem('viewedReasons', JSON.stringify(viewedReasons));
            countDisplay.innerText = viewedReasons.length;
        }

        modalNumber.innerText = `Lý do #${reason.index}`;
        modalText.innerText = reason.text;
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 300);
    }

    jar.addEventListener('click', showReason);
    
    function closeModal() {
        modal.classList.remove('active');
    }

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
});
