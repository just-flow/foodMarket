'use strict';
window.addEventListener('DOMContentLoaded', () => {
    // TABS
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideElement() {
        tabsContent.forEach((event) => {
            event.classList.add('hide');
            event.classList.remove('show', 'fade');
        });
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function addClass(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideElement();
    addClass();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideElement();
                    addClass(i);
                }
            });
        }
    });
    // TIMER


    const deadLine = '2020-08-07';

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
    timerOn('.timer', deadLine);


    //MODAL

    const btn = document.querySelectorAll('[data-modal]'),
        visibleModal = document.querySelector('.modal');

    function openModal() {
        visibleModal.classList.add('show');
        visibleModal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    btn.forEach((item) => {
        item.addEventListener('click', openModal);
    });

    function closeModal() {
        visibleModal.classList.add('hide');
        visibleModal.classList.remove('show');
        document.body.style.overflow = '';
    }


    visibleModal.addEventListener('click', (e) => {
        if (e.target === visibleModal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && visibleModal.classList.contains('show')) {
            closeModal();
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
    const modalTimerId = setTimeout(openModal, 50000);
    let i = 0;

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight && i < 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

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
    const getResource = async (url, data) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
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

    //SERVER FORM

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Спасибо, скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

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



            postData('http://localhost:3000/requests', json)
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
        openModal();

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
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));


    // SLIDER

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        next = document.querySelector('.offer__slider-next'),
        prev = document.querySelector('.offer__slider-prev'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-ineer'),
        width = window.getComputedStyle(slidesWrapper).width;


    let slideIndex = 1;
    let offset = 0;

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
            if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += +width.slice(0, width.length - 2);
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

    function deliteeNotDigits(str) {
        str.replace(/\D/g, '');
    }
    next.addEventListener('click', () => {
        if (offset == deliteeNotDigits(+width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deliteeNotDigits(+width);
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
            offset = deliteeNotDigits(+width) * (slides.length - 1);
        } else {
            offset -= deliteeNotDigits(+width);
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

    // CALC

    const result = document.querySelector('.calculating__result span');
    let sex = 'female',
        height,
        weight,
        age,
        ratio = '1.375';

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____'; // Можете придумать что угодно
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const element = document.querySelectorAll(`${parentSelector} div`);
        element.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    sex = e.target.getAttribute('id');
                }
                element.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
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
});