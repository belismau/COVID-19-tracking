import theme from './js/Theme.js';

theme()

document.getElementsByTagName('input')[0].addEventListener('focusin', function() {
    document.getElementById('borderBottomEffect').style.width = '100%';
    document.getElementsByTagName('button')[0].style.color = '#727272';
});

document.getElementsByTagName('input')[0].addEventListener('focusout', function() {
    document.getElementById('borderBottomEffect').style.width = '0';
    document.getElementsByTagName('button')[0].style.color = '#9b9b9b';
});