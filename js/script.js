import tabs from './modules/tabs';
import timer from './modules/timer';
import serverForms from './modules/serverForms';
import modal from './modules/modal';
import cards from './modules/cards';
import calc from './modules/calc';
import slider from './modules/slider';
import {
    openModal
} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2020-08-07');
    serverForms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    cards();
    calc();
    slider({
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