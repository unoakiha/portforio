const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');

let currentIndex = 0;

// スライドの幅を取得する関数
function updateSlideWidth() {
    return slides[0].getBoundingClientRect().width;
}

// 初期のスライド幅を取得
let slideWidth = updateSlideWidth();

// 中央に揃えるためのオフセットを計算する
function calculateOffset() {
    const containerWidth = track.getBoundingClientRect().width;
    return (containerWidth - slideWidth) / 2;
}

// スライド位置を更新
function moveToSlide(index) {
    const offset = calculateOffset(); // 中央揃えのためのオフセットを取得
    const position = -index * slideWidth + offset; // スライド位置を計算
    track.style.transform = `translateX(${position}px)`;
    currentIndex = index;
}

// ボタンイベントの設定
nextButton.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    moveToSlide(nextIndex);
});

prevButton.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveToSlide(prevIndex);
});

// リサイズ時にスライド幅を再計算し、表示を調整
window.addEventListener('resize', () => {
    slideWidth = updateSlideWidth();
    moveToSlide(currentIndex); // 現在のインデックスに基づき再調整
});

// 自動ループ
setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    moveToSlide(nextIndex);
}, 3000);  // 3秒ごとにスライド移動
