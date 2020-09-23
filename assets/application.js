(function() {

    function init() {
        tabs();
    }

    /**
     * Tabs section
     */
    
    function tabs() {

        jQuery('.js-tab').on('mouseover', function(e) {
            const index = $(this).data('index');
            $('.js-tab').removeClass('active');
            $(this).addClass('active');
    
            $('.js-tab-content').removeClass('active');
            $(`.js-tab-content[data-index="${index}"]`).addClass('active');
        })

    }


    init();

})();