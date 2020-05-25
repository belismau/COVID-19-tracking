let positionList = []
let provinceList = []
let curCountry = ''

function showCountryInfo(name, countryCode) {
    $('#countryInfo').remove()
    $('#provinceChooser').remove()
    $('#cityChooser').remove()
    positionList = []
    $.ajax({
        url: 'https://api.covid19api.com/dayone/country/' + name + '',
        dataType: 'JSON'
    }).done(function(data) {
        
        if (data.length == 0) {
            $('#countryInfo').append('<h1 style="display: inline-block"> No Information Available </h1>')
        }

        curCountry = name

        provinceList = listName(data, 'Province')

        if (provinceList.length > 1) {
            createProvinceChooser(provinceList, data[0].Country)
            scrollTo("#provinceChooser")
        } else {
            $('<section id="countryInfo"></section>').insertAfter('#inputContainer')
            showWithoutProvince(data, countryCode)
            scrollTo("#countryInfo")
        }

    }).fail(function(data) {
        console.log(data)
    });
};

$(document).on('click', '#provinceChooser div p', function() {
    $('#countryInfo').remove()
    $('#cityChooser').remove()
    $('<section id="countryInfo"></section>').insertAfter('#provinceChooser')

    let thisProvinceName = $(this).text()
    let curProvince = []

    $.ajax({
        url: 'https://api.covid19api.com/dayone/country/' + curCountry + '',
        dataType: 'JSON'
    }).done(function(data) {

        if (data[0].City != '') {
            let cityList = getListName(data, thisProvinceName)
            console.log(cityList)
            createCityChooser(cityList)
            $('#countryInfo').remove()
            scrollTo("#cityChooser")
        } else {
            for (let i = 0; i < data.length; i++) {
                if (data[i].Province == thisProvinceName) {
                    curProvince.push(data[i])
                } else if (data[0].Country == thisProvinceName && data[i].Province == '') {
                    curProvince.push(data[i])
                }
            }

            for (let z = (curProvince.length - 1); z >= 0; z--) {
                let date = getDateFormat(curProvince[z].Date)
                $('#countryInfo').append('<h1 data-aos="fade" data-aos-duration="400">' + date + '</h1>')

                $('#countryInfo').append('<div data-aos="fade" data-aos-duration="400" class="table"></div>')

                if (curProvince[z].Date != '0001-01-01T00:00:00Z') {
                    addDescriptionRow(curProvince[z].CountryCode)
                    addTotalRow(curProvince, z)
                    if (z != 0) {
                        addNewRowProvince(curProvince, z, (z - 1))
                    }
                }
            }
            scrollTo("#countryInfo")
        }

    }).fail(function(data) {
        console.log(data)
    });
});

function getListName(data, province) {
    let listName = []
    let alreadyInList = true
    for (let i = 0; i < data.length; i++) {
        if (data[i].Province == province) {
            if (listName.length == 0) {
                listName.push(data[i].City)
            } else {
                for (let x = 0; x < listName.length; x++) {
                    if (listName[x] != data[i].City) {
                        alreadyInList = false
                    } else {
                        alreadyInList = true
                        break
                    }
                }
                if (alreadyInList == false) {
                    listName.push(data[i].City)
                }
            }
        }
    }
    return listName
}

function createCityChooser(cityList) {
    $('<div id="cityChooser"></div>').insertAfter('#provinceChooser')
    $('#cityChooser').append('<h2> Choose City </h2>')

    for (let i = 0; i < cityList.length; i++) {
        $('#cityChooser').append('<div> <p>' + cityList[i] + '</p> </div>')
    }
}

$(document).on('click', '#cityChooser div p', function() {
    $('#countryInfo').remove()
    $('<section id="countryInfo"></section>').insertAfter('#cityChooser')

    let thisCityName = $(this).text()
    let curCity = []

    $.ajax({
        url: 'https://api.covid19api.com/dayone/country/' + curCountry + '',
        dataType: 'JSON'
    }).done(function(data) {

        for (let i = 0; i < data.length; i++) {
            if (data[i].City == thisCityName) {
                curCity.push(data[i])
            } else if (data[0].Country == thisCityName && data[i].City == '') {
                curCity.push(data[i])
            }
        }

        console.log(curCity)

        for (let z = (curCity.length - 1); z >= 0; z--) {

            let timesSame = 0
            for (let x = 10; x >= 0; x--) {
                if (curCity[x].Date == curCity[x - 1].Date) {
                    timesSame += 1
                }
            }

            console.log(timesSame)

            let date = getDateFormat(curCity[z].Date)
            $('#countryInfo').append('<h1 data-aos="fade" data-aos-duration="400">' + date + '</h1>')

            $('#countryInfo').append('<div data-aos="fade" data-aos-duration="400" class="table"></div>')

            console.log(curCity)

            if (curCity[z].Date != '0001-01-01T00:00:00Z') {
                addDescriptionRow(curCity[z].CountryCode)
                addTotalRow(curCity, z)
                if (z != 0) {
                    addNewRowProvince(curCity, z, (z - 1))
                }
            }
        }

        scrollTo("#countryInfo")

    }).fail(function(data) {
        console.log(data)
    });
});

function scrollTo(element) {
    $('html, body').animate({
        scrollTop: $(element).offset().top
    }, 800);
}

function listName(data, name) {
    let listName = []
    let alreadyInList = true
    for (let i = 0; i < data.length; i++) {
        if (listName.length == 0) {
            listName.push(data[i].Province)
        } else {
            for (let x = 0; x < listName.length; x++) {
                if (listName[x] != data[i].Province) {
                    alreadyInList = false
                } else {
                    alreadyInList = true
                    break
                }
            }
            if (alreadyInList == false) {
                listName.push(data[i].Province)
            }
        } 
    }
    return listName
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

function showWithoutProvince(data, countryCode) {
    for (let i = (data.length - 1); i >= 0; i--) {
        let date = getDateFormat(data[i].Date)
        $('#countryInfo').append('<h1 data-aos="fade" data-aos-duration="400">' + date + '</h1>')
        $('#countryInfo').append('<div data-aos="fade" data-aos-duration="400" class="table"></div>')
        
        if (data[i].Date != '0001-01-01T00:00:00Z') {
            addDescriptionRow(countryCode)
            addTotalRow(data, i)
            if (i != 0) {
                addNewRow(data, i)
            }
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
    let newConfirmed = (data[i].Confirmed) - (data[indexNext].Confirmed)
    let newDeaths = (data[i].Deaths) - (data[indexNext].Deaths)
    let newRecovered = (data[i].Recovered) - (data[indexNext].Recovered)
    let newActive = (data[i].Active) - (data[indexNext].Active)
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p> New </p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p>' + newConfirmed + '</p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #e84a4a">' + newDeaths + '</p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #2f962f">' + newRecovered + '</p></div>')
    $('.table:nth-of-type(' + $('.table').length + ')').append('<div><p style="color: #d0d045">' + newActive + '</p></div>')
}

export default showCountryInfo