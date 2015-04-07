(function(){

    var json_data = 'unset';

    var pull_data = function()
    {
        // grab json data for store locations

        $.get( "/assets/data/locations.json" , function() 
        {
            console.log("getting data");
        })
        .done(function( data ) 
        {
            console.log("got the data:", data);

            // assign the data
            json_data = JSON.parse( data );

            // call the function
            draw_map();
        })
        .fail(function() {
            alert( "error" );
        });
    }


    $(document).ready(function(){

        // modals

        $('.lightbox-close').on('tap click', function( event ){
            var clicked = $(this);
            var target = clicked.attr('data-dismiss-target');
            $( target ).modal('hide');
        });


        // get the locations
        // TODO: check for element before doing this

        pull_data();
        

    });

})(jQuery);

