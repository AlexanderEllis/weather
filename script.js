$(document).ready(function(){
 
 var printWeather = function(data) {
 var tempC = Math.floor(data.main.temp - 273);
 var tempF = Math.floor(tempC * 9 / 5 + 32);
 var conditions = data.weather[0].main;
 $("#condition").text(conditions);
 $("#f").html(tempF + "°" + '<a class = "tempChange">F</a>');
 $("#c").html(tempC + "°" + '<a class = "tempChange">C</a>');
 var sunrise = data.sys.sunrise * 1000;
 var sunset = data.sys.sunset * 1000;
 var timeNow = (new Date).getTime();

  switch (conditions) {
    case "Clouds":
      $("#clouds").toggle();
     break;
    case "Clear":
         if (timeNow > sunrise && timeNow < sunset) {
      $("#clear").toggle();
     }
     else {
      $("#night").toggle();
     }
       break;
    case "Rain":
       $("#rain").toggle();
       break;
    case "Snow":
       $("#snow").toggle();
       break;
  };
 };
 
navigator.geolocation.getCurrentPosition(function(position) {
  lat = position.coords.latitude.toFixed(2);
  long = position.coords.longitude.toFixed(2);
  $("#coordinates").text("Latitude: " + lat + ", Longitude: " + long);
 
  $.ajax({
 url: "http://openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=e22745335a18318bf2d40d528911663d",
 dataType: "json",
 success: printWeather
 });
 
 var cityState = function(data) {
 var city = (data.results[0].address_components[3]["long_name"]);
  var state = data.results[0].address_components[5]["long_name"];
  $("#cityState").text(city + ", " + state);
 };
 
 $.ajax({
  url:"http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long,
  dataType:"json",
  success: cityState
 });
 });



 var tSwitch = function() {
  $("#f").toggle();
  $("#c").toggle();
 };
 
 $("#f").on("click", function() {
  tSwitch();
 });
 
 $("#c").on("click", function() {
  tSwitch();
 });
 
});