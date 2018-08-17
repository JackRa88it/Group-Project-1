// A $( document ).ready() block.
$( document ).ready(function() {

var latitude;
var longitude;


weathersm = document.getElementById("weather-btn-small-card")
weatherbig = document.getElementById("weather-btn-big-card")
function weather() {
    var location = document.getElementById("location");
    var apiKey = "c8b3f483facbe7b28175e6aaa724b450";
    var url = "https://api.forecast.io/forecast/";
    
    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

      console.log( latitude);
      console.log( longitude);

      
      // location.innerHTML =
      //   "Latitude is " + latitude + "° Longitude is " + longitude + "°";
  
      $.getJSON(
        url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
        function(data) {
          $(".temp").html(data.currently.temperature + "° F");
          $(".minutely").html(data.minutely.summary);
          $(".hum").html( "The Humidity in your area is " + data.currently.humidity + "%")
          console.log(data)

          var dayU = moment.unix(data.daily.data[0].sunriseTime); //seconds
          var dayD = moment.unix(data.daily.data[0].sunsetTime); //seconds

          $(".sunUp").html( "Sunrise Time: " + dayU.format('h:mm:ss a'))
          $(".sunDwn").html( "Sunset Time: " + dayD.format('h:mm:ss a'))


          
          // and then:
          
          console.log(dayD.format('dddd MMMM Do YYYY, h:mm:ss a'));
          




          console.log(data.currently.humidity)
          if (data.minutely.icon==="clear-day"){
            $(".icon").html("<img src='assets/weather-icons/clear-day.png' >")
           
           }
           
           else if (data.minutely.icon==="clear-night"){
             $(".icon").html("<img src='assets/weather-icons/clear-night.png' >")
            
            }
           
            
           else if (data.minutely.icon==="cloudy"){
             $(".icon").html("<img src='assets/weather-icons/cloudy.png' >")
            
            }
           
            
           else if (data.minutely.icon==="fog"){
             $(".icon").html('<img src="assets/weather-icons/fog.png" >')
            
            }
           
            
           else if (data.minutely.icon=="partly-cloudy-day"){
             $(".icon").html('<img src="./assets/weather-icons/partly-cloudy-day.png" >')
            
            }
            
           else if (data.minutely.icon==="partly-cloudy-night"){
             $(".icon").html('<img src="assets/weather-icons/partly-cloudy-night.png" >')
            
            }
           
            else if (data.minutely.icon==="rain"){
             $(".icon").html('<img src="assets/weather-icons/rain.png" >')
            
            }
            else if (data.minutely.icon==="sleet"){
             $(".icon").html('<img src="assets/weather-icons/sleet.png" >')
            
            }
           
            else if (data.minutely.icon==="snow"){
             $(".icon").html('<img src="assets/weather-icons/snow.png" >')
            
            }
           
            else {
             $(".icon").html('<img src="assets/weather-icons/wind.png" >')
            
            };
          
            initMap(latitude, longitude);

          
        }
      );
    }
  
    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
  
    location.innerHTML = "Locating...";
  };
  
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


function initMap(latitude, longitude) {
  console.log(typeof latitude, typeof longitude);
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:latitude, lng: longitude},
    zoom: 20
  });
}

var geocoder = new google.maps.Geocoder;
var infowindow = new google.maps.InfoWindow;

document.getElementById('weather-btn-big-card').addEventListener('click', function() {
  geocodeLatLng(geocoder, map, infowindow);
});

function geocodeLatLng(geocoder, map, infowindow) {
    var input = latitude + "," + longitude;
    var latlngStr = input.split(',', 2);
    console.log(typeof latlngStr);

    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          map.setZoom(11);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
};
    console.log("this is the hgin" + latitude)
    var queryURL="http://api.geonames.org/findNearestAddressJSON?lat="+latitude+"&lng="+longitude+"&username=demo "
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(Adress) {

    console.log(Adress)
    })

});