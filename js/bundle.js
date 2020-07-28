/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {
    // CALC

    const result = document.querySelector('.calculating__result span');
    let sex,
        height,
        weight,
        age,
        ratio;
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const element = document.querySelectorAll(selector);
        element.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____'; // Можете придумать что угодно, например не правильно введенные данные или что похожее, не забыть !
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const element = document.querySelectorAll(selector);
        element.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                element.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}
/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...clases) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.clases = clases;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.clases.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.clases.forEach((className) => {
                    element.classList.add(className);
                });
            }
            element.innerHTML = `<img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
            this.parent.append(element);
        }
    }
    Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });


    //Варик если нужно сделать один раз без шаблонизации 
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({
    //         img,
    //         altimg,
    //         title,
    //         descr,
    //         price
    //     }) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         price = price * 27;
    //         element.innerHTML = `<img src=${img} alt=${altimg}>
    //     <h3 class="menu__item-subtitle">${title}</h3>
    //     <div class="menu__item-descr">${descr}</div>
    //     <div class="menu__item-divider"></div>
    //     <div class="menu__item-price">
    //         <div class="menu__item-cost">Цена:</div>
    //         <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //     </div>
    //     `;
    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

}
/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, closeModal, openModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
function openModal(modalelector, modalTimerId) {
    const visibleModal = document.querySelector(modalelector);
    visibleModal.classList.add('show');
    visibleModal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalelector) {
    const visibleModal = document.querySelector(modalelector);
    visibleModal.classList.add('hide');
    visibleModal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalelector, modalTimerId) {
    //MODAL

    const btn = document.querySelectorAll(triggerSelector),
        visibleModal = document.querySelector(modalelector);

    btn.forEach((item) => {
        item.addEventListener('click', () => openModal(modalelector, modalTimerId));
    });

    visibleModal.addEventListener('click', (e) => {
        if (e.target === visibleModal || e.target.getAttribute('data-close') == '') {
            closeModal(modalelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && visibleModal.classList.contains('show')) {
            closeModal(modalelector);
        }
    });

    //     const modalTimerId = setTimeout(openModal, 15000);
    //     let i = 0;

    //     window.addEventListener('scroll', () => {
    //         if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight && i < 1) {
    //             openModal();
    //             i++;
    //         }
    //     });
    // });
    let i = 0;

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight && i < 1) {
            openModal(modalelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}
/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/serverForms.js":
/*!***********************************!*\
  !*** ./js/modules/serverForms.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function serverForms(formSelector, modalTimerId) {
    //SERVER FORM

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Спасибо, скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));



            Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.succes);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
            </div>
            `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}
/* harmony default export */ __webpack_exports__["default"] = (serverForms);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
 /* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, textContentSelector, tabsParentSelector, activeClass) {
    // TABS
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(textContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideElement() {
        tabsContent.forEach((event) => {
            event.classList.add('hide');
            event.classList.remove('show', 'fade');
        });
        tabs.forEach((item) => {
            item.classList.remove(activeClass);
        });
    }

    function addClass(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    hideElement();
    addClass();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideElement();
                    addClass(i);
                }
            });
        }
    });
}
/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(id, deadLine) {
    // TIMER
    function checkData(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function zeroAdd(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function timerOn(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),

            timerInterval = setInterval(addHtml, 1000);

        addHtml();

        function addHtml() {
            const t = checkData(endtime);

            days.innerHTML = zeroAdd(t.days);
            hours.innerHTML = zeroAdd(t.hours);
            minutes.innerHTML = zeroAdd(t.minutes);
            seconds.innerHTML = zeroAdd(t.seconds);
            if (t.total <= 0) {
                clearInterval(timerInterval);
            }
        }


    }
    timerOn(id, deadLine);
}
/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_serverForms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/serverForms */ "./js/modules/serverForms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_3__["openModal"])('.modal', modalTimerId), 50000);
    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2020-08-07');
    Object(_modules_serverForms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimerId);
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-ineer',
        slide: '.offer__slide'
    });
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getResource = async (url, data) => {
    let res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map