(function() {

    function init() {
        toggleNav();
        tabs();
        marqueeText();
        parallaxImages();
        faqs();
        cartAutoUpdate();
        productGallery();
        slickNavigation();
    }


    /**
     * Product Gallery Slider
     */

    function productGallery() {
        if ( $('.js-product-images').length ) {
            $('.js-product-images').slick({
                arrows: false,
                dots: false,
                infinite: true,
                autoplay: true,
                autoPlaySpeed: 4000,
            })
        }
    }


    /**
     * Slick navigation
     */

    function slickNavigation() {
        $('.js-slick-next').on('click', function(e) {
            console.log('testse');
            e.preventDefault();
            $(this).closest('.slick-wrap').find('.slick-initialized').slick('slickNext');
        })
        $('.js-slick-prev').on('click', function(e) {
            console.log('testse');
            e.preventDefault();
            $(this).closest('.slick-wrap').find('.slick-initialized').slick('slickPrev');
        })
    }


    /**
     * Toggle Navigation Overlay
     */

    function toggleNav() {
        $('.js-toggle-nav').click(function(e) {
            e.preventDefault();

            $('.nav').toggleClass('is-active');
            $('body').toggleClass('is-fixed');
        })
    }



    /**
     * Tabs section
     */
    
    function tabs() {
        $('.js-tab').on('mouseover', function(e) {
            const index = $(this).data('index');
            $('.js-tab').removeClass('active');
            $(this).addClass('active');
    
            $('.js-tab-content').removeClass('active');
            $(`.js-tab-content[data-index="${index}"]`).addClass('active');

            // Increase height of tab content panel for ingredients pane on mobile
            if (index == 2 && $(window).innerWidth() < 768) {
                $('.tabs__content-wrap').addClass('is-extended');
            } else {
                $('.tabs__content-wrap').removeClass('is-extended');
            }
        })
    }


    /**
     * Parallax Images
     */

    function parallaxImages() {
        if ( $('.js-prlx-img').length ) {
            // Load scrollTrigger
            gsap.registerPlugin(ScrollTrigger);
            
            // Iterate over array of images and perform animation
            gsap.utils.toArray('.js-prlx-img').forEach(prlxItem => { 
                gsap.fromTo(prlxItem, {
                    y: '0%'
                }, {
                    y: '-25%',
                    ease: 'linear',
                    scrollTrigger: {
                        trigger: prlxItem,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0,
                    }
                })
            });
        }
    }


    /**
     * Marquee text
     */
    function marqueeText() {
        if ( $('.js-marquee').length ) {

            // Load scrollTrigger
            gsap.registerPlugin(ScrollTrigger);
      
            gsap.utils.toArray('.js-marquee').forEach(prlxItem => { 
                gsap.to(prlxItem, {
                    x: -150,
                    scrollTrigger: {
                        trigger: prlxItem,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0,
                    }
                })
            });
        }
    }

    /**
     * FAQs text
     */
    function faqs() {
        $('.faqs__title').click(function() {
            $(this).next().slideToggle(400);
            $(this).toggleClass('is-active');
        })
    }


    /**
     * Cart auto update on quantity change
     */

    function cartAutoUpdate() {
        $('.js-quantity').on('change', function() {
            $('.js-cart-update').trigger('click');
        })
    }


    init();

})();