function getData() {
    $('#countryList div').remove()
    let input = ($('#countryInput').val()).toLowerCase()
    $.ajax({
        url: 'https://api.covid19api.com/countries',
        dataType: 'JSON'
    }).done(function(data) {
        removeInfoIfCountryChosen()
        for (let i = 0; i < data.length; i++) {
            let countryName = (data[i].Country).toLowerCase()
            if (input == countryName) {
                $('.countryBox').remove()
                addInfoIfCountryChosen(data[i].Country)
                break
            } else if (input == countryName.slice(0, input.length)) {
                let countryName = data[i].Country
                let countryCode = data[i].ISO2
                let image = getImage(countryCode)
                let name = countryName
                let content = '<div class="countryBox"> <img src="' + image + '"> <p>' + name + '</p> </div>'
                $('#countryList').append(content)
            } else {
                {}
            }
        }

    }).fail(function(data) {
        console.log(data)
    });
};

function addInfoIfCountryChosen(countryName) {
    $('#countryList').css('display', 'flex')
    $('#countryList').css('alignItems', 'center')
    $('#countryList').css('justifyContent', 'center')
    $('#countryList').append('<div style="display: flex; flex-direction: row;"></div>')
    $('#countryList').find('div').append('<i style="font-size: 18px;" class="fa fa-check-square"></i> <p style="color: #a5a5a5; margin: 0 0 0 6px; font-size: 18px">' + countryName + '</p>')
}

function removeInfoIfCountryChosen() {
    $('#countryList').css('display', 'block')
    $('#countryList').find('p').remove()
}

function getImage(countryCode) {
    return 'https://www.countryflags.io/' + countryCode + '/flat/64.png'
};

export default getData