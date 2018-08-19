let prevMenuItem = null;

let headers = {
    "weather": "Weather",
    "news": "News",
    "horoscope": "Horoscope",
    "notes": "Notes"
}

let updateDateTime = function () {
    $("#dateTime").text(moment().format('LLLL'))
}
updateDateTime();
setInterval(updateDateTime, 1000);

let selectPanel = function (menuItem) {
    $("#navPanels div").show();
    $("#detailPanels div").hide();
    $("#detailPanels div." + menuItem).show();
    if (prevMenuItem != null) $(".navbar").removeClass(prevMenuItem)
    $(".navbar").addClass(menuItem);
    $(".navbar-brand").text(headers[menuItem]);
    prevMenuItem = menuItem;
}

let activateDetailView = function (menuItem) {
    $(".container").hide();
    $(".container-fluid").show();
    selectPanel(menuItem);
}

let activateHomePage = function () {
    $(".container").show();
    $(".container-fluid").hide();
    populateAllCards();
}

/* Handlers for clicks on card*/

$(".container .weather").on("click", function () {
    activateDetailView("weather");
    populateWeatherDetail()
});

$(".container .news").on("click", function () {
    activateDetailView("news")
    populateNewsDetail();
});

$(".container .horoscope").on("click", function () {
    activateDetailView("horoscope")
    populateHoroscopeDetail();
});

$(".container .notes").on("click", function () {
    activateDetailView("notes")
    populateNotesDetail();
});

/* Handlers for clicks on detail menu items */

$('#backBtn').on("click", function () {
    activateHomePage();
});

$("#navPanels .weather").on("click", function () {
    selectPanel("weather");
    populateWeatherDetail()
});

$("#navPanels .news").on("click", function () {
    selectPanel("news")
    populateNewsDetail();
});

$("#navPanels .horoscope").on("click", function () {
    selectPanel("horoscope")
    populateHoroscopeDetail();
});

$("#navPanels .notes").on("click", function () {
    selectPanel("notes");
    populateNotesDetail();
});


//on page loaded
$(function () {

    //display date and time, change every 1 sec
    var navMain = $(".navbar-collapse");
    navMain.on("click", "a:not([data-toggle])", null, function () {
        navMain.collapse('hide');
    });

    populateAllCards();
});


/* functions that need to be implemented by ajax for all topics */
let populateWeatherCard = function () {
   
}

let populateWeatherDetail = function () {

}

let populateNewsCard = function () {
    $("#news").text("IBM is down by 3% - card")
}

let populateNewsDetail = function () {
    $("#detailPanels .news").text("IBM is down by 3% - detail")
}

let populateHoroscopeCard = function () {
    $("#horoscope").text("Today you will succeed - card")
}

let populateHoroscopeDetail = function () {
    $("#detailPanels .horoscope").text("Today you will succeed - detail")
}

let populateNotesCard = function () {
    $("#notes").html("<ul><li>Visit deprivation room</li><li>Buy milk</li></ul> - card")
}

let populateNotesDetail = function () {
    $("#detailPanels .notes").html("<ul><li>Visit deprivation room</li><li>Buy milk</li></ul> - detail")
}

let populateAllCards = function () {
    populateWeatherCard();
    populateNewsCard();
    populateHoroscopeCard();
    populateNotesCard();
}

