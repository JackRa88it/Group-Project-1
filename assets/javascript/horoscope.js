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

$(document).ready(function () {
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
});

