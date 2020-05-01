let positionList = []

function showCountryInfo(name, countryCode) {
    $('#countryInfo').remove()
    $('#provinceChooser').remove()
    positionList = []
    $.ajax({
        url: 'https://api.covid19api.com/live/country/' + name + '/status/confirmed',
        dataType: 'JSON'
    }).done(function(data) {

        $('<section id="countryInfo"></section>').insertAfter('#inputContainer')

        if (data.length == 0) {
            $('#countryInfo').append('<h1 style="display: inline-block"> No Information Available </h1>')
        }

        let provinceList = checkIfProvince(data)

        if (provinceList.length > 1) {
            showByProvince(data, countryCode, provinceList)
            scrollTo("#provinceChooser")
        } else {
            showWithoutProvince(data, countryCode)
            scrollTo("#countryInfo")
        }

    }).fail(function(data) {
        console.log(data)
    });
};

function scrollTo(element) {
    $('html, body').animate({
        scrollTop: $(element).offset().top
    }, 800);
}

function checkIfProvince(data) {
    let provinceList = []
    let alreadyInList = true
    for (let i = 0; i < data.length; i++) {
        if (provinceList.length == 0) {
            provinceList.push(data[i].Province)
        } else {
            for (let x = 0; x < provinceList.length; x++) {
                if (provinceList[x] != data[i].Province) {
                    alreadyInList = false
                } else {
                    alreadyInList = true
                    break
                }
            }
            if (alreadyInList == false) {
                provinceList.push(data[i].Province)
            }
        }
    }
    return provinceList
}

function showByProvince(data, countryCode, provinceList) {

    createProvinceChooser(provinceList, data[0].Country)

    for (let x = 0; x < provinceList.length; x++) {    // For ex. Denmark: ["Faroe Islands", "Greenland", ""]

        if (provinceList[x] != '') {
            //$('.province:nth-of-type(' + $('.province').length + ')')
            $('#countryInfo').append('<h2>' + provinceList[x] + '</h2>')
        } else {
            $('#countryInfo').append('<h2>' + data[0].Country + '</h2>')
        }

        let provinceIndex = []
        for (let i = (data.length - 1); i >= 0; i--) {
            if (data[i].Province == provinceList[x]) {
                provinceIndex.push(i)
            }
        }

        for (let z = 0; z < provinceIndex.length; z++) {
            let date = getDateFormat(data[provinceIndex[z]].Date)
            $('#countryInfo').append('<h1 data-aos="fade" data-aos-duration="400">' + date + '</h1>')

            $('#countryInfo').append('<div data-aos="fade" data-aos-duration="400" class="table"></div>')

            addDescriptionRow(countryCode)
            addTotalRow(data, provinceIndex[z])
            addNewRowProvince(data, provinceIndex[z], provinceIndex[z + 1])
        }
    }
    
    getPosition()
}

function createProvinceChooser(provinceList, countryName) {
    $('<div id="provinceChooser"></div>').insertAfter('#inputContainer')
    $('#provinceChooser').append('<h2> Choose Province </h2>')

    for (let i = 0; i < provinceList.length; i++) {
        if (provinceList[i] != '') {
            $('#provinceChooser').append('<div> <p>' + provinceList[i] + '</p> </div>')
        } else {
            $('#provinceChooser').append('<div> <p>' + countryName + '</p> </div>')
        }
    }
}

$(document).on('click', '#provinceChooser div p', function() {
    let thisP = $(this).text()
    $("#countryInfo h2").each(function() {
        if ($(this).text() == thisP) {
            scrollTo($(this))
        }
    })
});

$(document).on('scroll', function() {
    let scrollTop = $(this).scrollTop()

    for (let i = 0; i < positionList.length; i++) {
        if (scrollTop < positionList[0]) {
            removeFixedHeader()
            break
        } else if ( (positionList[i + 1] == undefined) || (scrollTop >= positionList[i] && scrollTop < positionList[i + 1]) ) {
            addFixedHeader(i)
            break
        } else {
            continue
        }
    }
});

function removeFixedHeader() {
    $('#countryInfo h2').css('position', 'static')
    $('#countryInfo h1').css('padding-top', '0')
}

function addFixedHeader(index) {
    $('#countryInfo h2').css('position', 'static')
    $('#countryInfo h1').css('padding-top', '0')
    
    let element = $('#countryInfo h2:nth-of-type(' + (index + 1) + ')')

    if ($(window).width() > 700) {
        element.css('left', '6vw')
        element.css('width', '100%')
    } else {
        element.css('left', '40px')
        element.css('right', '40px')
        element.css('width', 'auto')
    }

    element.css('position', 'fixed')
    element.css('z-index', '1')
    element.css('top', '0')
    element.css('padding', '20px')
    element.next().css('padding-top', '102px')
}

function getPosition() {
    $("#countryInfo h2").each(function() {
        positionList.push($(this).offset().top)
    })
    console.log(positionList)
}

function showWithoutProvince(data, countryCode) {
    for (let i = (data.length - 1); i >= 0; i--) {
        let date = getDateFormat(data[i].Date)
        $('#countryInfo').append('<h1 data-aos="fade" data-aos-duration="400">' + date + '</h1>')
        $('#countryInfo').append('<div data-aos="fade" data-aos-duration="400" class="table"></div>')
        addDescriptionRow(countryCode)
        addTotalRow(data, i)
        if (i != 0) {
            addNewRow(data, i)
        }
    }
}

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

function addDescriptionRow(countryCode) {
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><img src="https://www.countryflags.io/' + countryCode + '/flat/64.png"></div>')

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

    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p>' + confirmed + '</p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #e84a4a"> Deaths </p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #2f962f">' + recovered + '</p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #d0d045"> Active </p></div>')
}

function addTotalRow(data, i) {
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p> Total </p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p>' + data[i].Confirmed + '</p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #e84a4a">' + data[i].Deaths + '</p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #2f962f">' + data[i].Recovered + '</p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #d0d045">' + data[i].Active + '</p></div>')
}

function addNewRow(data, i) {
    let newConfirmed = (data[i].Confirmed) - (data[i - 1].Confirmed)
    let newDeaths = (data[i].Deaths) - (data[i - 1].Deaths)
    let newRecovered = (data[i].Recovered) - (data[i - 1].Recovered)
    let newActive = (data[i].Active) - (data[i - 1].Active)

    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p> New </p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p>' + newConfirmed + '</p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #e84a4a">' + newDeaths + '</p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #2f962f">' + newRecovered + '</p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #d0d045">' + newActive + '</p></div>')
}

function addNewRowProvince(data, i, indexNext) {

    try {
        let newConfirmed = (data[i].Confirmed) - (data[indexNext].Confirmed)
        let newDeaths = (data[i].Deaths) - (data[indexNext].Deaths)
        let newRecovered = (data[i].Recovered) - (data[indexNext].Recovered)
        let newActive = (data[i].Active) - (data[indexNext].Active)
        $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p> New </p></div>')
        $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p>' + newConfirmed + '</p></div>')
        $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #e84a4a">' + newDeaths + '</p></div>')
        $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #2f962f">' + newRecovered + '</p></div>')
        $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #d0d045">' + newActive + '</p></div>')
    } catch {
        $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p> New </p></div>')
        $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p>-</p></div>')
        $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #e84a4a">-</p></div>')
        $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #2f962f">-</p></p></div>')
        $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #d0d045">-</p></p></div>')
    }
}

export default showCountryInfo