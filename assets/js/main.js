;(function($) {

	var scrollWidth = scrollbarWidth();
	var $navList = $('.navigation__list');
	var $body = $('body');

	$(function() {

		//Init WOW
		new WOW().init({   
            mobile: false 
		});

		//Init smoothscroll
		SmoothScroll({
			touchpadSupport: true
		});

		// Slider
		$('.slider').slick({
			arrows: true,
			dots: false,
			slide: '.slide',
			speed: 1200,
			slidesToShow: 1,
			prevArrow: '.slider-arrow--prev',
			nextArrow: '.slider-arrow--next',
			responsive: [
				{
					breakpoint: 768,
				    settings: {
				        arrow: false
				    }
				}
			]
		}); // end slider

		//Scroll page to need section
		$(document).on('click', '.foot-navigation__link, .navigation__link, [data-target="nav-section"]', function(event) {
			event.preventDefault();

			var elementId = $(this).attr('href');

			if ( elementId.length > 2 ) {
				var top = $(elementId).offset().top;

				if ( $(event.target).attr('class') == 'navigation__link') {
					
					$body.removeClass('js-nav-open');
					
					setTimeout(function() {
						$body.animate({
							scrollTop: top
						}, 1200);
					}, 300);

				} else {
					$body.animate({
						scrollTop: top
					}, 1200);
				}
			}
		});// end click

		$(document).on('click', '.menu-toggle', function(event) {
			event.preventDefault();

			$body.toggleClass('js-nav-open');

			setTimeout(function() {
				$navList.slideToggle();
			}, 350);
		}); // end click

		//Modal
		$(document).on('click', '[data-toggle="#modal-contact"]', function(e){
		
			e.preventDefault();
			var el_selector = $(this).attr('data-toggle');
			$(el_selector).fadeIn();

			disableScrolling();
		});// end click

		$(document).on('click', '.close-modal', function(e){
			
			e.preventDefault();
			$(this).closest('.modal').fadeOut();
			
			 enableScrolling();
		}); // end click

	}); // end ready

	$(window).resize(function(event) {

		var windowWidth = $(window).width();
		
		if(windowWidth <= (768 + scrollWidth) ) {
			$navList.slideUp();
			$body.removeClass('js-nav-open');
		} else {
			$navList.show();

		}
	}); // end resize

	$(window).scroll(function(event) {

		var windowWidth = $(window).width();

		//Show scroll to top arrow 
		var headerHeight = $('#scroll-top').outerHeight();
		var scroll = $(window).scrollTop();
		var $scrollTop = $('.scroll-top');

		$scrollTop.addClass('js-scroll');

		setTimeout(function() {
			$scrollTop.removeClass('js-scroll');
		}, 300);

		if(scroll > headerHeight) {
			$scrollTop.addClass('js-scroll-top-show');
		} else {
			$scrollTop.removeClass('js-scroll-top-show');
		}

		//Hide mobile menu
		if(windowWidth <= (768 + scrollWidth) ) {
			$navList.slideUp();
			$body.removeClass('js-nav-open');
		}
	}); // end scroll

	function scrollbarWidth() {
  		var documentWidth = parseInt(document.documentElement.clientWidth);
  		var windowsWidth = parseInt(window.innerWidth);
  		var scrollbarWidth = windowsWidth - documentWidth;
  		return scrollbarWidth;
	}

	function disableScrolling(){
	    var x=window.scrollX;
	    var y=window.scrollY;
	    window.onscroll=function(){window.scrollTo(x, y);};
	}

	function enableScrolling(){
	    window.onscroll=function(){};
	}

})(jQuery);