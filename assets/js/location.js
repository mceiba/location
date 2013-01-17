/**
 * User: Calvin
 * Date: 13-1-17
 * Time: 下午10:57
 */
var cz_location = {
    init: function(){
        var latlng = new google.maps.LatLng(36.0757117,120.4128609);
        var myOptions = {
            zoom: 8,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);
    },
    locate: function(){
        //cz_location.resize();
        var initialLocation;
        var qingdao = new google.maps.LatLng(36.0757117,120.4128609);
        var browserSupportFlag =  new Boolean();
        var myOptions = {
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        // Try W3C Geolocation (Preferred)
        if(navigator.geolocation) {
            browserSupportFlag = true;
            navigator.geolocation.getCurrentPosition(function(position) {
                initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                map.setCenter(initialLocation);
            }, function() {
                handleNoGeolocation(browserSupportFlag);
            });
            // Try Google Gears Geolocation
        } else if (google.gears) {
            browserSupportFlag = true;
            var geo = google.gears.factory.create('beta.geolocation');
            geo.getCurrentPosition(function(position) {
                initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
                map.setCenter(initialLocation);
            }, function() {
                handleNoGeoLocation(browserSupportFlag);
            });
            // Browser doesn't support Geolocation
        } else {
            browserSupportFlag = false;
            handleNoGeolocation(browserSupportFlag);
        }

        function handleNoGeolocation(errorFlag) {
            if (errorFlag == true) {
                alert("Geolocation service failed.");
                initialLocation = qingdao;
            } else {
                alert("Your browser doesn't support geolocation. We've placed you in Qingdao.");
                initialLocation = qingdao;
            }
            map.setCenter(initialLocation);
        }
    },
    resize: function(){
        availWidth = parseInt(document.body.clientWidth);
        availHeight = parseInt(document.body.clientHeight);
        document.getElementById("map_canvas").style.width = availWidth+'px';
        document.getElementById("map_canvas").style.height = availHeight+'px';
    }
}