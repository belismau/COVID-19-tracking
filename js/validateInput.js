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
    console.log(name)
};

function showError() {
    console.log('error')
};

export default validateInput