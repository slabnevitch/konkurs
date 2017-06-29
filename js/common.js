$(function() {


	
	$(window).scroll(function() {
		var $top = $('.header__top'),
				topHeight = $top.height();

		if($(this).scrollTop() > topHeight){
				//$('body').css('position', 'relative');
				$top.addClass('header__top--abs');
		}

		$('.sect').each(function(){
	      var $this = $(this),
	          $sectTop = $this.offset().top - 10,
	          $sectBottom = $sectTop + $this.height(),
	          $winScroll = $(window).scrollTop(),
	          $sectHeight = $sectBottom - $sectTop;
          
   
	     if($sectTop < $winScroll && $sectBottom > $winScroll){
	       var $thisData = $this.attr('id');

	       $('.header-menu__link').filter('[href="#'+ $thisData +'"]').closest('li').addClass('header-menu__item--active').siblings().removeClass('header-menu__item--active');
	     }
	    });
	});

	var headerCarousel = $(".owl-carousel").owlCarousel({

			items: 1,
			nav: true,
			loop: true,
			navText: [],
			autoplay: true,
			onTranslate: headerCarouselTranslate,
			animateOut: 'fadeOut',
			mouseDrag: false
		});

	var sliderControl = (function(){
		
		
		return {
			init: function(){
				
				sliderControl.createDots();
			},

			createDots: function() {
				var dotsCount = $('.slide-bg').length,
						$handlersWrap = $('.header__slider-handlers');
				
				for(var i=0; i<dotsCount/2; i++){
					var newDot = document.createElement('div');
					newDot.className = "header__slider-handler";
					
					$handlersWrap.append(newDot); 
				}
				
				var $handlers = $('.header__slider-handler');
				
				sliderControl.handlersActive(0, false);
				sliderControl.regListener($handlers);
			},

			regListener: function($handlers) {
					$handlers.click(function() {
					
					var currentIndex = $(this).index();
					
					sliderControl.handlersActive(currentIndex, true);
					});
			},

			handlersActive: function(currentIndex, access) {
				
				var $currentHandler = $('.header__slider-handler').eq(currentIndex); 
				
				$currentHandler.addClass('header__slider-handler--active')
								.siblings().removeClass('header__slider-handler--active');
				
				if(access == true){

					sliderControl.goToCurrentSlide(currentIndex);
				}else{
					return;
				}
			},

			goToCurrentSlide: function(currentIndex) {
				
				headerCarousel.trigger('to.owl.carousel', [currentIndex]);
			}

		}

	})();
	
	sliderControl.init();

	function headerCarouselTranslate(e) {
		console.log(e.item.index);
		sliderControl.handlersActive(e.item.index-3, false);
		
		
	}

	$(".toggle-mnu").click(function() {
		$('.mobile').toggleClass('header__nav--open');
		return false;
	});

	$('.mobile-close').click(function(e) {
		e.preventDefault();
		closeMobileMenu();
	});
	

	var headerCarousel = $(".owl-carousel").owlCarousel({
		items: 1,
		nav: true,
		navText: [],
		
	});

	$('.jury__item').click(function() {
		$(this).addClass('jury__item--active').parent().siblings().find('.jury__item').removeClass('jury__item--active');
		$(this).find('.jury__descr').fadeIn(500);
		$(this).parent().siblings().find('.jury__descr').fadeOut(500);
	});

	$(document).ready(function() {
			$('.magnifier').magnificPopup({


				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'mfp-with-zoom mfp-img-mobile',

				gallery: {
					enabled: true
				},

				image: {
					
			verticalFit: true,
			titleSrc: function(item) {
				console.log(item.el.prev().attr('alt'));
				return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
			}
		},


			});
		});

		function closeMobileMenu(argument) {
			$('.mobile').removeClass('header__nav--open');
			
		}


	var menuLinks = $('.header-menu__link');
			menuLinks.click(function(e){
				e.preventDefault();
				closeMobileMenu();
				var self = $(this);
				setTimeout(function() {
					var location = self.attr('href'), //секция с id, равным href текущей ссылки
						sectionCoord = $(location).offset().top;
						//console.log(location);
					$('html, body').animate({scrollTop: sectionCoord + 18}, 800);
					
				}, 1000);
			});

			$('.popup-modal').magnificPopup({
				type: 'inline',
				preloader: false,
				focus: '#username',
				//modal: true
			});

			$(document).on('click', '.popup-modal-dismiss', function (e) {
				e.preventDefault();
				$.magnificPopup.close();
			});

			$('.popup-with-form').magnificPopup({
				type: 'inline',
				preloader: false,
				focus: '#name',

				// When elemened is focused, some mobile browsers in some cases zoom in
				// It looks not nice, so we disable it:
				callbacks: {
					beforeOpen: function() {
						if($(window).width() < 700) {
							this.st.focus = false;
						} else {
							this.st.focus = '#name';
						}
					}
				}
			});
	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});
