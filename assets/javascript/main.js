let prevMenuItem = null;

let headers = {
    "weather": "Weather",
    "news": "News",
    "traffic": "Horoscope",
    "notes": "Notes"
}

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
}

$('#backBtn').on("click", function () {
    activateHomePage();
});

$("#navPanels .weather").on("click", function () {
    selectPanel("weather");
});

$(".container .weather").on("click", function () {
    activateDetailView("weather");
});

$("#navPanels .news").on("click", function () {
    selectPanel("news")
});

$(".container .news").on("click", function () {
    activateDetailView("news")
});

$("#navPanels .traffic").on("click", function () {
    selectPanel("traffic")
});

$(".container .traffic").on("click", function () {
    activateDetailView("traffic")
});

$("#navPanels .notes").on("click", function () {
    selectPanel("notes")
});

$(".container .notes").on("click", function () {
    activateDetailView("notes")
});