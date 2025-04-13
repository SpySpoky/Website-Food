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
        const t = Date.parse(endTime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const sec = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': sec
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

            days.innerHTML = (t.days < 10 ? `0${t.days}` : t.days);
            //days.innerHTML = t.days;
            hours.textContent = (t.hours < 10 ? `0${t.hours}` : t.hours);
            //hours.innerHTML = (t.hours);
            minutes.innerHTML = (t.minutes < 10 ? `0${t.minutes}` : t.minutes);
            //minutes.textContent = (t.minutes);
            seconds.innerHTML = (t.seconds);


            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);
});