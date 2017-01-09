$(document).ready(function (){
    // create a LatLng object containing the coordinate for the center of the map
    var latlng = new google.maps.LatLng(14.5495929, 121.0458753);

    // prepare the map properties
    var options = {
        zoom: 17,
        radius: '500',
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControl: true,
        mapTypeControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        styles: [
            {

            featureType: "poi.business",

            elementType: "labels",

            stylers: [

            { visibility: "off" }

            ]

            }
        ]
    };
    
    // initialize the map object
    var map = new google.maps.Map(document.getElementById('google_map'), options);

    // add Marker
    var marker1 = new google.maps.Marker({
        position: latlng, map: map
    });

    // add listener for a click on the pin
    google.maps.event.addListener(marker1, 'click', function() {
        infowindow.open(map, marker1);
    });

    // add information window
    var infowindow = new google.maps.InfoWindow({
        content:  '<div class="info"><img src="../images/FINAL_LOGO1.png" style="height:30px;" /><br><br>Marajo Tower, 312 26th St. <br />Fort Bonifacio, Taguig, Metro Manila</div>'
    });  
  
    //show on load
    infowindow.open(map, marker1);
});