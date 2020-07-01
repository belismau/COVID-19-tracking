const roundButton = document.getElementById('roundButton');

function theme() {
    if (localStorage.getItem('darkmode') != null) {
        if (localStorage.getItem('darkmode') == 'false') {
                roundButton.style.left = '50%';
                changeToLightTheme()
        } else {
                roundButton.style.left = '0';
        }
    } else {
        localStorage.setItem('darkmode', 'true')
    }
}

function changeToLightTheme() {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'static/css/lightMode.css';
    head.appendChild(link);
    document.getElementsByTagName('img')[0].src = 'static/img/light.png';
}

function removeLightTheme() {
    const linkTags = document.getElementsByTagName('link');
    linkTags[linkTags.length - 1].remove()
    document.getElementsByTagName('img')[0].src = 'static/img/dark.png';
}

roundButton.addEventListener('click', function() {
    if (localStorage.getItem('darkmode') == 'true') {
         roundButton.style.left = '50%';
         localStorage.setItem('darkmode', 'false')
         changeToLightTheme()
    } else {
         roundButton.style.left = '0';
         localStorage.setItem('darkmode', 'true')
         removeLightTheme()
    }
});

export default theme