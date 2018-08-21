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
    // make sure to also show all children of the "tab"
    $("#detailPanels div." + menuItem + " div").show();
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
    populateAll();
}

$('#backBtn').on("click", function () {
    activateHomePage();
});

$("#navPanels .weather").on("click", function () {
    selectPanel("weather");
    populateWeather()
});

$(".container .weather").on("click", function () {
    activateDetailView("weather");
    populateWeather()
});

$("#navPanels .news").on("click", function () {
    selectPanel("news")
    populateNews();
});

$(".container .news").on("click", function () {
    activateDetailView("news")
    populateNews();
});

$("#navPanels .traffic").on("click", function () {
    selectPanel("traffic")
    populateTraffic();
});

$(".container .traffic").on("click", function () {
    activateDetailView("traffic")
    populateTraffic();
});

$("#navPanels .notes").on("click", function () {
    selectPanel("notes");
    populateNotes();
});

$(".container .notes").on("click", function () {
    activateDetailView("notes")
    populateNotes();
});


// $(function () {
//     populateAllCards();
// }

/* Handlers for clicks on card*/

// $(".container .weather").on("click", function () {
//     activateDetailView("weather");
//     populateWeatherDetail()
// });

// $(".container .news").on("click", function () {
//     activateDetailView("news")
//     populateNewsDetail();
// });

// $(".container .horoscope").on("click", function () {
//     activateDetailView("horoscope")
//     populateHoroscopeDetail();
// });

// $("#notesHeader").on("click", function () {
//     activateDetailView("notes")
//     populateNotesDetail();
// });

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

    populateAll()
});


/* functions that need to be implemented by ajax for all topics */
let populateWeather = function () {
    $("#weather, #detailPanels .weather").text("45F")
}

function loadPage(nytData);

let populateNews = function () {
    $("#news, #detailPanels .news").text("IBM is down by 3%")
}

let populateTraffic = function () {
    $("#traffic, #detailPanels .traffic").text("Today you will succeed")
}

let populateNotes = function () {
    $("#notes, #detailPanels .notes").html("<ul><li>Visit deprivation room</li><li>Buy milk</li></ul>")
}

let populateAll = function () {
    populateWeather();
    populateNews();
    populateTraffic();
    populateNotes();
}

