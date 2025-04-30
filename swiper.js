/* document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 2,
    spaceBetween: 15,
    loop: true,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      768: { slidesPerView: 3 },
      480: { slidesPerView: 2 },
      0:   { slidesPerView: 1 }
    }      
  });
});
 */

(function(){
  "use strict";

  let currentImage = 0;
  const myPhotos = ['image1.jpg','image2.jpg','image3.jpg','image4.jpg', 'image5.jpg'];
  const container = document.getElementById('content');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('previous');

  nextBtn.addEventListener('click', function(event){
      event.preventDefault();

      currentImage++;
      if(currentImage > myPhotos.length - 1){
          currentImage = 0;
      } 

      swapImage();
  });



  prevBtn.addEventListener('click', function(event){
      event.preventDefault();

      currentImage--;
      if(currentImage < 0){
          currentImage = myPhotos.length-1;
      }

      swapImage();
  });

  function swapImage(){
      const newSlide = document.createElement('img'); //Create a new image element
      newSlide.src = `slides/${myPhotos[currentImage]}`;//Set the source attribute
      newSlide.className = 'fadeinimg';//Set the class name
      container.appendChild(newSlide);//Append it to the container 

      //Remove extra child
      if(container.children.length > 2){
          container.removeChild(container.children[0]); //removes bottom most child from list
      }
  }
})();