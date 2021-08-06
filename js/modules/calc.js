function calc() {
    // Calculator

    const result = document.querySelector('.calculating__result span');

    let time, hookah,
        darkside = 0,
        fumari = 0,
        jibiar = 0;

    if (localStorage.getItem('time')) {
        time = localStorage.getItem('time');
    } else {
        time = '24';
        localStorage.setItem('time', '24');
    }

    if (localStorage.getItem('hookah')) {
        hookah = localStorage.getItem('hookah');
    } else {
        hookah = 15;
        localStorage.setItem('hookah', 15);
    }

    function calcTotal() {
        if (!time || !hookah) {
            result.textContent = '____';
            return;
        }
        if (time === '24') {
            result.textContent = Math.round((darkside * 0.15) + (fumari * 0.1) + (jibiar * 0.05) + hookah);
        } else {
            result.textContent = Math.round((darkside * 0.15) + (fumari * 0.1) + (jibiar * 0.05) + (hookah * 2));
        }
    }

    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('time')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-hookah') === localStorage.getItem('hookah')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#time div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-hookah')) {
                    hookah = +e.target.getAttribute('data-hookah');
                    localStorage.setItem('hookah', +e.target.getAttribute('data-hookah'));
                } else {
                    time = e.target.getAttribute('id');
                    localStorage.setItem('time', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#time div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch (input.getAttribute('id')) {
                case "darkside":
                    darkside = +input.value;
                    break;
                case "fumari":
                    fumari = +input.value;
                    break;
                case "jibiar":
                    jibiar = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#darkside');
    getDynamicInformation('#fumari');
    getDynamicInformation('#jibiar');
}

export default calc;