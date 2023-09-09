// 获取所有游戏卡片图片
const gameImages = document.querySelectorAll('.card-img-top');

// 为每个图片添加点击事件监听器
gameImages.forEach(function (image) {
  image.addEventListener('click', function () {
    // 创建模态框
    const modal = document.createElement('div');
    modal.classList.add('mymodal');
    
    // 创建模态框中的图片
    const modalImage = document.createElement('img');
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalImage.style.width = '80%';
    modalImage.style.height = 'auto';
    modalImage.style.maxHeight = '80%';
    modalImage.style.position = 'relative';
    modalImage.style.cursor = 'zoom-out';
    
    // 将图片添加到模态框中
    modal.appendChild(modalImage);
    
    // 将模态框添加到页面中
    document.body.appendChild(modal);
    
    // 点击模态框时，关闭模态框
    modal.addEventListener('click', function () {
      document.body.removeChild(modal);
    });
    
    // 鼠标滚轮事件
    modal.addEventListener('wheel', function (event) {
      event.preventDefault();
      const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      const scale = parseFloat(modalImage.style.transform.replace('scale(', '').replace(')', '')) || 1;
      modalImage.style.transform = `scale(${scale + delta * 0.1})`;
    });
  });
});
