 // SLIDER
 function slider({
     container,
     slide,
     nextArrow,
     prevArrow,
     totalCounter,
     currentCounter,
     wrapper,
     field
 }) {
     const slides = document.querySelectorAll(slide),
         slider = document.querySelector(container),
         next = document.querySelector(nextArrow),
         prev = document.querySelector(prevArrow),
         current = document.querySelector(currentCounter),
         total = document.querySelector(totalCounter),
         slidesWrapper = document.querySelector(wrapper),
         slidesField = document.querySelector(field),
         width = window.getComputedStyle(slidesWrapper).width;


     let slideIndex = 1;
     let offset = 0;

     function deliteeNotDigits(str) {
         return +str.replace(/\D/g, '');
     }

     function dotOpacity() {
         dots.forEach(dot => dot.style.opacity = '.5');
         dots[slideIndex - 1].style.opacity = 1;
     }

     if (slides.length < 10) {
         total.innerHTML = `0${slides.length}`;
         current.innerHTML = `0${slideIndex}`;
     } else {
         total.innerHTML = slides.length;
         current.innerHTML = slideIndex;
     }
     slidesField.style.width = slides.length * 100 + '%';
     slidesField.style.display = 'flex';
     slidesField.style.transition = '0.5s all';
     slidesWrapper.style.overflow = 'hidden';

     slides.forEach(slide => {
         slide.style.width = width;
     });

     slider.style.position = 'relative';

     const idicators = document.createElement('ol'),
         dots = [];
     idicators.classList.add('carousel-indicators');
     slider.append(idicators);

     for (let i = 0; i < slides.length; i++) {
         const dot = document.createElement('li');
         dot.setAttribute('data-slide-to', i + 1);
         dot.classList.add('dot');
         if (i == 0) {
             dot.style.opacity = 1;
         }
         idicators.append(dot);
         dots.push(dot);
     }
     const moveSlideBlock = setInterval(function () {
             if (offset == deliteeNotDigits(width) * (slides.length - 1)) {
                 offset = 0;
             } else {
                 offset += deliteeNotDigits(width);
             }
             slidesField.style.transform = `translateX(-${offset}px)`;

             if (slideIndex == slides.length) {
                 slideIndex = 1;
             } else {
                 slideIndex++;
             }

             if (slides.length < 10) {
                 current.innerHTML = `0${slideIndex}`;
             } else {
                 current.innerHTML = slideIndex;
             }
             dotOpacity();
         },
         3000);

     next.addEventListener('click', () => {
         if (offset == deliteeNotDigits(width) * (slides.length - 1)) {
             offset = 0;
         } else {
             offset += deliteeNotDigits(width);
         }
         slidesField.style.transform = `translateX(-${offset}px)`;

         if (slideIndex == slides.length) {
             slideIndex = 1;
         } else {
             slideIndex++;
         }

         if (slides.length < 10) {
             current.innerHTML = `0${slideIndex}`;
         } else {
             current.innerHTML = slideIndex;
         }
         dotOpacity();
         clearInterval(moveSlideBlock);
     });


     prev.addEventListener('click', () => {
         if (offset == 0) {
             offset = deliteeNotDigits(width) * (slides.length - 1);
         } else {
             offset -= deliteeNotDigits(width);
         }
         if (slideIndex == 1) {
             slideIndex = slides.length;
         } else {
             slideIndex--;
         }

         slidesField.style.transform = `translateX(-${offset}px)`;

         if (slides.length < 10) {
             current.innerHTML = `0${slideIndex}`;
         } else {
             current.innerHTML = slideIndex;
         }
         dotOpacity();
         clearInterval(moveSlideBlock);
     });
     // slider clicker
     // showSlides(slideIndex);

     // if (slides.length < 10) {
     //     total.innerHTML = `0${slides.length}`;
     // } else {
     //     total.innerHTML = slides.length;
     // }

     // function showSlides(n) {
     //     if (n > slides.length) {
     //         slideIndex = 1;
     //     }
     //     if (n < 1) {
     //         slideIndex = slides.length;
     //     }
     //     slides.forEach((event) => {
     //         event.classList.add('hide');
     //     });
     //     slides[slideIndex - 1].classList.add('show', 'fade');
     //     slides[slideIndex - 1].classList.remove('hide');
     //     if (slides.length < 10) {
     //         current.innerHTML = `0${slideIndex}`;
     //     } else {
     //         current.innerHTML = slideIndex;
     //     }
     // }

     // function plusSlide(n) {
     //     showSlides(slideIndex += n);
     // }
     // next.addEventListener('click', () => {
     //     plusSlide(1);
     // });
     // prev.addEventListener('click', () => {
     //     plusSlide(-1);
     // });


     dots.forEach(dot => {
         dot.addEventListener('click', (e) => {
             const slideTo = e.target.getAttribute('data-slide-to');

             slideIndex = slideTo;
             offset = +width.replace(/\D/g, '') * (slideTo - 1);

             slidesField.style.transform = `translateX(-${offset}px)`;
             if (slides.length < 10) {
                 current.innerHTML = `0${slideIndex}`;
             } else {
                 current.innerHTML = slideIndex;
             }
             dotOpacity();
             clearInterval(moveSlideBlock);
         });
     });
 }
 export default slider;