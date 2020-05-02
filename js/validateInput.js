import removeInfoIfCountryChosen from './getData.js';
import showCountryInfo from './showCountryInfo.js';

let loader = false

function validateInput() {
    loader = true
    if (loader == true) {
        loader = false
        $(document).on({
            ajaxStart: function() { 
                $('#loaderForAPI').css('opacity', '.8')
                $('#loaderForAPI').css('pointer-events', 'visible')
            },
            ajaxStop: function() { 
                $('#loaderForAPI').css('opacity', '0')
                $('#loaderForAPI').css('pointer-events', 'none')
            }
        });
    }
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