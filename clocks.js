function TimeSetter(longtitude,latitude) {


  var currentDate = new Date();
  var TimeStamp = Math.round(currentDate.getTime() / 1000);
  var TimeInformation;
  var splitTimeInformation;
console.log("https://maps.googleapis.com/maps/api/timezone/json?location="+latitude+","+longtitude+"&timestamp="+TimeStamp+"&key=AIzaSyCmTEBuLF3S3DchTodXclKO6AJ9w7GfsCQ")
  var jqxhr = $.getJSON("https://maps.googleapis.com/maps/api/timezone/json?location="+latitude+","+longtitude+"&timestamp="+TimeStamp+"&key=AIzaSyCmTEBuLF3S3DchTodXclKO6AJ9w7GfsCQ", function() {
    console.log( jqxhr );
    TimeInformation = JSON.parse(jqxhr.responseText);
  //  console.log(TimeInformation);
    var LocalTime = TimeInformation.dstOffset + TimeInformation.rawOffset + TimeStamp + currentDate.getTimezoneOffset()*60;
    var currentTime = new Date(LocalTime*1000);

    //currentDate = new Date();
    var currentSeconds = currentTime.getSeconds();
    var currentMinutes = currentTime.getMinutes()*60;

    var currentAnalogHours = ( currentTime.getHours() > 11 ) ? currentTime.getHours() - 12 : currentTime.getHours();
    console.log(currentAnalogHours+ ":"  + currentTime.getMinutes()+ ":"+currentSeconds);
    var currentHours = currentMinutes + ( currentAnalogHours * 3600 );

///reload the clock completely
$("#clock").empty();
$("#clock").append("<div class=\"clock-case\"><div class=\"clock-dial\"><div class=\"clock-hour-hand\"></div><div class=\"clock-minute-hand\"></div><div class=\"clock-second-hand\"></div><div class=\"clock-nut\"></div><div class=\"clock-ratio\"></div><div class=\"clock-stripe-upper\"></div><div class=\"clock-stripe-lower\"></div><div class=\"clock-stripe-left\"></div><div class=\"clock-stripe-right\"></div></div></div>");



    //jQuery( '.clock-second-hand' ).css( 'animation-delay', '-' + '20' + 's' );

    //$('.block').stop(true).css({top: 0, left: 0});

    jQuery( '.clock-second-hand' ).css( 'animation-delay', '-' + currentSeconds + 's' );
    jQuery( '.clock-minute-hand' ).css( 'animation-delay', '-' + currentMinutes + 's' );
    jQuery( '.clock-hour-hand' ).css( 'animation-delay', '-' + currentHours + 's' );


    $("body").css("background", "");
    if(currentTime.getHours()>=18 || currentTime.getHours()<=6)
    {
      $('body').css("background", "url(images/bg2.jpg) no-repeat center center fixed");
    }else{

  $('body').css("background", "url(images/bg3.jpg) no-repeat center center fixed").fadeIn();
    }
  });
}



function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      console.log(results[0].geometry.location.lat()+ ":" +results[0].geometry.location.lng());
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      TimeSetter(results[0].geometry.location.lng(),results[0].geometry.location.lat());
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
