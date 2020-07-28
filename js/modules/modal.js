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
export default modal;
export {
    closeModal
};
export {
    openModal
};