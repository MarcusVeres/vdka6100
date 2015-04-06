(function(){

    $(document).ready(function(){

        // modals
        $('.lightbox-close').on('tap click', function( event ){
            var clicked = $(this);
            var target = clicked.attr('data-dismiss-target');
            $( target ).modal('hide');
        });

    });

})(jQuery);

