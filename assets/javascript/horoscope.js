$(document).ready(function () {

    var queryURL = "https://www.horoscopes-and-astrology.com/json"
    var currentDate = moment().format('dddd, ' + 'LL');
    var pics = ["https://horoscopes-and-astrology.com/images/aries.svg",
        "https://horoscopes-and-astrology.com/images/taurus.svg",
        "https://horoscopes-and-astrology.com/images/gemini.svg",
        "https://horoscopes-and-astrology.com/images/cancer.svg",
        "https://horoscopes-and-astrology.com/images/leo.svg",
        "https://horoscopes-and-astrology.com/images/virgo.svg",
        "https://horoscopes-and-astrology.com/images/libra.svg",
        "https://horoscopes-and-astrology.com/images/scorpio.svg",
        "https://horoscopes-and-astrology.com/images/sagittarius.svg",
        "https://horoscopes-and-astrology.com/images/capricorn.svg",
        "https://horoscopes-and-astrology.com/images/aquarius.svg",
        "https://horoscopes-and-astrology.com/images/pisces.svg"]
    var scopes = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    var allScopes = [];


    $(".today-horoscope").text(currentDate);

    $('.dropdown-menu a').click(function () {
        $('#dropdownMenuButton').on('click', function () {
            $('#dropdown_title').html($(this).find('a').html());
        });

        var userSelection = $(this).attr("value")
        $('#dropdown_title').text(userSelection)
        console.log(userSelection);
        var newpic = pics[scopes.indexOf(userSelection)]
        $(".pic").attr("src", newpic)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var yourScope = response.dailyhoroscope[userSelection]
            $('.daily-horoscope').html(yourScope);
        });
    });

    $(document).on('click', '#scopeBtn', function () {

        function addRow(index) {
            
            $("#hor-display").append(
                ` <div class="row">
                              <div class="col-sm">
                                ${allScopes[index * 3].innerHTML}
                              </div>
                              <div class="col-sm">
                                ${allScopes[index * 3 + 1].innerHTML}
                              </div>
                              <div class="col-sm">
                                ${allScopes[index * 3 + 2].innerHTML}
                              </div>
                            </div>
                            `
            )
        }


        var currentDate = moment().format('dddd, ' + 'LL');
        $("#today").text(currentDate)

        var queryURL = "https://horoscopes-and-astrology.com/template/?&width=&widthunit=px&backgroundcolor=&textcolor=&border=OFF&image=&imageunit=px&borderradius=0&padding=10&margin=15"
        $.ajax({
            url: queryURL,
            method: "GET",
            success: function (result) {
                console.log(result)
                $(".daily-horoscope").hide()
                $(".daily-horoscope").append(result)

                setTimeout(() => {
                    $(".hor-daily").each((i, e) => {
                        $(e).attr('id', scopes[i])
                        allScopes.push($(e)[0])
                        $(e).remove()
                        $("#templateshow").hide()
                    })
                    addRow(0)
                    addRow(1)
                    addRow(2)
                    addRow(3)
                }, 200);
            }
        })
    })

});

