// Image zoom function
document.querySelectorAll('.zoomable').forEach(function(img) {
     img.addEventListener('click', function() {
       var modal = document.getElementById('imageModal');
       var modalImg = document.getElementById('modalImg');
       modal.style.display = "block";
       modalImg.src = this.src;
    
 });
});

// Close the modal when clicking on 'X' or outside the image
document.querySelector('.close').addEventListener('click', function() {
     document.getElementById('imageModal').style.display = "none";
});

window.addEventListener('click', function(event) {
     var modal = document.getElementById('imageModal');
     if (event.target == modal) {
       modal.style.display = "none";
    
 }
});