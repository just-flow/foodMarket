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


    const deadLine = '2020-07-20';

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
            hours.innerHTML = zeroAdd(t.hours - 3);
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
        close = document.querySelector('[data-close]'),
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
    close.addEventListener('click', closeModal);

    visibleModal.addEventListener('click', (e) => {
        if (e.target === visibleModal) {
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
    const modalTimerId = setTimeout(openModal, 15000);
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
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `<div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        </div>`;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();
});