/**
 *
 * Bootstrap one-page template with Parallax effect | Script Tutorials
 * http://www.script-tutorials.com/bootstrap-one-page-template-with-parallax-effect/
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Script Tutorials
 * http://www.script-tutorials.com/
 */

var panels = [];

function togglepanel(panel){
  if(!in_array(panels, panel)){
    panels.push(panel);
  }
  else {
    for(var i in panels){
      if(panels[i] == panel){
        panels.splice(i, 1);
      }
    }
  }
}

function in_array(arr, str){
  var found=false
  for(var i in arr){
    if(arr[i] == str){
      found = true
    }
  }

  return found;
}

$(document).ready(function (){


  // $('#submitinterest').on('click', function(data){
  //   $.post('/user/interest', { interests : panels.join(','), customer_id : $('#hidden_customerid').val() }, function(data){
  //     $('#Register_thankyou').modal('toggle');
  //   });
  // });

  // $('#close_thankyou').on('click', function(data){
  //   window.location = '/';
  // });

  // $('.required-icon').tooltip({
  //     placement: 'left',
  //     title: 'Required field'
  // });

  var Accordion = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find('.link');
    // Evento
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
  }

  Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el;
      $this = $(this),
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
    };
  } 

  var accordion = new Accordion($('#accordion'), false);

  $(".panel-choices").click(function(){
      $(this).toggleClass("checked");
  });

  // $.backstretch("../images/sketch_bg.png");

  $('.owl-carousel').owlCarousel({
      items:1,
      autoplay: true,
      loop:true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      smartSpeed:1500
  });

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