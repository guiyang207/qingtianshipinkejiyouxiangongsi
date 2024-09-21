document.addEventListener("DOMContentLoaded", function() {
    var carousel = document.getElementById('carousel');
    var carouselItems = carousel.getElementsByClassName('carousel-item');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var indicatorContainer = carousel.getElementsByClassName('carousel-indicators')[0];

    carouselItems[0].classList.add('active');
    createIndicators(carouselItems.length);

    var autoSwitchInterval = setInterval(showNextItem, 3000);
    var isVideoPlaying = false; // 记录视频是否正在播放

    indicatorContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('indicator')) {
            var index = Array.from(indicatorContainer.children).indexOf(event.target);
            showImage(index);
        }
    });

    nextBtn.addEventListener('click', function() {
        clearInterval(autoSwitchInterval);
        showNextItem();
        autoSwitchInterval = setInterval(showNextItem, 3000);
    });

    prevBtn.addEventListener('click', function() {
        clearInterval(autoSwitchInterval);
        showPrevItem();
        autoSwitchInterval = setInterval(showNextItem, 3000);
    });

    function showImage(index) {
        clearInterval(autoSwitchInterval);
        isVideoPlaying = false; // 重置视频状态

        for (var i = 0; i < carouselItems.length; i++) {
            carouselItems[i].classList.remove('active');
            var video = carouselItems[i].querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
                video.onended = null; // 清除结束事件
            }
        }

        carouselItems[index].classList.add('active');

        var currentItem = carouselItems[index];
        var video = currentItem.querySelector('video');
        if (video) {
            video.play();
            isVideoPlaying = true; // 标记视频正在播放
            video.onended = function() {
                isVideoPlaying = false; // 视频结束后标记为未播放
                showNextItem(); // 视频结束后切换到下一个项
            };
        }

        updateIndicators(index);
    }

    function showNextItem() {
        if (!isVideoPlaying) { // 只有在没有视频播放时才切换
            var currentActive = getActiveItem();
            var nextItem = (currentActive + 1) % carouselItems.length;
            showImage(nextItem);
        }
    }

    function showPrevItem() {
        var currentActive = getActiveItem();
        var prevItem = (currentActive - 1 + carouselItems.length) % carouselItems.length;
        showImage(prevItem);
    }

    function getActiveItem() {
        for (var i = 0; i < carouselItems.length; i++) {
            if (carouselItems[i].classList.contains('active')) {
                return i;
            }
        }
        return 0;
    }

    function createIndicators(count) {
        indicatorContainer.innerHTML = '';
        for (var i = 0; i < count; i++) {
            var indicator = document.createElement('span');
            indicator.classList.add('indicator');
            if (i === 0) {
                indicator.classList.add('active');
            }
            indicatorContainer.appendChild(indicator);
        }
    }

    function updateIndicators(index) {
        for (var i = 0; i < indicatorContainer.children.length; i++) {
            indicatorContainer.children[i].classList.remove('active');
        }
        indicatorContainer.children[index].classList.add('active');
    }
});