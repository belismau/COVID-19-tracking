function validateInput() {
    let input = ($('#countryInput').val()).toLowerCase()
    $.ajax({
        url: 'https://api.covid19api.com/countries',
        dataType: 'JSON'
    }).done(function(data) {
        for (let i = 0; i < data.length; i++) {
            if (input == (data[i].Country).toLowerCase()) {
                showCountryInfo(data[i].Slug)
                return
            }
        }
        showError()
    }).fail(function(data) {
        console.log(data)
    });
};

function showCountryInfo(name) {
    $('#countryInfo').remove()
    $.ajax({
        url: 'https://api.covid19api.com/live/country/' + name + '/status/confirmed',
        dataType: 'JSON'
    }).done(function(data) {
        $('<section id="countryInfo"></section>').insertAfter('#inputContainer')
        let classNr = 1
        for (let i = (data.length - 1); i >= 0; i--) {
            let date = (data[i].Date).slice(0, 10)
            $('#countryInfo').append('<h1>' + date + '</h1>')
            $('#countryInfo').append('<div class="table"></div>')
            addDescriptionRow(classNr)
            addTotalRow(classNr, data, i)
            if (i != 0) {
                addNewRow(classNr, data, i)
            }
        classNr += 1
        }
        $('html, body').animate({
            scrollTop: $("#countryInfo").offset().top
        }, 800);
    }).fail(function(data) {
        console.log(data)
    });
};

function addDescriptionRow(classNr) {
    $('.table:nth-of-type(' + classNr + ')').append('<div><p>Sweden</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p> Confirmed </p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p> Deaths </p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p> Recovered </p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p> Active </p></div>')
}

function addTotalRow(classNr, data, i) {
    $('.table:nth-of-type(' + classNr + ')').append('<div><p> Total </p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p>' + data[i].Confirmed + '</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p>' + data[i].Deaths + '</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p>' + data[i].Recovered + '</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p>' + data[i].Active + '</p></div>')
}

function addNewRow(classNr, data, i) {
    let newConfirmed = (data[i].Confirmed) - (data[i - 1].Confirmed)
    let newDeaths = (data[i].Deaths) - (data[i - 1].Deaths)
    let newRecovered = (data[i].Recovered) - (data[i - 1].Recovered)
    let newActive = (data[i].Active) - (data[i - 1].Active)

    $('.table:nth-of-type(' + classNr + ')').append('<div><p> New </p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p>' + newConfirmed + '</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p>' + newDeaths + '</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p>' + newRecovered + '</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p>' + newActive + '</p></div>')
}

function showError() {
    console.log('error')
};


export default validateInput