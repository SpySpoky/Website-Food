"use script"

window.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParents = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            //item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabs[i].classList.add('tabheader__item_active');
        //tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

    }

    tabsParents.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });




    hideTabContent();
    showTabContent();

    // Timer

    const deadLine = '2025-05-11';

    function getTimeRemaining(endTime) {
        const time_between = Date.parse(endTime) - Date.parse(new Date());
        const days = Math.floor(time_between / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time_between / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((time_between / (1000 * 60)) % 60);
        const seconds = Math.floor((time_between / 1000) % 60);

        return {
            'total': time_between,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);
            days.innerHtml = (t.days < 10 ? `0${t.days}` : t.days);
            hours.textContent = (t.hours < 10 ? `0${t.hours}` : t.hours);
            minutes.innerHtml = (t.minutes < 10 ? `0${t.minutes}` : t.minutes);
            seconds.textContent = (t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);

    //modal 

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow('hidden');
        clearInterval(modalTimerId); // clear setTimerId
    }

    modalCloseBtn.addEventListener('click', () => {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        closeModal();
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener(showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll)//  { once: true }with scroll will not work
});