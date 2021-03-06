// A $( document ).ready() block.
$(document).ready(function () {

  var latitude = 37.832294399999995;
  var longitude = -122.23692799999999;
  // var weathersm = document.getElementById("weather-btn-small-card")
  // var weatherbig = document.getElementById("weather-btn-big-card")

  function weather() {
    var location = $(".location");
    var apiKey = "c8b3f483facbe7b28175e6aaa724b450";
    var url = "https://api.forecast.io/forecast/";

    // navigator.geolocation.getCurrentPosition(success, error);

    // function success(position) {
    // latitude = position.coords.latitude;

    // longitude = position.coords.longitude;
    // console.log(latitude);
    // console.log(longitude);
    town();

    //This is where you should continue with cleaning up indentation
    $.getJSON(
      url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
      function (data) {

        $(".temp").html("Temperature: " + data.currently.temperature + "° F");
        $(".hourly").html(data.hourly.summary);
        $(".hum").html("The Humidity is " + data.currently.humidity + "%")
        $('.wind').html("The Wind Speed is " + data.currently.windSpeed)
        $('.ozone').html("The Ozone Level " + data.currently.ozone)
        $('.sum').html(data.daily.summary)
        $('.w.more').show();


        $('.uv').html("The UV Level " + data.currently.uvIndex)
        // console.log(data)

        var dayU = moment.unix(data.daily.data[0].sunriseTime); //seconds
        var dayD = moment.unix(data.daily.data[0].sunsetTime); //seconds

        $(".sunUp").html("Sunrise Time: " + dayU.format('h:mm:ss a'))
        $(".sunDwn").html("Sunset Time: " + dayD.format('h:mm:ss a'))



        // and then:

        // console.log(dayD.format('dddd MMMM Do YYYY, h:mm:ss a'));





        // console.log(data.currently.humidity)
        if (data.hourly.icon === "clear-day") {
          $(".icon").html("<img src='/assets/weather-icons/clear-day.png' >")

        }

        else if (data.hourly.icon === "clear-night") {
          $(".icon").html("<img src='/assets/weather-icons/clear-night.png' >")

        }


        else if (data.hourly.icon === "cloudy") {
          $(".icon").html("<img src='/assets/weather-icons/cloudy.png' >")

        }


        else if (data.hourly.icon === "fog") {
          $(".icon").html('<img src="./assets/weather-icons/fog.png" >')

        }


        else if (data.hourly.icon == "partly-cloudy-day") {
          $(".icon").html('<img src="./assets/weather-icons/partly-cloudy-day.png" >')

        }

        else if (data.hourly.icon === "partly-cloudy-night") {
          $(".icon").html('<img src="./assets/weather-icons/partly-cloudy-night.png" >')

        }

        else if (data.hourly.icon === "rain") {
          $(".icon").html('<img src="./assets/weather-icons/rain.png" >')

        }
        else if (data.hourly.icon === "sleet") {
          $(".icon").html('<img src="./assets/weather-icons/sleet.png" >')

        }

        else if (data.hourly.icon === "snow") {
          $(".icon").html('<img src="./assets/weather-icons/snow.png" >')

        }

        else {
          $(".icon").html('<img src="./assets/weather-icons/wind.png" >')

        };

        // initMap(latitude, longitude);


      }
    );
  }

  //   function error() {
  //     location.innerHTML = "Unable to retrieve your location";
  //   }

  //   location.innerHTML = "Locating...";
  // };

  weather();

  // $(weathersm).on('click', function(){
  //   console.log("small clicked!");
  //     $("#weather-card-big").css('visibility', 'visible');
  //     $("#weather-card-small").css('visibility', 'hidden');
  // });


  // $(weatherbig).on('click', function(){
  //   console.log("big clicked!");
  //     $("#weather-card-big").css('visibility', 'hidden');
  //     $("#weather-card-small").css('visibility', 'visible');
  // });


  // function initMap(latitude, longitude) {

  //   map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat:latitude, lng: longitude},
  //     zoom: 20
  //   });
  // }

  // var geocoder = new google.maps.Geocoder;
  // var infowindow = new google.maps.InfoWindow;

  // document.addEventListener('click', function() {
  //   geocodeLatLng(geocoder, map, infowindow);
  // });

  // function geocodeLatLng(geocoder, map, infowindow) {
  //     var input = latitude + "," + longitude;
  //     var latlngStr = input.split(',', 2);


  //     var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  //     geocoder.geocode({'location': latlng}, function(results, status) {
  //       if (status === 'OK') {
  //         if (results[0]) {
  //           map.setZoom();
  //           var marker = new google.maps.Marker({
  //             position: latlng,
  //             map: map
  //           });
  //           infowindow.setContent(results[0].formatted_address);
  //           infowindow.open(map, marker);
  //         } else {
  //           window.alert('No results found');
  //         }
  //       } else {
  //         window.alert('Geocoder failed due to: ' + status);
  //       }
  //     });
  // };

  // console.log("this is the hgin" + latitude);

  function town() {
    var lon = parseFloat(longitude)
    var lat = parseFloat(latitude)
    var queryURL = "http://api.geonames.org/findNearestAddressJSON?lat=" + lat + "&lng=" + lon + "&username=cmeeder1207 "

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (address) {
      // console.log(address);

      $(".location").text("Location: " + address.address.placename + " " + address.address.adminCode1);
    });

  }


});