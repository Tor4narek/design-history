
document.addEventListener('DOMContentLoaded', () => {
    load()
    removePrepositionsFromEndOfLines()
    openPages()
})

// function load() {
//     const loader = document.querySelector('.page-loader')
//     const line = loader.querySelector('.page-loader__line')
//
//     setTimeout(() => line.classList.add('page-loader__line_loaded'), 1)
//     setTimeout(() => loader.classList.add('page-loader_disable'), 3010)
//     setTimeout(() => loader.classList.add('page-loader_removed'), 4010)
//
// }

function removePrepositionsFromEndOfLines() {
    const els = []

    els.concat(document.querySelectorAll('p'))
    for (let i = 1; i < 7; i++) {
        let r = document.querySelectorAll(`h${i}`)
        els.concat(r)
    }

    els.forEach(el => {
        replacePrepositions(el)
    })
}

function replacePrepositions(text) {
    // Регулярное выражение для предлогов
    const prepositions = /\b(в|на|у|за|к|с|о|под|над|по|из|об|от|до|без|для|про|через|при|со|обо)\s+/gi;

    // Замена пробела на неразрывный пробел &nbsp;
    return text.replace(prepositions, '$1&nbsp;');
}
const nav = document.querySelector('.page-nav');
const initialNavTop = nav.offsetTop; // Сохраняем изначальную позицию навигации
window.addEventListener('scroll', function() {


    var scrollPosition = window.scrollY; // Получаем текущую позицию скролла страницы
    console.log(scrollPosition)
    if(scrollPosition>=900){
        nav.classList.add('nav_dark_color')
    }
    else{
        nav.classList.remove('nav_dark_color')
    }

    // Когда скролл ниже изначальной позиции навигации
    if (scrollPosition >= initialNavTop) {
        nav.classList.add('fixed'); // Фиксируем навигацию к верху
    } else {
        nav.classList.remove('fixed'); // Возвращаем её в начальное положение
    }
});



function openPages() {
    const btn = document.querySelectorAll('.page-nav a');
    const pages = document.querySelectorAll('.page-main');

    btn.forEach((el, index) => {
        el.addEventListener('click', (e) => {
            e.preventDefault(); // предотвратим переход по ссылке

            // Сброс активного состояния у всех кнопок
            btn.forEach(btnEl => btnEl.classList.remove('nav__button_active'));
            el.classList.add('nav__button_active');
            window.scroll({top:0, behavior:"smooth"});
            // Скрытие всех страниц с плавной анимацией
            pages.forEach((page) => {
                page.classList.add('page-main_to-hidden');
                setTimeout(() => {
                    page.classList.remove('page-main_active');
                }, 600);
            });

            // Показ целевой страницы с нужной задержкой
            setTimeout(() => {
                pages[index].classList.add('page-main_active');
                pages[index].classList.remove('page-main_to-hidden');
            }, 600);
        });
    });
}

// Вызовем функцию, чтобы она начала работать после загрузки страницы
openPages();
