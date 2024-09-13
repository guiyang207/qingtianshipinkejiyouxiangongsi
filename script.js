document.addEventListener("DOMContentLoaded", function() {
    var carousel = document.getElementById('carousel');
    var carouselItems = carousel.getElementsByClassName('carousel-item');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var indicatorContainer = carousel.getElementsByClassName('carousel-indicators')[0];
  
   // 初始化，显示第一张图片和第一个指示点
   carouselItems[0].classList.add('active');
   createIndicators(carouselItems.length);  // 创建指示点
  
   // 自动切换
   var autoSwitchInterval = setInterval(showNextItem, 3000);
  
   // 指示点点击事件
   indicatorContainer.addEventListener('click', function(event) {
       if (event.target.classList.contains('indicator')) {
           var index = Array.from(indicatorContainer.children).indexOf(event.target);
           showImage(index);
       }
   });
  
   // 下一张按钮点击事件
   nextBtn.addEventListener('click', function() {
       clearInterval(autoSwitchInterval);
       showNextItem();
       autoSwitchInterval = setInterval(showNextItem, 3000);
   });
  
   // 上一张按钮点击事件
   prevBtn.addEventListener('click', function() {
       clearInterval(autoSwitchInterval);
       showPrevItem();
       autoSwitchInterval = setInterval(showNextItem, 3000);
   });
  
   // 显示指定索引的图片
   function showImage(index) {
       clearInterval(autoSwitchInterval);
  
       for (var i = 0; i < carouselItems.length; i++) {
           carouselItems[i].classList.remove('active');
       }
  
       carouselItems[index].classList.add('active');
  
       updateIndicators(index);
  
       autoSwitchInterval = setInterval(showNextItem, 3000);
   }
  
   // 显示下一张图片
   function showNextItem() {
       var currentActive = getActiveItem();
       carouselItems[currentActive].classList.remove('active');
       var nextItem = (currentActive + 1) % carouselItems.length;
       carouselItems[nextItem].classList.add('active');
       updateIndicators(nextItem);
   }
  
   // 显示上一张图片
   function showPrevItem() {
       var currentActive = getActiveItem();
       carouselItems[currentActive].classList.remove('active');
       var prevItem = (currentActive - 1 + carouselItems.length) % carouselItems.length;
       carouselItems[prevItem].classList.add('active');
       updateIndicators(prevItem);
   }
  
   // 获取当前激活的图片项索引
   function getActiveItem() {
       for (var i = 0; i < carouselItems.length; i++) {
           if (carouselItems[i].classList.contains('active')) {
               return i;
           }
       }
       return 0;
   }
  
   // 创建指示点
   function createIndicators(count) {
       indicatorContainer.innerHTML = '';  // 先清空之前的指示点
       for (var i = 0; i < count; i++) {
           var indicator = document.createElement('span');
           indicator.classList.add('indicator');
           if (i === 0) {
               indicator.classList.add('active');
           }
           indicatorContainer.appendChild(indicator);
       }
   }
  
   // 更新指示点状态
   function updateIndicators(index) {
       for (var i = 0; i < indicatorContainer.children.length; i++) {
           indicatorContainer.children[i].classList.remove('active');
       }
       indicatorContainer.children[index].classList.add('active');
   }
  });