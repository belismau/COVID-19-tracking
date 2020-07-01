import theme from './theme.js';
import getData from './GetData.js';
import addInfoIfCountryChosen from './GetData.js';
import globalInfo from './global.js';
import validateInput from './validateInput.js';

theme()
globalInfo()
getData()

$('#countryInput').on('input', function() {
    getData()
});

document.getElementsByTagName('input')[0].addEventListener('focusin', function() {
    document.getElementById('borderBottomEffect').style.width = '100%';
    document.getElementsByTagName('button')[0].style.color = '#727272';
});

document.getElementsByTagName('input')[0].addEventListener('focusout', function() {
    document.getElementById('borderBottomEffect').style.width = '0';
    document.getElementsByTagName('button')[0].style.color = '#9b9b9b';
});

$(document).on('click', '.countryBox', function() {
    $('#countryInput').val($(this).find('p').text())
    $('#countryList div').remove()
    addInfoIfCountryChosen($(this).find('p').text())
});

$('#block a').on('click', function() {
    $('html, body').animate({
         scrollTop: $("#globalInfo").offset().top
    }, 800);
});

$('button').on('click', function() {
    validateInput()
});