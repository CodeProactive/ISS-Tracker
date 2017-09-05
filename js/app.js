var spanText = $("#ISSLocation");
var apiKey = "AIzaSyByXvkrZZSCce0Evurv3yY-ZQnWYmLkWVk"
var issLocationUrl = 'http://api.open-notify.org/iss-now.json';
var googleReverseGeocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
var googleReverseGeocodingUrl2 = '&key=AIzaSyByXvkrZZSCce0Evurv3yY-ZQnWYmLkWVk'
var spanLatitude = $("#latitude");
var spanLongitude = $("#longitude");
var issLatitude = 0;
var issLongitude = 0;
var myLatLng = new google.maps.LatLng(issLatitude, issLongitude);
var myOptions = {
    zoom: 4,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById('map'), myOptions);
var marker = marker = new google.maps.Marker( {position: myLatLng, map: map, icon: 'img/iss-icon.png'} );

$(document).ready(function () {
    initialize();
});

function initialize() {
    marker.setMap(map);
    getISSLocation();
}

function moveMarker() {
    var position = new google.maps.LatLng(issLatitude, issLongitude);
    marker.setPosition(position);
    map.panTo(position);
}

var getISSLocation = () =>
{
    setInterval(function () {
        $.ajax({
            type: 'GET',
            url: issLocationUrl,
        }).done(function (response) {
            let serverResponse1 = response.iss_position;
            issLatitude = serverResponse1.latitude;
            issLongitude = serverResponse1.longitude;
            spanLatitude.html(serverResponse1.latitude)
            spanLongitude.html(serverResponse1.longitude)

            $.ajax({
                type: 'GET',
                url: googleReverseGeocodingUrl + issLatitude + ',' + issLongitude + googleReverseGeocodingUrl2,
            }).done(function (response) {
                if(response.status == "ZERO_RESULTS") {
                    spanText.html("wodą.");
                } else {
                    let serverResponse2 = response.results[0].formatted_address;
                    spanText.html(serverResponse2);
                }
            })
            moveMarker()
        }).fail(function (error) {
            console.log(error);
        });
    }, 3100);
}
