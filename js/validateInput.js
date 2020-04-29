import removeInfoIfCountryChosen from './getData.js';
import showCountryInfo from './showCountryInfo.js';

function validateInput() {
    let input = ($('#countryInput').val()).toLowerCase()
    $.ajax({
        url: 'https://api.covid19api.com/countries',
        dataType: 'JSON'
    }).done(function(data) {
        for (let i = 0; i < data.length; i++) {
            if (input == (data[i].Country).toLowerCase()) {
                showCountryInfo(data[i].Slug, data[i].ISO2)
                $('#countryInput').val('');
                removeInfoIfCountryChosen()
                return
            }
        }
    }).fail(function(data) {
        console.log(data)
    });
};

export default validateInput