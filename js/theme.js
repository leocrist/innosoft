(function($) {
    "use strict";


    /*--------------------------------------------------------
    / 15. Mobile Menu
    /----------------------------------------------------------*/
    if ($('.img-popup').length) {
        var groups = {};
        $('.img-popup').each(function() {
            var id = parseInt($(this).attr('data-group'), 10);

            if (!groups[id]) {
                groups[id] = [];
            }

            groups[id].push(this);
        });


        $.each(groups, function() {

            $(this).magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                closeBtnInside: false,
                gallery: { enabled: true }
            });

        });

    }

    if ($('.main-navigation .navigation-box').length) {
        var subMenu = $('.main-navigation');
        subMenu.parent('li').children('a').append(function() {
            return '<button class="sub-nav-toggler"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>';
        });
        var mainNavToggler = $('.header-navigation .menu-toggler');
        var subNavToggler = $('.main-navigation .sub-nav-toggler');
        mainNavToggler.on('click', function() {
            var Self = $(this);
            var menu = Self.data('target');
            $(menu).slideToggle();
            $(menu).toggleClass('showen');
            return false;
        });
        subNavToggler.on('click', function() {
            var Self = $(this);
            Self.parent().parent().children('.sub-menu').slideToggle();
            return false;
        });
    }
    if ($('.video-popup').length) {
        $('.video-popup').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,

            fixedContentPos: false
        });
    }

    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function() {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);

            return false;

        });
    }

    /*------------- preloader js --------------*/


    function loader() {
        $(window).on('load', function () {
            $('#ctn-preloader').addClass('loaded');
            // Una vez haya terminado el preloader aparezca el scroll

            if ($('#ctn-preloader').hasClass('loaded')) {
                // Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
                $('#preloader').delay(400).queue(function () {
                    $(this).remove();
                });
            }
        });
    }
    loader();

    $(window).on('load', function() {
        if ($('.preloader').length) {
            $('.preloader').fadeOut('slow');
        }
        if ($('.testimonials-slider').length) {
            $('.testimonials-slider').bxSlider({
                // adaptiveHeight: true,
                auto: true,
                controls: true,
                nextText: '<i class="nonid-icon-left-arrow icon-revresed"></i>',
                prevText: '<i class="nonid-icon-left-arrow"></i>',
                pause: 5000,
                speed: 500,
                pager: true,
                pagerCustom: '.testimonials-slider-pager-one'
            });
        }
    });
    $(function() {
        $('.lazy').Lazy();
    });
	
    $(document).ready(function () {
		$("#email").on('input',function(e) {
			$("#subscribe").find('button').removeAttr("disabled");
		});
        $("#subscribe").submit(function (e) {
            e.preventDefault(); // prevent page refresh

            $.ajax({
                type: "POST",
                url: "subscribe.php",
                data: {
                    email: $("#email").val()
                },
				beforeSend: function() {
                	console.log("loading");
                	$("#subscribe").find('button').attr('disabled', 'true');
                },
                success: function (data) {
                    // Success ...
                    console.log(data);
                    $("#success").html("Your download is ready, please check your email inbox for the link. Thank you!").fadeIn(1000);
                    $("#error").fadeOut(500);
                },
                error: function () {
                    // Error ...
                    console.log("error");
                    $("#error").html("error").fadeIn(1000);
					$("#subscribe").find('button').removeAttr("disabled");
                }
            });
        });
    });

})(jQuery);