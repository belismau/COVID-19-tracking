function globalInfo() {
    $.ajax({
        url: 'https://api.covid19api.com/summary',
        dataType: 'JSON'
    }).done(function(data) {
        let globalData = []
        globalData.push(data.Global.TotalConfirmed, data.Global.TotalDeaths, data.Global.TotalRecovered, data.Global.NewConfirmed, data.Global.NewDeaths, data.Global.NewRecovered)

        // Check global-numbers to seperate their numbers

        for (let i = 0; i < globalData.length; i++) {
            let numToString = '' + globalData[i];

            if (numToString.length > 3 && numToString.length < 7) {  // if the number is higher than 999 and lower than 1 000 000
                let sepearationNumber = numToString.length - 3

                let finalNumber = ''
                for (let x = 0; x < numToString.length; x++) {
                    if (x != sepearationNumber) {
                        finalNumber = finalNumber + numToString[x]
                    } else {
                        finalNumber = finalNumber + ' ' + numToString[x]
                    }
                }

                globalData[i] = finalNumber

            } else if (numToString.length > 6 && numToString.length < 10) {  // 999 999 --> 1 000 000 000
                let firstSepNumber = numToString.length - 6
                let secondSepNumber = numToString.length - 3

                let finalNumber = ''
                for (let x = 0; x < numToString.length; x++) {
                    if (x != firstSepNumber && x != secondSepNumber) {
                        finalNumber = finalNumber + numToString[x]
                    } else {
                        finalNumber = finalNumber + ' ' + numToString[x]
                    }
                }
                globalData[i] = finalNumber
            } else {
                break
            }
        }

        $('<section id="globalInfo"></section>').insertAfter('#firstSide')
        $('#globalInfo').append('<div data-aos="fade-down" data-aos-duration="200" data-aos-delay="100"><p>Total confirmed</p> <h3>' + globalData[0] + '</h3></div>')
        $('#globalInfo').append('<div data-aos="fade-down" data-aos-duration="200" data-aos-delay="300"><p>Total deaths</p> <h3>' + globalData[1] + '</h3></div>')
        $('#globalInfo').append('<div data-aos="fade-down" data-aos-duration="200" data-aos-delay="600"><p>Total recovered</p> <h3>' + globalData[2] + '</h3></div>')
        $('#globalInfo').append('<div data-aos="fade-down" data-aos-duration="200" data-aos-delay="900"><p>New confirmed</p> <h3>' + globalData[3] + '</h3></div>')
        $('#globalInfo').append('<div data-aos="fade-down" data-aos-duration="200" data-aos-delay="1200"><p>New deaths</p> <h3>' + globalData[4] + '</h3></div>')
        $('#globalInfo').append('<div data-aos="fade-down" data-aos-duration="200" data-aos-delay="1500"><p>New recovered</p> <h3>' + globalData[5] + '</h3></div>')
    }).fail(function(data) {
        console.log(data)
    });
}

export default globalInfo