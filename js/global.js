function globalInfo() {
    $.ajax({
        url: 'https://api.covid19api.com/summary',
        dataType: 'JSON'
    }).done(function(data) {
        $('#globalInfo').append('<div><p>Total confirmed</p> <h3>' + data.Global.TotalConfirmed + '</h3></div>')
        $('#globalInfo').append('<div><p>Total deaths</p> <h3>' + data.Global.TotalDeaths + '</h3></div>')
        $('#globalInfo').append('<div><p>Total recovered</p> <h3>' + data.Global.TotalRecovered + '</h3></div>')
        $('#globalInfo').append('<div><p>New confirmed</p> <h3>' + data.Global.NewConfirmed + '</h3></div>')
        $('#globalInfo').append('<div><p>New deaths</p> <h3>' + data.Global.NewDeaths + '</h3></div>')
        $('#globalInfo').append('<div><p>New recovered</p> <h3>' + data.Global.NewRecovered + '</h3></div>')
        /* let date = (data.Date).slice(0, 10)
        let clock = (data.Date).slice(11, 19)
        $('<p id="time">' + date + ' | ' + clock + '</p>').insertBefore('#globalInfo') */
    }).fail(function(data) {
        console.log(data)
    });
}

export default globalInfo