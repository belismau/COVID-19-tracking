
function showCountryInfo(name, countryCode) {
    $('#countryInfo').remove()
    $.ajax({
        url: 'https://api.covid19api.com/live/country/' + name + '/status/confirmed',
        dataType: 'JSON'
    }).done(function(data) {
        $('<section id="countryInfo"></section>').insertAfter('#inputContainer')
        if (data.length == 0) {
            $('#countryInfo').append('<h1 style="display: inline-block"> No Information Available </h1>')
        }
        let classNr = 1
        for (let i = (data.length - 1); i >= 0; i--) {
            let date = getDateFormat(data[i].Date)
            $('#countryInfo').append('<h1>' + date + '</h1>')
            $('#countryInfo').append('<div class="table"></div>')
            addDescriptionRow(classNr, countryCode)
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

function getDateFormat(date) {
    let dateFormated = date.split("T")[0];
    let parts = dateFormated.split('-');
    let year = parseInt(parts[0], 10)
    let month = parseInt(parts[1], 10)
    let day = parseInt(parts[2], 10)
    let monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return day + ' ' + monthsList[month - 1] + ' ' + year
}

let nr = 0

function addDescriptionRow(classNr, countryCode) {
    $('.table:nth-of-type(' + classNr + ')').append('<div><img src="https://www.countryflags.io/' + countryCode + '/flat/64.png"></div>')

    let confirmed = 'Confirmed'
    let recovered = 'Recovered'
    if ($(window).width() <= 450) {
        confirmed = 'Confir.'
        recovered = 'Recov.'
        if (nr == 0) {
            nr = 1
            $('#countryInfo').prepend('<p style="margin: 0 0 50px 0; color: #2f962f;">*Recov. = Recovered</p>')
            $('#countryInfo').prepend('<p style="margin: 10px 0 0 0">*Confir. = Confirmed</p>')
        }
    }

    $('.table:nth-of-type(' + classNr + ')').append('<div><p>' + confirmed + '</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p style="color: #e84a4a"> Deaths </p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p style="color: #2f962f">' + recovered + '</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p style="color: #d0d045"> Active </p></div>')
}

function addTotalRow(classNr, data, i) {
    $('.table:nth-of-type(' + classNr + ')').append('<div><p> Total </p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p>' + data[i].Confirmed + '</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p style="color: #e84a4a">' + data[i].Deaths + '</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p style="color: #2f962f">' + data[i].Recovered + '</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p style="color: #d0d045">' + data[i].Active + '</p></div>')
}

function addNewRow(classNr, data, i) {
    let newConfirmed = (data[i].Confirmed) - (data[i - 1].Confirmed)
    let newDeaths = (data[i].Deaths) - (data[i - 1].Deaths)
    let newRecovered = (data[i].Recovered) - (data[i - 1].Recovered)
    let newActive = (data[i].Active) - (data[i - 1].Active)

    $('.table:nth-of-type(' + classNr + ')').append('<div><p> New </p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p>' + newConfirmed + '</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p style="color: #e84a4a">' + newDeaths + '</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p style="color: #2f962f">' + newRecovered + '</p></div>')
    $('.table:nth-of-type(' + classNr + ')').append('<div><p style="color: #d0d045">' + newActive + '</p></div>')
}

export default showCountryInfo