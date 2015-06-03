var formatter = (function(){

    // console.log("we has query");

    var source = '/assets/data/where-to-buy.json';

    var google_prefix = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    var google_suffix = '&key=AIzaSyAdVeDCpF1gDswiV6rRNJF7Ibqi6aJAtvs';

    var output = []; // will store our final output

    // https://maps.googleapis.com/maps/api/geocode/json?address=17+BARROW+ST,+NEW+YORK+NY,+10014&key=AIzaSyAdVeDCpF1gDswiV6rRNJF7Ibqi6aJAtvs

    // grabs list of locations from our source
    var pull_data = function( data_source )
    {
        $.get( data_source , function()
        {

        })
        .done( function( data )
        {
            // loop through the data
            // we have to limit the speed of the loop, otherwise Google detects a DDoS

            var iterator = 0;
            var limit = data.length;

            function parse_data_entry() {

                setTimeout( function()
                {
                    // push the data to our output array
                    output.push( data[iterator] );

                    // prepare a query for google maps
                    var geolocated = make_query( data[iterator] );

                    // parse the query
                    var extracted = process_query( geolocated , iterator );

                    // increment the iterator
                    iterator++;

                    if( iterator < limit ) {
                        parse_data_entry();
                        // console.log( "parsing:" , iterator , "/" , limit );
                    }
                    else if( iterator >= limit ) {
                        // show output at the end
                        // console.log( output );
                    }
                    
                }, 250);

            }

            // start the loop
            parse_data_entry();

        })
        .fail( function( error ) {
            // console.log( "error:", error );
        });
    }

    // formats data from the input into a query string
    var make_query = function( location )
    {
        // concatenate address elements into single value
        var concat = location.address + ',' + location.state + ',' + location.zip; 
        // console.log( concat ); 

        // swap out all spaces with +'s
        // we use / +/g instead of / /g to replace ANY NUMBER of spaces with a +
        var swap = concat.replace( / +/g , '+' );
        // console.log( swap );

        // prepare our query string
        var query = google_prefix + swap + google_suffix;
        // console.log( query );

        return query;
    }

    // runs a google query, and processes the information
    var process_query = function( query , index )
    {
        // console.log( "query is:", query );

        $.get( query , function() {} )
        .done( function( data )
        {
            // console.log( data );
            var result = data.results[0];
       
            // extract the necessary information 
            output[index].latitude = result.geometry.location.lat;
            output[index].longitude = result.geometry.location.lng;
            output[index].pretty_address = result.formatted_address;

            // test it
            // console.log( output ); 

            // spit out a link
            makeTextFile();

        });
    }

    // execute
    // pull_data( source );

    // 

    // -----------------------------------
    // creates and downloads a JSON file with the right data

    // sauce
    // http://stackoverflow.com/a/21016088

    var textFile = null,
    makeTextFile = function (text) {
        var data = new Blob([text], {type: 'text/plain'});

        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }

        textFile = window.URL.createObjectURL(data);

        return textFile;
    };

    // once all is loaded
    $(document).ready(function(){

        // look for the create button 
        var create = document.getElementById('create');

        if( create ) {
            create.addEventListener('click', function () {
                var link = document.getElementById('downloadlink');
                link.href = makeTextFile( JSON.stringify( output ));
                link.style.display = 'block';
            }, false);
        }

        // look for generator button
        var generate = document.getElementById('generate');

        if( generate ) {
            generate.addEventListener('click', function () {
                // pull data from where-to-buy.json and format it
                pull_data( source );
            }, false);
        }

    });

    // return an object
    return {
        "google_prefix" : google_prefix,
        "google_suffix" : google_suffix,
        "process_zip" : process_query
    }

})(jQuery);

