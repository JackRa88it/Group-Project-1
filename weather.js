// A $( document ).ready() block.
$( document ).ready(function() {
  console.log( "ready!" );


weathersm = document.getElementById("weather-btn-sm")
weatherbig = document.getElementById("weather-btn-big")
function weather() {
    var location = document.getElementById("location");
    var apiKey = "c8b3f483facbe7b28175e6aaa724b450";
    var url = "https://api.forecast.io/forecast/";
  
    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
  
      location.innerHTML =
        "Latitude is " + latitude + "° Longitude is " + longitude + "°";
  
      $.getJSON(
        url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
        function(data) {
          $("#temp").html(data.currently.temperature + "° F");
          $("#minutely").html(data.minutely.summary);
          $("#icon").html(data.minutely.icon);
          $("#moon").html(data.daily.moonPhase);
          
        }
      );
    }
  
    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
  
    location.innerHTML = "Locating...";
  }
  
  weather();

$(weathersm).on('click', function(){
  console.log("small clicked!");

     $("#weather-card-big").css('visibility', 'visible');



     $("#weather-card-small").css('visibility', 'hidden');
      
  

});


$(weatherbig).on('click', function(){
  console.log("big clicked!");

     $("#weather-card-big").css('visibility', 'hidden');



     $("#weather-card-small").css('visibility', 'visible');

  

});

});