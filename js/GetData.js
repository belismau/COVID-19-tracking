function getData() {
    $('#countryList div').remove()
    let input = ($('#countryInput').val()).toLowerCase()
    $.ajax({
        url: 'https://api.covid19api.com/countries',
        dataType: 'JSON'
    }).done(function(data) {

        for (let i = 0; i < data.length; i++) {
            let countryName = (data[i].Country).toLowerCase()
            if (input == countryName.slice(0, input.length)) {
                let countryName = data[i].Country
                let countryCode = data[i].ISO2
                let image = getImage(countryCode)
                let name = countryName
                let content = '<div> <img src="' + image + '"> <p>' + name + '</p> </div>'
                $('#countryList').append(content)
            }
        }
    }).fail(function(data) {
        console.log(data)
    });
};

function showCountriesByInput() {
}

function getImage(countryCode) {
    return 'https://www.countryflags.io/' + countryCode + '/flat/64.png'
};

export default getData