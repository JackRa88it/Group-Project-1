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
    $('#detailPanels .notes').hide();
    $("#navPanels div").show();
    $("#detailPanels div").hide();
    $("#detailPanels div." + menuItem).show();
    // make sure to also show all children of the "tab"
    $("#detailPanels div." + menuItem + " div").show();
    if (prevMenuItem != null) {
        $(".navbar").removeClass(prevMenuItem)
    }
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

$(".container .horoscope .card-header").on("click", function () {
    activateDetailView("horoscope")
    populateHoroscopeDetail();
});

$("#notesHeader").on("click", function () {
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

}

let populateNewsDetail = function () {
   
}
let populateHoroscopeCard = function () {
 
}

let populateHoroscopeDetail = function () {
    
}

let populateNotesCard = function () {
   
}

let populateNotesDetail = function () {
    
}

let populateAllCards = function () {
    populateWeatherCard();
    populateNewsCard();
    populateHoroscopeCard();
    populateNotesCard();
}

