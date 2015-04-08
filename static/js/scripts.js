(function(){

    // color properties for styling the map
    var map_styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#e6f3d6"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f4d2c5"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#f4f4f4"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#eaf6f8"}]}];


    // stores location data
    var json_data = 'unset';


    // grab json data for store locations
    var pull_data = function()
    {
        $.get( "/assets/data/locations.json" , function() 
        {
            console.log("getting data");
        })
        .done(function( data ) 
        {
            console.log("got the data:", data);

            // call the function and feed it the data
            draw_map( data );

        })
        .fail(function() {
            alert( "error" );
        });
    }


    // 
    function draw_map( data )
    {
        var dom_container = document.getElementById('map-canvas');

        // if we don't have a place to put the map then go no further
        if( !dom_container ){
            return;
        }

        // configure the map
        var mapOptions = {
            center: new google.maps.LatLng( 40.716269 , -74.008632 ),
            zoom: 14,
            styles: map_styles,
            mapTypeControl: false,
            panControl: false,
            zoomControl: false
        };

        // draw the map on the map canvas dom element
        var map = new google.maps.Map( dom_container , mapOptions);

        // create infowindow object
        var infowindow = new google.maps.InfoWindow();

        // list DOM object
        var $list = $('#list');

        // loop through the data we got from 
        for( var i = 0 , length = data.length ; i < length ; i++ ) {

            // parsing each individual data entry
            (function( index_value )
            {

                // pointer , so to speak
                var index = index_value;

                // order number ( appears on list )
                var order = index + 1;

                // this is the individual data item - in our case, the restaurant
                var item = data[index];

                // create coordinates from the latitude and longitude of the restaurant
                var coordinates = new google.maps.LatLng( item.latitude , item.longitude );

                // prepare a new google map marker at those coordinates
                var marker = new google.maps.Marker({
                    position: coordinates,
                    map: map,
                    // icon: '/static/img/map_marker.png',
                    icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + order + '|27acb4|000000',
                    title: item.address
                });

                // prepare the content that will go into each map marker pop-up
                var content_string =
                    '<div class="popup-parent">' +
                        '<h2>' + item.name + '<h2>' +  
                        '<p>' + item.address + '</p>' + 
                        '<p>' + item.tel + '</p>' + 
                    '</div>';

                // prepare an event listener for each marker
                google.maps.event.addListener(marker, 'click', function()
                {
                    // pass the popup content to the window
                    infowindow.setContent( content_string );
                    infowindow.open( map , marker );

                    // grab the coordinates of the marker
                    var pos = marker.getPosition();
                    var lat = pos.lat();
                    var lng = pos.lng();

                    // focus on the area when user clicks a point on the map
                    google.maps.event.addListener(infowindow, 'domready', function() {
                        map.setCenter(new google.maps.LatLng( lat , lng ));
                    });
                });

                // don't go any further for the time being
                return;

                // prepare a list entry for our location
                // NOTE: this may not be necessary :: we may use a table
                var list_string = '<li class="list-item" data-pos="' + coordinates + '">' + item.name + ' - ' + i + '</li>';

                // append the list item to the parent list
                $list.append( function(){
                    return $( list_string ).on( 'click' , function( evt ) {
                        map.setZoom(7);
                        map.setCenter( marker.getPosition() );
                        infowindow.setContent( content_string );
                        infowindow.open( map , marker );
                    });
                });

            })( i ); // use a closure to prevent the index from being overridden :: helps with looping

        }

        // if the user clicks anywhere on the map, close any pop-ups that may be open
        google.maps.event.addListener( map , 'click', function() {
            infowindow.close();
        });

    }; // end draw map


    // our navigation menu on mobile devices

    function toggle_mobile_nav_menu()
    {
        // hide the overlay wrapper hit area
        $('#nav-menu-close-trigger').slideToggle(350);

        // console.log("toggling the menu");
        $('#nav-menu-overlay').animate({width:'toggle'},350);

        // toggleIcon
        var icon = $('#nav-menu-icon');
        if( icon.hasClass('fa-bars'))
        {
            icon.removeClass('fa-bars');
            icon.addClass('fa-close');
        } else
        {
            icon.removeClass('fa-close');
            icon.addClass('fa-bars');
        }
    }


    // once everything has been loaded, we can have our fun
    $(document).ready(function(){

        // nav

        // empower the hamburger to toggle the menu
        $('#nav-menu-toggle').on('tap click', function(){
            toggle_mobile_nav_menu();
        });

        // if the user clicks on-screen off of the menu, close it
        $('#nav-menu-close-trigger').on('tap click', function(){
            toggle_mobile_nav_menu();
        });


        // modals

        $('.lightbox-close').on('tap click', function( event ){
            var clicked = $(this);
            var target = clicked.attr('data-dismiss-target');
            $( target ).modal('hide');
        });


        // for later
        /*
        // hunt down svg images and replace them with png if the browser does not support png
        if(!Modernizr.svg) {
            $('img[src*="svg"]').attr('src', function() {
                return $(this).attr('src').replace('.svg', '.png');
            });
        }
        */


        // get the locations
        // TODO: check for element before doing this

        pull_data();

    });

})(jQuery);

