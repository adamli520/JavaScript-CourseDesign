// 获取轮播相关元素
var carousel = document.getElementById('mycarousel');
var carouselItems = carousel.querySelectorAll('.carousel-item');
var carouselIndicators = carousel.querySelectorAll('ol li');
var prevButton = carousel.querySelector('.carousel-control-prev');
var nextButton = carousel.querySelector('.carousel-control-next');

// 定义当前活动项的索引
var activeIndex = 0;

// 显示指定索引的轮播项
function showCarouselItem(index) {
  // 移除之前的活动项样式
  carouselItems[activeIndex].classList.remove('active');
  carouselIndicators[activeIndex].classList.remove('active');

  // 添加新的活动项样式
  carouselItems[index].classList.add('active');
  carouselIndicators[index].classList.add('active');

  // 更新当前活动项索引
  activeIndex = index;
}

// 切换到下一个轮播项
function nextCarouselItem() {
  var newIndex = (activeIndex + 1) % carouselItems.length;
  showCarouselItem(newIndex);
}

// 切换到上一个轮播项
function previousCarouselItem() {
  var newIndex = (activeIndex - 1 + carouselItems.length) % carouselItems.length;
  showCarouselItem(newIndex);
}

// 点击下一个按钮切换到下一个轮播项
nextButton.addEventListener('click', function() {
  nextCarouselItem();
});

// 点击上一个按钮切换到上一个轮播项
prevButton.addEventListener('click', function() {
  previousCarouselItem();
});

// 点击指示器切换到对应的轮播项
for (var i = 0; i < carouselIndicators.length; i++) {
  carouselIndicators[i].addEventListener('click', function() {
    var index = Array.prototype.indexOf.call(carouselIndicators, this);
    showCarouselItem(index);
  });
}

// 自动切换定时器
var intervalId = setInterval(nextCarouselItem, 2000);

// 鼠标悬停时停止自动切换
carousel.addEventListener('mouseover', function() {
  clearInterval(intervalId);
});

// 鼠标离开时恢复自动切换
carousel.addEventListener('mouseout', function() {
  intervalId = setInterval(nextCarouselItem, 2000);
});

// 初始化显示第一个轮播项
showCarouselItem(activeIndex);
