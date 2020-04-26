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
        for (let i = (data.length - 1); i >= 0; i--) {
            let date = (data[i].Date).slice(0, 10)
            $('#countryInfo').append('<h1>' + date + '</h1>')
            $('#countryInfo').append('<p> Tot Confirmed: ' + data[i].Confirmed + '</p>')
            $('#countryInfo').append('<p> Tot Deaths: ' + data[i].Deaths + '</p>')
            $('#countryInfo').append('<p> Tot Recovered: ' + data[i].Recovered + '</p>')
            $('#countryInfo').append('<p> Tot Aactive: ' + data[i].Active + '</p>')

            if (i != 0) {
                let newConfirmed = (data[i].Confirmed) - (data[i - 1].Confirmed)
                let newDeaths = (data[i].Deaths) - (data[i - 1].Deaths)
                let newRecovered = (data[i].Recovered) - (data[i - 1].Recovered)
                let newActive = (data[i].Active) - (data[i - 1].Active)

                $('#countryInfo').append('<p> New Confirmed: ' + newConfirmed + '</p>')
                $('#countryInfo').append('<p> New Deaths: ' + newDeaths + '</p>')
                $('#countryInfo').append('<p> New Recovered: ' + newRecovered + '</p>')
                $('#countryInfo').append('<p> New Active: ' + newActive + '</p>')
            }
        }
        $('html, body').animate({
            scrollTop: $("#countryInfo").offset().top
        }, 800);
    }).fail(function(data) {
        console.log(data)
    });
};

function showError() {
    console.log('error')
};

export default validateInput