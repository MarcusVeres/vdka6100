(function(){

    // google maps geolocation variables
    var google_prefix = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    var google_suffix = '&key=AIzaSyAdVeDCpF1gDswiV6rRNJF7Ibqi6aJAtvs';

    // the main google map 
    var map = 'unset';


    // age verification

    // if we are not on the landing page
    if( window.location.pathname != '/' )
    {
        var age_cookie = $.cookie('age-verification');

        // if the user has not verified their age...
        if( age_cookie != 1 )
        {
            // console.log( "is not 1" );

            // redirect to the index page
            window.location.href = '/';
        }

    }


    // color properties for styling the map
    var map_styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#e6f3d6"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f4d2c5"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#f4f4f4"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#eaf6f8"}]}];


    // stores location data
    var json_data = 'unset';

    // grab json data for store locations
    var pull_data = function( source , options )
    {
        $.get( source , function() 
        {
            // console.log("getting data");
        })
        .done(function( data ) 
        {
            // console.log("got the data:", data);

            // call the function and feed it the data
            draw_map( data , options );

        })
        .fail(function() {
            alert( "error" );
        });
    }


    function draw_map( data , options )
    {
        var dom_container = document.getElementById('map-canvas');

        // if we don't have a place to put the map then go no further
        if( !dom_container ){
            return;
        }

        // check for options
        if( options ){
            var zoom = options.zoom;
            var center = options.center;
        }

        // configure the map
        var mapOptions = {
            center: center || new google.maps.LatLng( 37 , -98.35 ),
            zoom: zoom || 4,
            styles: map_styles,
            mapTypeControl: false,
            panControl: false,
            zoomControl: true
        };

        // draw the map on the map canvas dom element
        map = new google.maps.Map( dom_container , mapOptions);

        // create infowindow object
        var infowindow = new google.maps.InfoWindow();

        // list DOM object
        var $list = $('#list');

        // markers array
        var markers_array = [];

        // loop through the data we got from 
        for( var i = 0 , len = data.length ; i < len ; i++ ) {

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
                    icon: '/assets/img/map-marker.png',
                    // icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + order + '|27acb4|000000',
                    title: item.address
                });

                // try this out
                markers_array.push( marker );

                // prepare the content that will go into each map marker pop-up
                var content_string =
                    '<div class="popup-parent">' +
                        '<h2>' + item.customer + '<h2>' +  
                        '<p>' + item.pretty_address + '</p>' + 
                        '<p>' + item.phone + '</p>' + 
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

        // ------------------------------------------------------
        // marker cluster stuff

        // style the marker cluster
        var cluster_styles = [
            {
                textColor: 'white',
                url: '/assets/img/marker-cluster.png',
                height: 56,
                width: 56
            },
            {
                textColor: 'white',
                url: '/assets/img/marker-cluster.png',
                height: 56,
                width: 56
            },
            {
                textColor: 'white',
                url: '/assets/img/marker-cluster.png',
                height: 56,
                width: 56
            },
            {
                textColor: 'white',
                url: '/assets/img/marker-cluster.png',
                height: 56,
                width: 56
            },
            {
                textColor: 'white',
                url: '/assets/img/marker-cluster.png',
                height: 56,
                width: 56
            }
        ];

        // customize the marker cluster
        var mc_options = {
            // gridSize: 50, 
            // maxZoom: 15
            styles: cluster_styles   
        };

        // initialize the marker cluster
        var marker_cluster = new MarkerClusterer( map , markers_array , mc_options );

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
        if ( $('#nav-menu-open').is(':visible')) {
            $('#nav-menu-open').hide();
            $('#nav-menu-close').show();
        } else {
            $('#nav-menu-close').hide();
            $('#nav-menu-open').show();
        }
    }


    // once everything has been loaded, we can have our fun
    $(document).ready(function(){

        // age verification

        $('#over-21').on('tap click', function()
        {
            // get value of checkbox
            var checked = $('#remember-me').is(':checked');
            
            // set a cookie to verify the user is over 21
            if( checked ) {
                $.cookie("age-verification", "1", { expires: 30 });
            } else {
                $.cookie("age-verification", "1");
            }

            // take the user to the home page
            window.location.href = "/home";
        });

        $('#under-21').on('tap click', function()
        {
            $.cookie("age-verification", "0");

            // redirect to responsibility
            window.location.replace("http://responsibility.org");

        });


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

        // turn our store locations giant table into a datatable
        $('#store-locations-table').DataTable();

        // if there is a map canvas on the page
        var map_element = $('#map-canvas');

        if( map_element ){
            
            // which map?
            if( map_element.hasClass( 'tribeca' )) {
                // console.log( "loading tribeca map" );

                // position the map over tribeca
                options = {
                    center: {
                        'lat' : 40.724976,
                        'lng' : -73.99936
                    },
                    zoom: 13
                }

                pull_data( '/assets/data/tribeca-locations.json' , options );
            } 
            else if ( map_element.hasClass( 'stores' )) {
                // console.log( "loading locations map" );
                pull_data( '/assets/data/store-locations.json' );
            }

            // set placeholder text for data-tables
            $('.dataTables_filter input').attr("placeholder", "name, state, zip");

        }


        // center the map v1

        $('#get-location').on('tap click', function(){
            get_location();
        });

        /*
        // get the user's current location
        function get_location()
        {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition( show_position );
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
        */

        // get the user's current location
        function get_location()
        {
            // Try W3C Geolocation (Preferred)
            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(position) {
                    show_position( position.coords.latitude, position.coords.longitude );
                }, function(error) {
                    handle_no_geolocation();
                },
                    { maximumAge: 600000, timeout: 10000 });

            } else if (google.gears) {

                // Try Google Gears Geolocation

                var geo = google.gears.factory.create('beta.geolocation');

                geo.getCurrentPosition( function (position) {
                    show_position( position.latitude, position.longitude );
                }, function () {
                    handle_no_geolocation();
                });

            }
            //Cannot obtain Geo Location
            else {
                handle_no_geolocation();
            }
        }

        // the user does not have geolocation
        function handle_no_geolocation()
        {
            alert("Geolocation is not supported by this browser.");
        }

        // geolocation worked fine
        // move the map into place
        function show_position( latitude , longitude ) 
        {
            // console.log( position.coords );

            // zoom out
            map.setZoom( 11 );

            // re-center the map
            map.setCenter({
                'lat' : latitude,
                'lng' : longitude
            });
        }


        $('#get-zip').on('tap, click', function()
        {
            process_zip();
        });

        // center the map based on a postal code
        var process_zip = function()
        {
            // console.log( formatter );

            // get our zip code
            var zip = $('#input-zip').val();

            // make sure it exists
            if( !zip ){
                alert( "you must enter a zip code!" );
                return;
            }

            // prepare the query we send to google 
            var query = google_prefix + zip + google_suffix;

            // send the query to google
            $.get( query , function() {} )
            .done( function( data )
            {
                // console.log( data );
                var result = data.results[0];
                var output = {};           

                // extract the necessary information 
                output.latitude = result.geometry.location.lat;
                output.longitude = result.geometry.location.lng;
                output.pretty_address = result.formatted_address;

                // test it
                // console.log( output ); 

                // zoom out
                map.setZoom( 11 );

                // re-center the map
                map.setCenter({
                    'lat' : output.latitude,
                    'lng' : output.longitude
                });

            });

        }

    });

})(jQuery);

