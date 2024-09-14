document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    var enlargeImage = document.createElement('img');
    overlay.appendChild(enlargeImage);

    lazyImages.forEach(function(img) {
        img.addEventListener('click', function() {
            enlargeImage.src = img.getAttribute('data-src');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    overlay.addEventListener('click', function() {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    });

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(function(img) {
        observer.observe(img);
    });
});