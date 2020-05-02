function globalInfo() {
    $.ajax({
        url: 'https://api.covid19api.com/summary',
        dataType: 'JSON'
    }).done(function(data) {
        $('<section id="globalInfo"></section>').insertAfter('#firstSide')
        $('#globalInfo').append('<div data-aos="fade-down" data-aos-duration="200" data-aos-delay="100"><p>Total confirmed</p> <h3>' + data.Global.TotalConfirmed + '</h3></div>')
        $('#globalInfo').append('<div data-aos="fade-down" data-aos-duration="200" data-aos-delay="300"><p>Total deaths</p> <h3>' + data.Global.TotalDeaths + '</h3></div>')
        $('#globalInfo').append('<div data-aos="fade-down" data-aos-duration="200" data-aos-delay="600"><p>Total recovered</p> <h3>' + data.Global.TotalRecovered + '</h3></div>')
        $('#globalInfo').append('<div data-aos="fade-down" data-aos-duration="200" data-aos-delay="900"><p>New confirmed</p> <h3>' + data.Global.NewConfirmed + '</h3></div>')
        $('#globalInfo').append('<div data-aos="fade-down" data-aos-duration="200" data-aos-delay="1200"><p>New deaths</p> <h3>' + data.Global.NewDeaths + '</h3></div>')
        $('#globalInfo').append('<div data-aos="fade-down" data-aos-duration="200" data-aos-delay="1500"><p>New recovered</p> <h3>' + data.Global.NewRecovered + '</h3></div>')
    }).fail(function(data) {
        console.log(data)
    });
}

export default globalInfo