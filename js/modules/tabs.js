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
export default tabs;