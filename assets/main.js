;(function() {
    animateElementsOnScroll();

    function animateElementsOnScroll() {
        let elementsForAnimate = $('.js-animate');

        // Animate elements on page load (if some elements need to be animated)
        let scrollBottomPosition = $(window).scrollTop() + window.innerHeight;

        elementsForAnimate.each(function() {
            let elementPosition = $(this).offset().top;

            if (scrollBottomPosition >= elementPosition) {
                $(this).addClass('animated');
            }
        });

        // On scroll, check elements position and ADD/REMOVE class for animate
        $(window).scroll(function() {
            scrollBottomPosition = $(window).scrollTop() + window.innerHeight;

            elementsForAnimate.each(function() {
                // use 'data-offset={number}' for set OFFSET of animation start. Example: data-offset="200"
                // By default animation start when half of element appear on the screen
                let animationOffset = $(this).data('offset');

                let offsetVal = (animationOffset !== undefined) ? Number(animationOffset) : $(this).innerHeight() / 2;

                let elementPosition = $(this).offset().top + offsetVal;

                if (scrollBottomPosition >= elementPosition) {
                    $(this).addClass('animated');
                }
            });
        });
    }

    window.animateElementsOnScroll = animateElementsOnScroll;
}());
;(function() {
    initHeader();
    desktopHeader();

    function initHeader() {
        let header = $('#header');
        let menuButton = $('#menu-button');
        let menu = $('#main-menu');
        let closeMenuBtn = $('#menu-close');
        let overlay = $('#header-overlay');
        let startSticky = 30;
        let promoBanner = $('#promo-banner');

        function setHeaderHeightVariable() {
            setTimeout(() => {
                console.log(document.querySelector('.header__container').offsetHeight + 'px');
                document.documentElement.style.setProperty('--header-height', document.querySelector('.header__container').offsetHeight + 'px');
            }, 350);
        }
        
        if ($(window).width() < 768 && ( $('body').hasClass('template-collection') || $('body').hasClass('template-product')) ) {
            startSticky = 10;
        }
        
        if ($(window).scrollTop() >= startSticky) {
            header.addClass('header--sticky');
            setHeaderHeightVariable();
            promoBanner.slideUp();
        } else {
            setHeaderHeightVariable();
            header.removeClass('header--sticky');
            promoBanner.slideDown();
        }

        $(window).on('scroll',  $.throttle(35, ()=> {
            if ($(window).scrollTop() >= startSticky) {
                setHeaderHeightVariable();
                header.addClass('header--sticky');
                promoBanner.hide();
            } else {
                setHeaderHeightVariable();
                header.removeClass('header--sticky');
                promoBanner.fadeIn();
            }
        }));

        $(window).on('resize',  $.throttle(35, ()=> {
            setHeaderHeightVariable();
        }));

        $(window).on('orientationchange',  function() {
            setTimeout(function(){
                if ($('#promo-bar').length) {
                    document.documentElement.style.setProperty('--promo-bar', document.getElementById('promo-bar').offsetHeight + 'px');
                }
                if ($('#promo-banner').length) {
                    document.documentElement.style.setProperty('--promo-banner', document.getElementById('promo-banner').offsetHeight + 'px');
                }
            }, 100);
        });

        setHeaderHeightVariable();

        menuButton.click(function(e) {
            let buttonPosition = Math.round($(this).offset().left);
            let buttonWidth = $(this).innerWidth();
            let buttonOffset = buttonPosition + buttonWidth;

            if (window.innerWidth >= 768) {
                $(this).css('transform', `translate(${-buttonOffset}px, 0)`);
            }

            if (window.innerWidth < 768 && !menu.hasClass('navigation--open')) {
                $(this).addClass('menu-button--active');
                header.addClass('header--sticky');
                promoBanner.hide();
                openMenu();
            } else if (window.innerWidth < 768 && menu.hasClass('navigation--open')) {
                $(this).removeClass('menu-button--active');
                promoBanner.hide();
                closeMenu();

                if ($(window).scrollTop() < header.innerHeight()) {
                    header.removeClass('header--sticky');
                    promoBanner.fadeIn();
                }
            } else {
                openMenu();
            }
        });

        closeMenuBtn.click(closeMenu);
        overlay.click(closeMenu);

        function openMenu() {
            $('body').addClass('nav--open');
            menu.addClass('navigation--open');
            overlay.fadeIn(400);
            bodyScrollLock.disableBodyScroll(menu[0]);
        }

        function closeMenu() {
            menu.removeClass('navigation--open');
            menuButton.removeClass('menu-button--active');
            menuButton.css('transform', 'translate(0px, 0)');
            overlay.fadeOut(400);
            // For recharge account fix
            setTimeout(function () {$('body').removeClass('nav--open')}, 1000);
            bodyScrollLock.enableBodyScroll(menu[0]);
        }
    }

    function desktopHeader() {
        const $menuLink = $('.menu .menu__link');
        const searchBar = $('#search-bar');
        const searchLink = $('.js-toggle-search');
        const $subMenu = $('.menu__submenu-container');

        $menuLink.on('mouseenter', function () {
            let id = $(this).attr('aria-controls');

            if (searchBar.hasClass('search-bar--open')) {
                searchLink.removeClass('active');
                searchBar.removeClass('search-bar--open');
            }
            $subMenu.removeClass('active');
            $('#'+ id).addClass('active');
        });

        $('#header').on('mouseleave', function () {
            $subMenu.removeClass('active');
        });
    }
}());
;(function () {


    initSearchBar();

    function initSearchBar() {
        let searchBar = $('#search-bar');
        let searchLink = $('.js-toggle-search');

        if (!searchBar.length || !searchLink.length) {
            return;
        }

        searchLink.click(function (e) {
            e.preventDefault();

            $(this).toggleClass('active');
            searchBar.toggleClass('search-bar--open');
            $('.menu__submenu-container').removeClass('active');
            $('body').toggleClass('search--open');
        });

        $(document).on('click touchstart', function (event) {
            if (!$(event.target).closest(searchLink.add(searchBar)).length) {

                if (searchBar.hasClass('search-bar--open')) {
                    searchLink.removeClass('active');
                    searchBar.removeClass('search-bar--open');
                    $('body').removeClass('search--open');
                }
            } else {
                return;
            }
        });
    }
}());
;(function() {

	/*	Code for validate only numbers
	*	Table with KEY-codes: https://keycode.info/
	*	8 - backspace/delete
	*	0 - key has no keycode
	*	13 - enter
	*	e < 48 || e > 57 - NOT NUMBERS
	*/

	$('.js-only-numbers').on('keypress', function(e) {
		if (e.which != 8 && e.which != 0 && e.which != 13 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});


	/* add max value for numeric input  */

	$('[data-max-val]').on('input', function(e) {
		let maxVal = Number($(this).attr('data-max-val') || 99);

		if ($(this).val() > maxVal) {
			$(this).val(maxVal);
		}
	})

}());


;(function() {
    initQtyWidget();

    function initQtyWidget() {
        if ($('.js-qty-widget').length < 1) {
            return;
        }

        $('.js-qty-minus').on('click', function (e) {
            e.preventDefault();

            let input = $(this).parents('.js-qty-widget').find('[data-product-qty]');

            if (!input.length) {
                return;
            }

            let currentVal = Number(input.val());

            input.val(Math.max(1, currentVal - 1));

        });

        $('.js-qty-plus').on('click', function (e) {
            e.preventDefault();

            let input = $(this).parents('.js-qty-widget').find('[data-product-qty]');

            if (!input.length) {
                return;
            }

            let currentVal = Number(input.val());
            let maxVal = Number(input.attr('data-max-val') || 999);

            input.val(Math.min(currentVal + 1, maxVal));
        });
    }
}());
;(function() {
    initBackInStockForm();

    function initBackInStockForm() {
        let bisWidgets = $('.js-custom-BIS-widget');
        let submitButton = $('.js-bis-submit');
        let emptyEmailMessage = 'Almost! Please enter a valid email address';

        if (!bisWidgets.length) {
            return;
        }

        submitButton.on('click', function(e) {
            e.preventDefault();

            let bisWidget = $(this).parents('.js-custom-BIS-widget');
            let productId = bisWidget.find('.js-notify-product-id').val();
            let variantId = bisWidget.find('.js-notify-variant-id').val();
            let email = bisWidget.find('.js-notify-email').val();

            let messagesBlock = bisWidget.find('.js-notify-messages');
            let successMessage = bisWidget.find('.js-popup-message-success');
            let errorMessage = bisWidget.find('.js-popup-message-error');

            if (email.trim() === '') {
                clearMessages(successMessage, errorMessage);
                errorMessage.text(emptyEmailMessage);
                messagesBlock.show();
            }

            if (productId && variantId && email !== '') {
                BIS.create(email, variantId, productId).then((data)=> {
                    notificationCallback(data, messagesBlock, successMessage, errorMessage);
                });
            }
        });


        function notificationCallback(data, messagesBlock, successMessage, errorMessage) {
            console.log(data, 'data');
            var msg = '';

            if (data.status === 'OK') {

                msg = data.message; // just show the success message

                console.log(msg, 'OK');
                clearMessages(successMessage, errorMessage);

                successMessage.text(msg);
                messagesBlock.show();
                submitButton.parents('form').hide();
            } else { // it was an error
                for (var k in data.errors) {  // collect all the error messages into a string
                    msg += (data.errors[k].join());
                }

                clearMessages(successMessage, errorMessage);

                errorMessage.text(msg);
                messagesBlock.show();
            }
        }

        function clearMessages(successMessage, errorMessage) {
            successMessage.text('');
            errorMessage.text('');
        }
    }


}());
;(function () {
    buystackScroll();

    function buystackScroll() {
        let buyStack = $('#product-buystack');
        let scrollContainer = $('.js-buystack-container');

        if (!buyStack.length || !scrollContainer.length) {
            return;
        }

        let productBanner = $('.js-product-banner');
        let scrollBottomPos = Math.round($(window).scrollTop() + window.innerHeight);
        let scrollContainerBottomPos = Math.round(scrollContainer.offset().top + scrollContainer.innerHeight());
        let scrollBottomContainerPosWithOffset = scrollContainerBottomPos - 100;
        let different = scrollBottomPos - (buyStack.offset().top + buyStack.innerHeight());
        let stuckTriggerPoint = Math.round(scrollBottomContainerPosWithOffset + different);
        let isStuck = false;
        let lastScrollTop = 0;

        $(window).on('scroll', function() {
            if (window.innerWidth < 1280) {
                return;
            }

            let direction = null;
            let st = $(this).scrollTop();

            if (st > lastScrollTop){
                direction = 'down';
            } else {
                direction = 'up';
            }

            lastScrollTop = st;

            scrollBottomPos = Math.round($(window).scrollTop() + window.innerHeight);
            scrollContainerBottomPos = Math.round(scrollContainer.offset().top + scrollContainer.innerHeight());
            scrollBottomContainerPosWithOffset = scrollContainerBottomPos - 100;
            different = scrollBottomPos - (buyStack.offset().top + buyStack.innerHeight());

            let buystackBottomPos = Math.round(buyStack.offset().top + buyStack.innerHeight());

            if (!isStuck) {
                stuckTriggerPoint = Math.round(scrollBottomContainerPosWithOffset + different);
            }

            if (buystackBottomPos >= Math.round(productBanner.offset().top + productBanner.innerHeight())) {
                buyStack.addClass('buystack--offset');
            } else {
                buyStack.removeClass('buystack--offset');
            }


            // top: calc(100% + 2330px - 230px - 100px - 460px);
            // 2330 - container height
            // 230 - buystack half height
            // 100px - offset
            // 460 - buystack height

            if (buystackBottomPos >= scrollBottomContainerPosWithOffset && !isStuck && direction === 'down') {
                isStuck = true;

                buyStack.css({
                    'position': 'absolute',
                    'bottom':  `calc(0% - ${Math.round(scrollContainer.innerHeight())}px + ${buyStack.innerHeight() / 2}px + 100px + 65px)`
                });
            } else if ( scrollBottomPos <= stuckTriggerPoint && direction === 'up' && isStuck) {
                isStuck = false;

                buyStack.css({
                    'position': 'fixed',
                    'bottom': '50%',
                    'top': 'auto'
                });
            }
        });
    }
}());
;(function () {
    /*
    * <a href="#footer" class="js-anchor-link">scroll to...</a>
    */

    $('.js-anchor-link').on('click', function (e) {
        e.preventDefault();

        let linkedSection = $($(this).attr('href'));
        let headerHeight = $('#header').innerHeight();

        if (!$('.sticky-header').length && window.innerWidth > 767) {
            headerHeight = 131;
        } else {
            headerHeight = $('#header').innerHeight()
        }

        if (!$('.sticky-header').length && window.innerWidth > 767) {
            headerHeight = 131;
        } else {
            headerHeight = $('#header').innerHeight()
        }

        if (linkedSection.length > 0) {
            $('html, body').animate({
                scrollTop: linkedSection.offset().top - headerHeight
            }, 600)
        }
    });

    reworkDefaultUrlHashScroll();

    function reworkDefaultUrlHashScroll() {

        if (window.location.hash) {
            let target = window.location.hash;

            if (!$(target).length) {
                return;
            }

            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
                let scrollOffset = 0; // 40 - value set in CSS for animate content with transform: translateY(40px);
                let headerHeight = $('#header').innerHeight();

                if (!$('.sticky-header').length && window.innerWidth > 767) {
                    headerHeight = 131;
                }

                 if ($(target).hasClass('js-animate') || $(target).parents('.js-animate').length > 0) {
                    scrollOffset = 40;

                    $('html, body').animate({
                        scrollTop: $(target).offset().top - headerHeight - scrollOffset
                    }, 600)

                } else {
                    $('html, body').animate({
                        scrollTop: $(target).offset().top - headerHeight
                    }, 600)
                }
            }
        }
    }
}());
;(function() {
	let accordionContainer = $('.js-accordion-container')
	let accordionToggler = $('.js-accordion-toggler');

	if (accordionToggler.length < 1) {
		return;
	}

	/*
	* accordionContainer - use it, if you need add one event listener , instead not for all accordions togglers
	* accordionToggler - accordion title, icon on some thing else.
	* accordion - accordion item container
	* accordionContent - content which animated
	*/

	if (accordionContainer.length) {
		accordionContainer.on('click', '.js-accordion-toggler', toggleAccordion);
	} else {
		accordionToggler.on('click', toggleAccordion);
	}

	if (window.location.hash) {
		scrollToAccodionAnchorOnLoad();
	}

	function toggleAccordion() {
		let accordion = $(this).parents('.js-accordion');
		let accordionContent = accordion.find('.js-accordion-content');

        accordion.toggleClass('open');
		let scrollPosition = $(document).scrollTop();

		accordionContent.stop().slideToggle({
			duration: 400,
			start: function(){
				$([document.documentElement, document.body]).animate({
					scrollTop: scrollPosition > 0 ? scrollPosition : 0
				}, 500, 'swing');
			},
			complete: function() {
				$(this).css('height', '');
			}
		});
	}

	function scrollToAccodionAnchorOnLoad() {
		let target = window.location.hash;

		let targetAccordionToggler = accordionToggler.filter(function(index, element) {
			return $(element).attr('data-id') === target.slice(1);
		});

		if (!targetAccordionToggler.length) {
			return;
		}

		let scrollPosition = targetAccordionToggler.offset().top - $('#header').height() - 40;

		setTimeout(function () {
			$([document.documentElement, document.body]).animate({
				scrollTop: scrollPosition > 0 ? scrollPosition : 0
			}, 1000, 'swing', function () {
				if(!targetAccordionToggler.parents('.js-accordion').hasClass('open')){
					targetAccordionToggler.click();
				}
			});
		}, 1000);
	}
}());
;(function () {
    initFooterAccordionMenu();

    function initFooterAccordionMenu() {
        let accordionToggle = $('.js-footer-toggle');
        let accordionContents = $('.js-footer-accordion-content');

        if (accordionToggle.length < 1) {
            return;
        }

        accordionToggle.click(toggleAccordion);

        $(window).resize($.throttle(150, function() {
            if (window.innerWidth > 991) {
                accordionContents.attr('style', '');
                accordionToggle.removeClass('open');
            }
        }));

        function toggleAccordion() {
            if (window.innerWidth > 991) {
                return;
            }
            let accordionContent = $(this).next('.js-footer-accordion-content');

            $(this).toggleClass('open');
            accordionContent.stop().slideToggle(400, function () {
                $(this).css('height', '');
            });
        }
    }
}());
;(function() {
	/* Custom Events */

	$(document).on('popup:open', function(e, popup, popupId) {

	});

	$(document).on('popup:close', function(e, popup, popupId) {
		bodyScrollLock.clearAllBodyScrollLocks();
	});

	/* Custom POPUP */
	let popupLinks = $('.js-open-popup');
	let popupOpenClass = 'popup--open';
	let popupCloseButton = $('.js-close-popup');

	if (popupLinks.length > 0) {

		$(document).on('click touchstart', function (event) {
			if (!$(event.target).closest(popupCloseButton.add($('.popup__container')).add(popupLinks)).length && $(`.${popupOpenClass}`).length > 0) {
				let popup = $(`.${popupOpenClass}`);
				let popupId = popup.attr('id');

				$(document).trigger('popup:close', [popup, popupId]);
				popup.removeClass(popupOpenClass);
			} else {
				return;
			}
		});
	}

	popupLinks.on('click', function(e) {
		e.preventDefault();

		let popupId = $(this).attr('href');
		let popup = $(popupId);
		let youtubeLink = $(this).attr('data-popup-youtube');

		if (popup.length < 1) {
			return;
		}

		if (youtubeLink) {
			let youtubeVideoId = youtube_id_parser(youtubeLink);
			let iframe = `	<div class="popup__iframe-wrapper">
								<iframe
									src="https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&controls=1&fs=1&iv_load_policy=3&autoplay=1&mute=0&rel=0&showinfo=0&loop=0&start=0"
									frameborder="0"
									allow="autoplay"
									allowfullscreen
								>
								</iframe>
							</div>
						 `;

		 	$(document).trigger('popup:open', [popup, popupId]);

			popup.find('.popup__content').append(iframe);

			popup.addClass(popupOpenClass);
			bodyScrollLock.disableBodyScroll(popup[0]);

		} else {
			$(document).trigger('popup:open', [popup, popupId]);

			popup.addClass(popupOpenClass);
			bodyScrollLock.disableBodyScroll(popup[0]);

			if (popup.find('.popup__inner').length > 0) {
				bodyScrollLock.disableBodyScroll(popup.find('.popup__inner')[0]);
			}
		}
	});

	popupCloseButton.on('click', function(e) {
		let popup = $(this).parents('.js-popup');
		let popupId = popup.attr('id');

		$(document).trigger('popup:close', [popup, popupId]);
		popup.removeClass(popupOpenClass);

		if (popup.find('.popup__iframe-wrapper').length > 0) {
			popup.find('.popup__iframe-wrapper').remove();
		}
	});


	function youtube_id_parser(url){
		/* Return the youTube video ID */

		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = url.match(regExp);
		return (match&&match[7].length==11)? match[7] : false;
	}

}());
;(function() {
	/*
	*
	*	Lazy load images script with CACHE check.
	*	If images in cache - lazy load would not start.
	*
	*	If you don't need a feature with caches image - comment code.
	*
	*	HTML basic structure
	*	<picture class="lazy">
	*		<source data-srcset="img-src-for-1x-screen 1x, img-src-for-2x-screen 2x" >
	*		<img src="img-src-thumbnail-40x-resolution" data-srcset="img-src-default-resolution" srcset="img-src-thumbnail-40x-resolution" alt="">
	*	</picture>
	*/

	document.addEventListener("DOMContentLoaded", function (event) {
		if (window.caches) {
			var lazyImages = [].slice.call(
				document.querySelectorAll(".lazy [data-srcset]")
				);

			Promise.all(lazyImages.map(img => {
				const src = img.getAttribute('data-srcset');

				return window.caches.match(src).then(response => {
					if (response) {
						img.setAttribute('srcset', src);
						img.removeAttribute('data-srcset');
						img.parentElement.classList.remove("lazy");
					}
				})
			})).then(lazyLoadPictures);
		} else {
			lazyLoadPictures();
		}

		function lazyLoadPictures() {
			var lazyImages = [].slice.call(
				document.querySelectorAll(".lazy [data-srcset]")
				);

			if (lazyImages.length < 1) {
				return;
			}

			if ("IntersectionObserver" in window) {
				let lazyImageObserver =
				new IntersectionObserver(function (entries, observer) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							let lazyImage = entry.target;
							lazyImage.srcset = lazyImage.dataset.srcset;

							caches.open('images').then(function(cache) {
								cache.addAll([lazyImage.dataset.srcset]).then(function() {});
							});

							lazyImage.parentElement.classList.remove("lazy");
							lazyImageObserver.unobserve(lazyImage);
						}
					});
				});

				lazyImages.forEach(function (lazyImage) {
					lazyImageObserver.observe(lazyImage);
				});
			} else {
			// Not supported, load all images immediately
				lazyImages.forEach(function (image) {
					image.srcset = image.dataset.srcset;
				});
			}
		}
	});
}());
;(function () {

    $(document).ready(function() {
        initPromoSlider();
        initFashionTestimonialsSlider();
        initHomeProductsSlider();
        initProductSlider();
        initClinicalResultsSlider();
        initRecommendationsSlider();
    });

    const sliderArrow = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
                            viewBox="0 0 185.343 185.343" style="enable-background:new 0 0 185.343 185.343;" xml:space="preserve">
                            <g>
                            \t<path style="fill:#010002;" d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175
                            \t\tl74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934
                            \t\tc4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z"/>
                            </g>
                            </svg>`;

    function initPromoSlider() {
        var promobar = $('.promobar'),
            sliderOption = $('#slider-settings');

        if (sliderOption.val() != "") {
            var autoPlaysettigs = parseInt(sliderOption.val());
        } else {
            autoPlaysettigs = 2000;
        }

        if (sliderOption.attr('data-arrows') == 'true') {
            var arrowSettings = true;
        } else {
            arrowSettings = false
        }


        promobar.slick({
            dots: false,
            centerMode: false,
            slidesToShow: 1,
            infinite: true,
            arrows: arrowSettings,
            autoplay: true,
            autoplaySpeed: autoPlaysettigs,
            prevArrow: '<button class="slick-arrow slick-prev promo-arrows" aria-label="Previous">' + sliderArrow + '</button>',
            nextArrow: '<button class="slick-arrow slick-next promo-arrows" aria-label="Next">' + sliderArrow + '</button>'
        });
    }
    function initFashionTestimonialsSlider() {
        //$(window).resize($.throttle(100, sliderInitialization));

        sliderInitialization();

        function sliderInitialization() {
            const slider = document.querySelector(".js-fashion-testimonials-slider");

            if (!slider) {
                return;
            }

            const isSliderInited = slider.classList.contains("slick-initialized");

            // if (window.innerWidth > 991) {
                // if (isSliderInited) {
                //     $(slider).slick("unslick");
                // }

                // return;
            // }

            if (!isSliderInited) {
                $(slider).slick({
                    // slidesToShow: 2,
                    // slidesToScroll: 1,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: true,
                    dots: true,
                    infinite: false,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                arrows: false
                            }
                        },
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                arrows: false
                            }
                        }
                    ]
                });
            }
        }
    }

    function initHomeProductsSlider() {
        let productBgSlider = $('#products-bg-slider');
        let productsSlider = $('#products-slider');

        if (!productBgSlider.length && !productsSlider.length) {
            return;
        }

        let autoplaySpeed = Number(productsSlider.attr('data-autoplay-speed')  * 1000) || 4000;

        productBgSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            swipe: false,
            draggable: false,
            arrows: false,
            speed: 600,
            asNavFor: productsSlider,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        dots: true,
                        speed: 600
                    }
                }
            ]
        });

        productsSlider.on('init', function(event, slick) {
            let slideColor = $(slick.$slides[0]).attr('data-color');
            let slideBackgroundColor = $(slick.$slides[0]).attr('data-background-color');

            $(slick.$prevArrow).css('color', slideColor);
            $(slick.$nextArrow).css('color', slideColor);
            $('#products-slider').css('background-color', slideBackgroundColor);
        });

        productsSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 600,
            autoplaySpeed: autoplaySpeed,
            swipe: false,
            draggable: false,
            prevArrow: '<button class="slick-arrow slick-prev" aria-label="Previous">' + sliderArrow + '</button>',
            nextArrow: '<button class="slick-arrow slick-next" aria-label="Next">' + sliderArrow + '</button>',
            asNavFor: productBgSlider,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        swipe: true,
                        speed: 600
                    }
                }
            ]
        });

        productsSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            let slideColor = $(slick.$slides[nextSlide]).attr('data-color');
            let slideBackgroundColor = $(slick.$slides[nextSlide]).attr('data-background-color');

            $('#products-slider').css('background-color', slideBackgroundColor);
            
            if ($(slick.$prevArrow).length > 0 && $(slick.$nextArrow).length > 0) {
                $(slick.$prevArrow).css('color', slideColor);
                $(slick.$nextArrow).css('color', slideColor);
            }
        });
    }

    function initProductSlider() {
        let productSlider = $('#product-slider');

        if (!productSlider.length) {
            return;
        }

        let sliderControls = $('#product-slider-controls');

        productSlider.on('init', function(event, slick) {

            if (slick.$slides.length <= 1) {
                sliderControls.hide();
                productSlider.addClass('hide-dots');
            }
        });

        productSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            dots: true,
            arrows: true,
            autoplay: true,
            speed: 600,

            autoplaySpeed: 4000,
            appendArrows: sliderControls,
            appendDots: sliderControls,
            prevArrow: '<button class="slick-arrow slick-prev" aria-label="Previous">' + sliderArrow + '</button>',
            nextArrow: '<button class="slick-arrow slick-next" aria-label="Next">' + sliderArrow + '</button>',
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        arrows: false,
                        appendDots: productSlider,
                    }
                }
            ]
        })
    }

    function initClinicalResultsSlider() {
        let clinicalBgSlider = $('#clinical-results-bg-slider');
        let clinicalSlider = $('#clinical-results-slider');

        if (!clinicalBgSlider.length && !clinicalSlider.length) {
            return;
        }

        clinicalBgSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            swipe: false,
            draggable: false,
            arrows: false,
            speed: 600,
            asNavFor: clinicalSlider,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        dots: true,
                    }
                }
            ]
        });

        clinicalSlider.on('init', function(event, slick) {
            let slideColor = $(slick.$slides[0]).attr('data-color');

            $(slick.$prevArrow).css('color', slideColor);
            $(slick.$nextArrow).css('color', slideColor);
        });

        clinicalSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 600,
            autoplaySpeed: 4000,
            swipe: false,
            draggable: false,
            prevArrow: '<button class="slick-arrow slick-prev" aria-label="Previous">' + sliderArrow + '</button>',
            nextArrow: '<button class="slick-arrow slick-next" aria-label="Next">' + sliderArrow + '</button>',
            asNavFor: clinicalBgSlider,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        swipe: true
                    }
                }
            ]
        });

        clinicalSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            let slideColor = $(slick.$slides[nextSlide]).attr('data-color');

            if ($(slick.$prevArrow).length > 0 && $(slick.$nextArrow).length > 0) {
                $(slick.$prevArrow).css('color', slideColor);
                $(slick.$nextArrow).css('color', slideColor);
            }
        });
    }

    function initRecommendationsSlider() {
        $(window).resize($.throttle(100, sliderInitialization));

        sliderInitialization();

        function sliderInitialization() {
            const slider = document.querySelector(".js-product-recommendations-slider");

            if (!slider || !slider.innerHTML.trim()) {
                return;
            }

            const isSliderInited = slider.classList.contains("slick-initialized");

            if (!isSliderInited) {
                $(slider).on("init", function(event, slick) {
                    const slidesCount = slick.$slides.length;

                    if (slidesCount <= 3) {
                        $(slider).addClass("hide-dots");
                    }
                });

                $(slider).slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    infinite: false,
                    adaptiveHeight: true,
                    responsive: [
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });
            }
        }

        window.recommendationsProductSlider = sliderInitialization;
    }
})();
;(function() {
    initIngredientsPopup();

    function initIngredientsPopup() {
        let ingredientsButtons = $('.js-ingredient-button');
        let ingredientsList = $('.js-ingredients-list');
        let triangle = $('#ingredient-triangle');

        if (!ingredientsButtons.length) {
            return;
        }

        let animationInProgress = false;

        triangle.css('left', calcTrianglePosition(ingredientsButtons.first()));

        $(window).resize($.throttle(150, function() {
            triangle.css('left', calcTrianglePosition($('.js-ingredient-button.active')));
        }));

        ingredientsList.on('click', '.js-ingredient-button', function(e) {
            let currentTextIndex = $('.js-ingredient-button.active').attr('data-ingredient-index');
            let activeText  = $('#' + currentTextIndex + '');

            let newIngredientIndex = $(this).attr('data-ingredient-index');
            let textBlock = $('#'+ newIngredientIndex + '');

            if (!animationInProgress) {
                if ($(this).hasClass('active')) {
                    return;
                }

                let textWidth = Math.round(textBlock.innerWidth());
                let textWrapper = $('.home-ingredients__popup-inner');

                animationInProgress = true;

                triangle.css('left', calcTrianglePosition($(this)));
                ingredientsButtons.not($(this)).removeClass('active');
                $(this).addClass('active');

                textWrapper.animate({
                    width: textWidth + 2
                }, 450);

                activeText.fadeOut(50, function() {
                    textBlock.fadeIn(400);
                });

                setTimeout(function() {
                    animationInProgress = false;
                }, 800);
            }
        });

        function calcTrianglePosition(button) {
            let buttonPosition = Math.round(button.position().left);
            let triangleOffset = Math.round(button.innerWidth() / 2);
            let trianglePosition = buttonPosition + triangleOffset;

            return trianglePosition;
        }
    }
}());
;(function() {
    $(document).ready(function() {
        detailsTabs();
    });

    function detailsTabs() {
        let page = $('html, body');
        let tabLink = $('.js-details-tab-link');
        let tabContent = $('.js-details-tab-content');
        let accordionContent = $('.js-details-accordion-content');
        let animationInProgress = false;

        if (!tabLink.length) {
            return;
        }

        if (window.innerWidth > 767) {
            tabLink.first().addClass('active');
            tabContent.first().fadeIn(400);

            if (window.location.hash) {
                scrollToAnchorTabOnLoad('data-details-tab-id', false);
            }
        } else {
            tabLink.first().addClass('active');
            accordionContent.first().fadeIn(400);

            if (window.location.hash) {
                scrollToAnchorTabOnLoad('data-details-accordion-id', true);
            }
        }

        $(window).resize($.throttle(200, function() {
            let currentActiveLink = $('.js-details-tab-link.active');

            if (window.innerWidth > 767) {
                let currentActiveContent = $(`[data-details-tab-id='${currentActiveLink.attr("href")}']`);

                if (!currentActiveLink.length) {
                    currentActiveContent = $(`[data-details-tab-id='${tabLink.first().attr("href")}']`);
                    tabLink.first().addClass('active');
                }

                currentActiveContent.fadeIn(400);
                tabContent.not(currentActiveContent).hide();
            } else {
                let currentActiveContent = $(`[data-details-accordion-id='${currentActiveLink.attr("href")}']`);
                currentActiveContent.fadeIn(400);
                accordionContent.not(currentActiveContent).hide();
            }
        }));

        tabLink.click(function(e) {
            e.preventDefault();

            if (animationInProgress) {
                return;
            }

            if (window.innerWidth > 767) {
                desktopTabs($(this));
            } else {
                mobileAccordions($(this));
            }
        });

        function desktopTabs(link) {
            if (link.hasClass('active')) {
                return;
            }

            let currentActiveLink = $('.js-details-tab-link.active');
            let currentActiveContent = $(`[data-details-tab-id='${currentActiveLink.attr("href")}']`);

            let linkedContent = $(`[data-details-tab-id='${link.attr("href")}']`);

            tabLink.not(link).removeClass('active');
            link.addClass('active');

            animationInProgress = true;

            if (link.attr('data-triangle') === 'true') {
                linkedContent.find('.js-details-triangle').fadeIn(300).css('left', calcTrinaglePosition(link));
            }

            currentActiveContent.fadeOut(300, function() {
                linkedContent.fadeIn(300);
            });

            setTimeout(function() {
                animationInProgress = false;
            }, 600);
        }

        function mobileAccordions(link) {
            let currentActiveLink = $('.js-details-tab-link.active');
            let currentActiveContent = $(`[data-details-accordion-id='${currentActiveLink.attr("href")}']`);
            let linkedContent = $(`[data-details-accordion-id='${link.attr("href")}']`);

            let scrollOffset = 0;

            if (link.parents('.js-animate') && !link.parents('.js-animate').hasClass('animated')) {
                scrollOffset = 40; // 40 - value set in CSS for animate content with transform: translateY(40px);
            }

            link.toggleClass('active');
            tabLink.not(link).removeClass('active');

            animationInProgress = true;

            page.on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function() {
                page.stop();
            });

            linkedContent.slideDown(400, function() {
                page.animate({
                    scrollTop: link.offset().top - $('#header').innerHeight() - scrollOffset
                }, function() {
                    page.off('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove');
                })
            });

            currentActiveContent.slideUp(400);

            setTimeout(function() {
                animationInProgress = false;
            }, 600);
        }

        function calcTrinaglePosition(tabLink) {
            let tabLinkPosition = Math.round(tabLink.position().left);
            let triangleOffset = Math.round(tabLink.innerWidth() / 2);
            let trianglePosition = tabLinkPosition + triangleOffset;

            return trianglePosition;
        }

        function scrollToAnchorTabOnLoad(contentName, isMobile) {
            let target = window.location.hash;
            let targetTabLink = tabLink.filter(function(index, element) {
                return $(element).attr('href') === target;
            });

            let targetContent = $(`[${contentName}="${target}"]`);

            if (!targetContent.length && targetTabLink) {
                console.log('no anchor link or target content');
                return;
            }

            let headerHeight = $('#header').innerHeight();

            if (!$('.sticky-header').length && window.innerWidth > 767) {
                headerHeight = 131;
            }

            if (isMobile) {
                setTimeout(function() {
                    mobileAccordions(targetTabLink);
                }, 1000);

            } else {
                desktopTabs(targetTabLink);

                setTimeout(function() {
                    $('html, body').animate({
                        scrollTop: $('#product-details').offset().top - headerHeight
                    }, 600)
                }, 1500);
            }
        }
    }
}());
;(function () {

  $(document).ready(function () {

    initInstafeed();

    function initInstafeed() {
      var feeds = [];
      var imageContainer = $('.instagram__images');
      var imageCount = parseInt(imageContainer.attr('data-images-count'), 10);

      fetch(`https://d3ejra0xbg20rg.cloudfront.net/instagram/media?shop=${Shopify.shop}&resource=default`).then((response) => {
        response.json().then((media) => {
          $.each(media, function (index, elem) {
            if (index < imageCount) {
              if (elem.media_type == 'IMAGE') {
                feeds.push('<div class="instagram__item"><a href="' + elem.permalink + '" target="_blank" class="instagram__image-wrapper"><span class="visually-hidden">' + elem.caption + '</span>' +
                  '<div class="instagram__image">' +
                  '<img data-src="' + elem.media_url + '" class="lazyload" alt="'+ elem.caption +'"/>' +
                  '</div>' +
                  '</a></div>');
              } else if (elem.media_type == 'VIDEO') {
                feeds.push('<div class="instagram__item"><a href="' + elem.permalink + '" target="_blank" class="instagram__image-wrapper"><span class="visually-hidden">' + elem.caption + '</span>' +
                  '<div class="instagram__image">' +
                  '<img data-src="' + elem.thumbnail_url + '" class="lazyload" alt="'+ elem.caption +'"/>' +
                  '</div>' +
                  '</a></div>');
              }
            } else return;
          });

          if (feeds.length <= imageCount) {
            imageContainer.html(feeds);
          }
        });
      });
    }
  });
}());

;(function () {
    window.addEventListener("DOMContentLoaded", () => {
        const inputGroups = document.querySelectorAll(".input-group");
        const shiftedClass = "input-group--label-shifted";

        inputGroups.forEach((inputGroup) => {
            const input = inputGroup.querySelector(".input");

            if (!input) {
                return;
            }

            input.addEventListener("focus", () => {
                inputGroup.classList.add(shiftedClass);
            });

            input.addEventListener("blur", () => {
                if (!input.value.length) {
                    inputGroup.classList.remove(shiftedClass);
                }
            });
        });
    });
})();
;(function () {
    window.addEventListener("DOMContentLoaded", () => {
        const phoneInput = document.querySelector(".js-subscribe-phone");

        if (!phoneInput) {
            return;
        }

        $(phoneInput).usPhoneFormat({
            format: "(xxx) xxx-xxxx",
        });
    });
})();
;(function () {
	window.addEventListener("DOMContentLoaded", () => {
		const fields = document.querySelectorAll(".js-subscribe-phone, .js-subscribe-email");
		const errorsBlock = document.querySelector(".js-join-us-errors");
		let phoneErrorMessage = document.querySelector("[data-phone-error-message]");
		let emailErrorMessage = document.querySelector("[data-email-error-message]");
		const errorClass = "input--error";

		if (!fields.length) {
			return;
		}

		fields.forEach((field) => {
			field.addEventListener("focus", () => {
				fields.forEach((field) => {
					field.classList.remove(errorClass);
				});

				$(errorsBlock).slideUp();
				$(phoneErrorMessage).hide();
				$(emailErrorMessage).hide();
			});
		});
	});
})();

;(function () {
	window.addEventListener("DOMContentLoaded", () => {
		sendForm();

		function sendForm(e) {
			console.log('sendJoinUsForm')


			let joinUsForm = $('.js-subscribe-form');
			let klaviyoSubscribeURL = "https://a.klaviyo.com/ajax/subscriptions/subscribe";
			let smsBumpUrl = "https://api.smsbump.com/v2/formsPublic/subscribe";

			if (!joinUsForm.length) {
				return;
			}

			joinUsForm.each(function (index, form) {
				let _self = $(this);
				let heading = $('.js-join-heading');
				let headingRegular = heading.attr('data-regular-text');
				let headingSuccess = heading.attr('data-success-text');
				let subheading = $('.js-join-subheading');
				let subheadingRegular = subheading.attr('data-regular-text');
				let subheadingSuccessPhone = subheading.attr('data-success-phone-text');
				let subheadingSuccessEmail = subheading.attr('data-success-email-text');
				let subheadingSuccessPhoneAndEmail = subheading.attr('data-success-phone-and-email-text');
				let errorsBlock = $('.js-join-us-errors');
				let phoneErrorMessage = $('[data-phone-error-message]');
				let emailErrorMessage = $('[data-email-error-message]');
				let anyErrorMessage = $('[data-any-error-message]');
				let phoneInput = joinUsForm.find('.js-subscribe-phone');
				let emailInput = joinUsForm.find('.js-subscribe-email');
				let listId = joinUsForm.attr('data-klaviyo-list-id');
				let formId = joinUsForm.attr('data-klaviyo-form-id');
				let formBumpId = 64101;
				let listBumpId = 2437520;
				const errorClass = "input--error";

				$(form).submit(function (e) {
					e.preventDefault();
					e.stopPropagation();

					if (!listId || !formId) {
						return;
					}

					heading.html(headingRegular);
					subheading.html(subheadingRegular);

					phoneErrorMessage.hide();
					emailErrorMessage.hide();
					anyErrorMessage.hide();

					phoneInput.removeClass(errorClass);
					emailInput.removeClass(errorClass);

					if (!errorsBlock.is(":visible")) {
						errorsBlock.slideUp();
					}

					let phone = phoneInput.val();
					let email = emailInput.val();

					if (((phone && phone.length > 0) && validatePhone(phone)) && ((email.length > 0) && validateEmail(phone)) ) {
						console.log('all')

						fetch(smsBumpUrl, {
							"method": "POST",
							"headers": {
								"access-control-allow-headers": "*",
								"content-type": "application/json; charset=utf-8",
								"x-smsbump-platform": "shopify"
							},
							"body": JSON.stringify(data),
							"x-smsbump-platform": "shopify",
							"accept": "application/json",
							"content-type": "application/json"
						})
							.then(res => res.json(), (res) => {
								console.log(res);

								return res.json();
							})
							.then(status => {
								if (status.status == "success") {
									heading.html(headingSuccess);
									$(this).slideUp();
									errorsBlock.hide();
									subheading.html(subheadingSuccessPhone);
									phoneInput.val("");
									phoneInput.parent().removeClass("input-group--label-shifted");

								} else {
									phoneInput.addClass(errorClass);
									console.log(status.message);
									anyErrorMessage.html(status.message);
									anyErrorMessage.show()

									errorsBlock.slideDown();
								}
							})


						const data = {
							g: listId,
							'$fields': '$source,$email,$consent_method,$consent_form_id,$consent_form_version',
							'$list_fields': '',
							'$timezone_offset': Math.abs(new Date().getTimezoneOffset() / 60),
							'$source': 'Newsletter',
							'$email': email,
							'$consent_method': 'Klaviyo Form',
							'$consent_form_id': formId,
							'$consent_form_version': 524456
						};

						fetch(klaviyoSubscribeURL, {
							"method": "POST",
							"mode": "cors",
							"credentials": "omit",
							"headers": {
								"access-control-allow-headers": "*",
								"content-type": "application/x-www-form-urlencoded; charset=utf-8"
							},
							"referrer": location.href,
							"referrerPolicy": "no-referrer-when-downgrade",
							"body": Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&')
						})
							.then(res => res.json(), (res) => {
								// console.log(res);

								return res.json();
							})
							.then(data => {
								if (data.success) {
									heading.html(headingSuccess);
									$(this).hide();
									errorsBlock.hide();
									subheading.html(subheadingSuccessEmail);
									emailInput.val("");
									emailInput.parent().removeClass("input-group--label-shifted");
								}
							})









					}	else if (phone && phone.length > 0) {
						if (!validatePhone(phone)) {
									phoneErrorMessage.show();
									phoneInput.addClass(errorClass);

									errorsBlock.slideDown();
						}	else {
							const data = {
								phone : phone,
								form_id : formBumpId
							};

							fetch(smsBumpUrl, {
								"method": "POST",
								"headers": {
									"access-control-allow-headers": "*",
									"content-type": "application/json; charset=utf-8",
									"x-smsbump-platform": "shopify"
								},
								"body": JSON.stringify(data),
								"x-smsbump-platform": "shopify",
								"accept": "application/json",
								"content-type": "application/json"
							})
								.then(res => res.json(), (res) => {
									console.log(res);

									return res.json();
								})
								.then(status => {
									if (status.status == "success") {
										heading.html(headingSuccess);
										$(this).slideUp();
										errorsBlock.hide();
										subheading.html(subheadingSuccessPhone);
										phoneInput.val("");
										phoneInput.parent().removeClass("input-group--label-shifted");

										setTimeout(function () {
											console.log("setTimeout");
											console.log(_self);
											_self.find('.input-group:first-of-type').addClass('display--none');

											_self.slideDown();
										}, 1000);

									} else {
										phoneInput.addClass(errorClass);
										console.log(status.message);
										anyErrorMessage.html(status.message);
										anyErrorMessage.show()

										errorsBlock.slideDown();
									}
								})
						}
					} else if (email.length > 0) {
						if (!validateEmail(email)) {
							emailErrorMessage.show();
							emailInput.addClass(errorClass);
							errorsBlock.slideDown();
						} else {
							const data = {
								g: listId,
								'$fields': '$source,$email,$consent_method,$consent_form_id,$consent_form_version',
								'$list_fields': '',
								'$timezone_offset': Math.abs(new Date().getTimezoneOffset() / 60),
								'$source': 'Newsletter',
								'$email': email,
								'$consent_method': 'Klaviyo Form',
								'$consent_form_id': formId,
								'$consent_form_version': 524456
							};

							fetch(klaviyoSubscribeURL, {
								"method": "POST",
								"mode": "cors",
								"credentials": "omit",
								"headers": {
									"access-control-allow-headers": "*",
									"content-type": "application/x-www-form-urlencoded; charset=utf-8"
								},
								"referrer": location.href,
								"referrerPolicy": "no-referrer-when-downgrade",
								"body": Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&')
							})
								.then(res => res.json(), (res) => {
									// console.log(res);

									return res.json();
								})
								.then(data => {
									if (data.success) {
										heading.html(headingSuccess);
										$(this).hide();
										errorsBlock.hide();
										subheading.html(subheadingSuccessEmail);
										emailInput.val("");
										emailInput.parent().removeClass("input-group--label-shifted");
									}
								})
						}
					}
				});
			});
		}

		function validateEmail(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		}

		function validatePhone(phone) {
			return phone.length === 14;
		}
	});
})();

theme.ProductRecommendations = (function () {
    /**
     * Product recommendations section constructor. Runs on page load as well as Theme Editor
     * `section:load` events.
     * @param {string} container - selector for the section container DOM element
     */
    function ProductRecommendations(container) {
        if (!$(container).length) return;

        var $container = this.$container = $(container);
        this.namespace = ".product-recommendations-list";

        // Read product id from data attribute
        var productId = $container.data("productId");

        // Read limit from data attribute
        var limit = $container.data("limit");

        // Build request URL
        var requestUrl = "/recommendations/products?section_id=pdp-recommendations&limit=" + limit + "&product_id=" + productId;

        $.ajax({url: requestUrl, type: "GET"})
            .then(function (res) {
                const html = $('<div />').append(res).find(".product-recommendations-list").html();
                
                $container.html(html);

                window.recommendationsProductSlider();
                window.animateElementsOnScroll();
            });
    }

    ProductRecommendations.prototype = $.extend({}, ProductRecommendations.prototype, {
        /**
         * Event callback for Theme Editor `section:unload` event
         */
        onUnload: function () {
            this.$container.off(this.namespace);
        }
    });

    return ProductRecommendations
})();

;(function() {
    window.addEventListener("DOMContentLoaded", () => {

        if ($('.rc_label__delivery').length > 0) {
            addLabelToSubscriptionSelect();
            changeMarkupOfSubscriptionForm();
            toggleOptionsSelector();

            centerRechargeSelect($('.rc_select__frequency'));
            $('.rc_select__frequency').on('change', function(){
                centerRechargeSelect($(this));
            });
        }
    });

    function addLabelToSubscriptionSelect() {
        const label = document.querySelector(".rc_label__delivery");
        const labelValue = label.innerText.trim();
        const selectOptions = document.querySelectorAll(".rc_select.rc_select__frequency option");

        selectOptions.forEach((option) => {
            const currentValue = option.innerText.trim();
            const newValue = `${labelValue} ${currentValue}`.toLowerCase();

            option.innerText = newValue;
        });
    }

    function changeMarkupOfSubscriptionForm() {
        let optionsSelect = document.querySelector(".rc_block.rc_block__type__options");
        const optionsSelectParent = optionsSelect.parentElement;

        optionsSelectParent.parentElement.insertBefore(optionsSelect, optionsSelectParent.nextElementSibling);

        const oneTimeBlock = document.querySelector(".rc_block.rc_block__type__onetime");
        const subscribeBlock = document.querySelector(".rc_block.rc_block__type__autodeliver");
        const optionsWrapper = document.createElement("div");

        optionsWrapper.classList.add("buystack__radio-wrapper");
        oneTimeBlock.classList.add("buystack__radio-group");
        subscribeBlock.classList.add("buystack__radio-group");

        optionsWrapper.appendChild(oneTimeBlock);
        optionsWrapper.appendChild(subscribeBlock);

        optionsSelect = document.querySelector(".rc_block.rc_block__type__options");

        optionsSelect.parentElement.insertBefore(optionsWrapper, optionsSelect);
    }
    
    function toggleOptionsSelector() {
        const radioOptions = document.querySelectorAll(".rc_radio");
        const optionsBlock = document.querySelector(".rc_block.rc_block__type__options");

        radioOptions.forEach((radio) => {
            radio.addEventListener("change", () => {
                const radioParent = radio.parentElement;
                const isSubscribeOptionActive = radioParent.classList.contains("rc_block__type--active") && radioParent.classList.contains("rc_block__type__autodeliver");

                if (isSubscribeOptionActive) {
                    optionsBlock.style.display = "block";
                } else {
                    optionsBlock.style.display = "none";
                }

                const productPriceElem = document.querySelector("[data-product-price]");
                let currentPrice = null;

                var discount = $(radioParent).find('.rc_label__discount').text().split('%')[0],
                    $comparePriceBlock = $(radioParent).parents('.product__form').find('[data-compare-text]'),
                    comparePrice = $comparePriceBlock.data('compare-price');

                if (isSubscribeOptionActive) {
                    if (document.querySelector(".rc_price.rc_price__autodeliver") != null) {
                        currentPrice = document.querySelector(".rc_price.rc_price__autodeliver").innerText;

                        if ($comparePriceBlock.is(":visible")) {
                            var discountPrice = parseFloat(comparePrice) - ((parseFloat(discount) * parseFloat(comparePrice)) / 100);
                            $comparePriceBlock.find('span s').text('$' + parseFloat(discountPrice).toFixed(2))
                        }
                    }
                    $('.afterpay-paragraph').hide();
                } else {
                    if (document.querySelector(".rc_price.rc_price__onetime") != null) {
                        currentPrice = document.querySelector(".rc_price.rc_price__onetime").innerText;
                        if ($comparePriceBlock.is(":visible")) {
                            $comparePriceBlock.find('span s').text('$' + parseFloat(comparePrice))
                        }
                    }
                    $('.afterpay-paragraph').fadeIn();
                }

                centerRechargeSelect($('.rc_select__frequency'));

                if (currentPrice != null) {
                    let currentPriceWithoutDecimals = currentPrice.split(".")[0];
                    let currentPriceDecimals = currentPrice.split(".")[1];

                    if (currentPriceDecimals === "00") {
                        productPriceElem.innerText = currentPriceWithoutDecimals;
                    } else {
                        productPriceElem.innerText = currentPrice;
                    }
                }

            });
        });
    }

    function getRechargeTextWidth(txt) {
        var $elm = $('<span class="tempforSize">'+txt+'</span>').prependTo(".product__form");
        var elmWidth = $elm.width();
        $elm.remove();
        return elmWidth;
    }

    function centerRechargeSelect($elm) {
        var optionWidth = getRechargeTextWidth($elm.children(":selected").html());
        var emptySpace =   $elm.width()- optionWidth;
        $elm.css("text-indent", (emptySpace/2) - 30);
    }
})();
/* global bodyScrollLock, Shopify */
;(function () {

  $(document).ready(function() {
    let overlay = $('#header-overlay');
    let $scrollEl = $('.product__add__success__list');

    (function CartPopup() {
      loadCart(false, false);
      removeItem();

      if (window.location.href.indexOf('open-cart=true') !== -1){
        openCart();

        var uri = window.location.toString();
        if (uri.indexOf("?") > 0) {
          var clean_uri = uri.substring(0, uri.indexOf("?"));
          window.history.replaceState({}, document.title, clean_uri);
        }
      }

      $(".cart-open").on("click", function(e) {
        e.preventDefault();
        overlay.fadeIn(400);
        openCart();
      });

      overlay.on('click', closeCart);

      $(document)
        .on('click', '.close', closeCart)
        .on('change', '.js-qty__num', function () {
          let quantity = parseInt($(this).val());
          const line = $(this).next().data('line-item');
          const id = $(this).next().data('variant-id');

          updateQuantity(quantity, line, id);
        })
        .on('click', '.product__quantity .js-qty__adjust', function () {
          const $quantityInput = $(this).parent().find('.quantity__input');
          let quantity = parseInt($quantityInput.val());
          const line = $(this).data('line-item');
          const id = $(this).data('variant-id');

          $(this).parent().css('pointer-events', 'none');

          if ($(this).hasClass('js-qty__adjust--plus')) {
            ++quantity;
          } else {
            --quantity;
          }
          $quantityInput.val(quantity);
          updateQuantity(quantity, line, id);
      });

      $(document).on('click', '.add-to-cart', function (e) {
        e.preventDefault();
        let data = {
          quantity: 1,
          id: $(this).attr('data-variant-id'),
        };
        if ($(this).attr('data-promo').length){
          if (data['properties']) {
            data['properties']['_promo'] = $(this).attr('data-promo');
          } else data['properties'] = { '_promo': $(this).attr('data-promo')};
        }
        if ($(this).attr('data-recharge-original-handle')){
          if (data['properties']) {
            data['properties']['_original_handle'] = $(this).attr('data-recharge-original-handle');
          } else data['properties'] = { '_original_handle': $(this).attr('data-recharge-original-handle')};
        }
        if ($(this).attr('data-compare-price')){
          if (data['properties']) {
            data['properties']['_compare_price'] = $(this).attr('data-compare-price');
          } else data['properties'] = { '_compare_price': $(this).attr('data-compare-price')};

        }

        $.ajax({
          type: 'POST',
          url: '/cart/add.js',
          dataType: 'json',
          data: data
        }).done(function () {
          loadCart(true, true);
        }).fail(function (e) {
          console.error(e);
        })
      });

      $('[data-add-to-cart]').on('click', function (e) {
        e.preventDefault();
        const form = $(this).parents('form');
        const data = form.serialize();

        $.ajax({
          type: 'POST',
          url: '/cart/add.js',
          dataType: 'json',
          data: data
        }).done(function () {
          loadCart(true, true);
        }).fail(function (e) {
          console.error(e);
        })
      });

      $(document).on('click', '.js-button-checkout', function (e) {
        e.preventDefault();

        var redirect_url = '/checkout';
        var skuList = [];
        var priceList = [];
        var quantityList = [];

        function toCheckout() {
          if (checkSubscriptionProduct()) {
            redirect_url = buildReChargeCheckoutUrl();
          }

          window.location.href = redirect_url;
        }

        $.ajax({
          method: 'GET',
          url: '/cart.js',
          dataType: 'json'
        }).done(function (returnData) {
          if (returnData.items.length) {
            returnData.items.forEach(function(item) {
              skuList.push(item.sku);
              priceList.push(slate.Currency.formatMoney(item.price, '{{ amount }}'));
              quantityList.push(item.quantity);

              if (item.product_type == 'GWP') {
                $.ajax({
                  method: 'POST',
                  url: '/cart/update.js',
                  data: { updates: {
                      [item.id]: 1,
                    } },
                  dataType: 'json',
                });
              }
            });

            skuList = skuList.toString();
            priceList = priceList.toString();
            quantityList = quantityList.toString();

            SHRSL_ANALYTICS_DISPATCH('beginCheckout',skuList,priceList,quantityList);
            toCheckout();
          } else {
            toCheckout();
          }
        }).fail(function (e) {
          toCheckout();
        })
      });

    })();

    function updateQuantityCart(count) {
      const cartButton = $('.cart-open .js-cart-count');

      if (count > 0) {
        cartButton.text( count ).show().addClass('pulse-cart-icon');

        setTimeout(function(){
          cartButton.removeClass('pulse-cart-icon')
        }, 800);
      } else {
        cartButton.text('').hide();
      }
    }

    function renderCartThreshold(cartTotalPrice) {
      var $thresholdAmount = $('#cart-threshold-amount');
      var thresholdAmountValue = parseInt($thresholdAmount.attr('data-threshold-amount'), 10) * 100;
      var percentage = 0;
      var freeMessage = false
      var different = false;

      if (!$thresholdAmount.length) {
        return false;
      }

      if (cartTotalPrice >= thresholdAmountValue) {
        percentage = 100;
        freeMessage = true;
      } else {
        percentage = Math.round(cartTotalPrice / thresholdAmountValue * 100);
        different = thresholdAmountValue - cartTotalPrice;
      }

      return [percentage, different, freeMessage];
    }

    function renderCartPopover(cart, error) {
      var data = {};
      var $popover = $('#SideCartCont');
      var source = $('#SideCart').html();
      var template = Handlebars.compile(source);
      var has_subscription_product = false;

      theme.quantitySelectors();

      var products = cart.items.map(function (product) {
        var free_product = false;

        if (product.properties != null && product.properties['subscription_id']) {
          has_subscription_product = true;
        }

        if (product.product_type === 'GWP' || product.product_type === 'Evergreen GWP' || product.final_price === 0){
          free_product = true;
        }

        return {
          id: product.id,
          item_count: product.quantity,
          image: product.image,
          title: product.product_title !== 'Default Title' ? product.product_title : false,
          variant_title: product.variant_title,
          url: product.url,
          variant: product.variant_options[0] !== 'Default Title'
            ? product.variant_options[1] + ', ' + product.variant_options[0]
            : false,
          price: product.final_price,
          price_formatted: slate.Currency.formatMoney(product.price),
          properties: product.properties,
          free_product: free_product
        };
      });

      data.threshold = renderCartThreshold(cart.total_price);

      if (renderCartThreshold(cart.total_price)) {
        data.threshold_percentage = renderCartThreshold(cart.total_price)[0];
        data.threshold_difference = slate.Currency.formatMoney(renderCartThreshold(cart.total_price)[1]);
        data.threshold_free_message = renderCartThreshold(cart.total_price)[2];
      }

      data.show_afterpay = !has_subscription_product;
      data.item_count = cart.item_count;
      data.total_price = cart.total_price;
      data.total_price_formatted = slate.Currency.formatMoney(cart.total_price);
      data.products = products;

      if (cart.cart_level_discount_applications.length){
        data.discount = {
          "title": cart.cart_level_discount_applications[0].title,
          "value": (cart.cart_level_discount_applications[0].total_allocated_amount / 100).toFixed(2)
        };
      } else if (cart.total_discount > 0){
        data.discount = {
          "title": "Discount",
          "value": (cart.total_discount / 100).toFixed(2)
        };
      }

      $popover.empty().append(template(data));

      if (error){
        var errorMessage = $('#gwp-cart').attr('data-error-message');

        $('.product__gift-promotion-sold-out').text(errorMessage).show();
      }

      requestCartRecProducts();

      updateQuantityCart(cart.item_count);
      checkItemSizes(cart.items.length);
    }

    function checkItemSizes(size) {
      if (size > 3) {
        $('.product__add__success__list').addClass('no-last-item-border');
        // $('.side-cart__footer').addClass('hr');
      } else {
        $('.product__add__success__list').removeClass('no-last-item-border');
        // $('.side-cart__footer').removeClass('hr');
      }
    }

    function gwpCartUpdate(updateData) {
      $.ajax({
        method: 'POST',
        url: '/cart/update.js',
        data: { updates: updateData },
        dataType: 'json'
      }).done(function () {
        loadCart(true, true);
      }).fail(function (err) {
        renderCartPopover(response, true);
      });
    }

    function loadCart(showCart, affirmEvent) {
      var skuList = [];
      var priceList = [];
      var quantityList = [];

      $.ajax({
        method: 'GET',
        url: '/cart.js',
        dataType: 'json'
      }).done(function (response) {
        var items = response.items;
        var $evergreenGiftPromotion = $('#evergreen-gwp-cart');
        var $giftPromotion = $('#gwp-cart');
        var $giftPromotionQty = $('#gwp-cart-quantity');
        var $giftPromotionBuyGet = $('#gwp-cart-buy-get');
        var giftInCart, data;

        if (items.length){
          if (affirmEvent) {
            items.forEach(function(item) {
              skuList.push(item.sku);
              priceList.push(slate.Currency.formatMoney(item.price, '{{ amount }}'));
              quantityList.push(item.quantity);
            });

            skuList = skuList.toString();
            priceList = priceList.toString();
            quantityList = quantityList.toString();

            SHRSL_ANALYTICS_DISPATCH('addToCart',skuList,priceList,quantityList);
          }

          if (!sessionStorage.getItem("gwpClear")) {
            let gwpDeleteData = {}
            items.forEach(function (item) {
              if (item.product_type == 'GWP' || item.product_type == 'Evergreen GWP') {
                gwpDeleteData[item.id] = 0;
              }
            });

            if (Object.keys(gwpDeleteData).length) {
              $.ajax({
                method: 'POST',
                url: '/cart/update.js',
                data: {updates: gwpDeleteData},
                dataType: 'json',
                async: false
              })
            }

            sessionStorage.setItem('gwpClear', 'true');
          }

          if ($evergreenGiftPromotion.length) {
            const giftPromotionAmount1 = parseInt($evergreenGiftPromotion.data('amount-1')) * 100;
            const giftPromotionId1 = parseInt($evergreenGiftPromotion.data('id-1'));
            const giftPromotionExcludeTypes = $evergreenGiftPromotion.data('exclude-types');
            let subtotalPrice = 0;
            let giftTotal = 0;
            let giftPromotionIdsCount = false;
            let updateData = {};
            let giftPromotionAmount = false;

            giftInCart = false;

            items.forEach(function (item) {
              if ($.inArray(item.product_type.toLowerCase(), giftPromotionExcludeTypes) == -1 ) {
                subtotalPrice = subtotalPrice + parseInt(item.final_line_price, 10);
              }

              if (item.product_type == 'Evergreen GWP') {
                updateData[item.id] = 0;
              }

              if (item.id === giftPromotionId1) {
                giftInCart = true;
                giftTotal = giftTotal + item.quantity;
              }
            });

            if (giftPromotionAmount1 && giftPromotionId1) {
              giftPromotionIdsCount = 1;
              giftPromotionAmount = giftPromotionAmount1;
              updateData[giftPromotionId1] = 0;

              if (subtotalPrice >= giftPromotionAmount1) {
                updateData[giftPromotionId1] = 1;
              }
            }

            if ((subtotalPrice >= giftPromotionAmount && !giftInCart) || (subtotalPrice >= giftPromotionAmount && giftInCart && giftTotal != giftPromotionIdsCount)){
              gwpCartUpdate(updateData);
            } else if (subtotalPrice < giftPromotionAmount && giftInCart) {
              gwpCartUpdate(updateData);
            } else {
              renderCartPopover(response);
              if (showCart){ openCart();}
            }
          }

          if ($giftPromotion.length) {
            var giftPromotionAmount1 = parseInt($giftPromotion.data('amount-1')) * 100;
            var giftPromotionAmount2 = parseInt($giftPromotion.data('amount-2')) * 100;
            var giftPromotionAmount3 = parseInt($giftPromotion.data('amount-3')) * 100;
            var giftPromotionAmount4 = parseInt($giftPromotion.data('amount-4')) * 100;
            var giftPromotionId1 = parseInt($giftPromotion.data('id-1'));
            var giftPromotionId2 = parseInt($giftPromotion.data('id-2'));
            var giftPromotionId3 = parseInt($giftPromotion.data('id-3'));
            var giftPromotionId4 = parseInt($giftPromotion.data('id-4'));
            var giftPromotionExcludeTypes = $giftPromotion.data('exclude-types');
            var subtotalPrice = 0;
            var giftTotal = 0;
            var giftPromotionIdsCount = false;
            var updateData = {};
            var giftPromotionAmount = false;

            giftInCart = false;

            items.forEach(function (item) {
              if ($.inArray(item.product_type.toLowerCase(), giftPromotionExcludeTypes) == -1 ) {
                subtotalPrice = subtotalPrice + parseInt(item.final_line_price, 10);
              }

              if (item.product_type == 'GWP') {
                updateData[item.id] = 0;
              }

              if (item.id === giftPromotionId1) {
                giftInCart = true;
                giftTotal = giftTotal + item.quantity;
              }

              if (item.id === giftPromotionId2) {
                giftInCart = true;
                giftTotal = giftTotal + item.quantity;
              }

              if (item.id === giftPromotionId3) {
                giftInCart = true;
                giftTotal = giftTotal + item.quantity;
              }

              if (item.id === giftPromotionId4) {
                giftInCart = true;
                giftTotal = giftTotal + item.quantity;
              }
            });

            if (giftPromotionAmount1 && giftPromotionId1) {
              giftPromotionIdsCount = 1;
              giftPromotionAmount = giftPromotionAmount1;
              updateData[giftPromotionId1] = 0;

              if (subtotalPrice >= giftPromotionAmount1) {
                updateData[giftPromotionId1] = 1;
              }
            }
            if (giftPromotionAmount1 && giftPromotionId1 && giftPromotionAmount2 && giftPromotionId2 && subtotalPrice >= giftPromotionAmount2) {
              giftPromotionIdsCount = 2;
              giftPromotionAmount = giftPromotionAmount2;
              updateData[giftPromotionId1] = 1;
              updateData[giftPromotionId2] = 1;
            }
            if (giftPromotionAmount1 && giftPromotionId1 && giftPromotionAmount2 && giftPromotionId2 && giftPromotionAmount3 && giftPromotionId3 && subtotalPrice >= giftPromotionAmount3) {
              giftPromotionIdsCount = 3;
              giftPromotionAmount = giftPromotionAmount3;
              updateData[giftPromotionId1] = 1;
              updateData[giftPromotionId2] = 1;
              updateData[giftPromotionId3] = 1;
            }

            if (giftPromotionAmount1 && giftPromotionId1 && giftPromotionAmount2 && giftPromotionId2 && giftPromotionAmount3 && giftPromotionId3 && giftPromotionAmount4 && giftPromotionId4 && subtotalPrice >= giftPromotionAmount4) {
              giftPromotionIdsCount = 4;
              giftPromotionAmount = giftPromotionAmount4;
              updateData[giftPromotionId1] = 1;
              updateData[giftPromotionId2] = 1;
              updateData[giftPromotionId3] = 1;
              updateData[giftPromotionId4] = 1;
            }

            if ((subtotalPrice >= giftPromotionAmount && !giftInCart) || (subtotalPrice >= giftPromotionAmount && giftInCart && giftTotal != giftPromotionIdsCount)){
              gwpCartUpdate(updateData);
            } else if (subtotalPrice < giftPromotionAmount && giftInCart) {
              gwpCartUpdate(updateData);
            } else {
              renderCartPopover(response);
              if (showCart){ openCart();}
            }
          }

          if ($giftPromotionQty.length) {
            var giftPromotionQtyAmount1 = parseInt($giftPromotionQty.data('amount-1'));
            var giftPromotionQtyAmount2 = parseInt($giftPromotionQty.data('amount-2'));
            var giftPromotionQtyAmount3 = parseInt($giftPromotionQty.data('amount-3'));
            var giftPromotionQtyId1 = parseInt($giftPromotionQty.data('id-1'));
            var giftPromotionQtyId2 = parseInt($giftPromotionQty.data('id-2'));
            var giftPromotionQtyId3 = parseInt($giftPromotionQty.data('id-3'));
            var giftPromotionPromo = $giftPromotion.data('promo');
            var giftPromotionExcludeTypes = $giftPromotion.data('exclude-types');
            var subtotalQty = 0;
            var giftTotal = 0;
            var giftPromotionIdsCount = false;
            var updateData = {};
            var giftPromotionQtyAmount = false;

            giftInCart = false;

            items.forEach(function (item) {
              if ($.inArray(item.product_type.toLowerCase(), giftPromotionExcludeTypes) == -1 && item.product_type != 'GWP' && item.product_type != 'Evergreen GWP') {
                subtotalQty = subtotalQty + parseInt(item.quantity, 10);
              }

              if (item.product_type == 'GWP') {
                updateData[item.id] = 0;
              }

              if (item.id === giftPromotionQtyId1) {
                giftInCart = true;
                giftTotal = giftTotal + item.quantity;
              }

              if (item.id === giftPromotionQtyId2) {
                giftInCart = true;
                giftTotal = giftTotal + item.quantity;
              }

              if (item.id === giftPromotionQtyId3) {
                giftInCart = true;
                giftTotal = giftTotal + item.quantity;
              }
            });

            if (giftPromotionQtyAmount1 && giftPromotionQtyId1) {
              giftPromotionIdsCount = 1;
              giftPromotionQtyAmount = giftPromotionQtyAmount1;
              updateData[giftPromotionQtyId1] = 0;

              if (subtotalQty >= giftPromotionQtyAmount1) {
                updateData[giftPromotionQtyId1] = 1;
              }
            }
            if (giftPromotionQtyAmount1 && giftPromotionQtyId1 && giftPromotionQtyAmount2 && giftPromotionQtyId2 && subtotalQty >= giftPromotionQtyAmount2) {
              giftPromotionIdsCount = 2;
              giftPromotionQtyAmount = giftPromotionQtyAmount2;
              updateData[giftPromotionQtyId1] = 1;
              updateData[giftPromotionQtyId2] = 1;
            }
            if (giftPromotionQtyAmount1 && giftPromotionQtyId1 && giftPromotionQtyAmount2 && giftPromotionQtyId2 && giftPromotionQtyAmount3 && giftPromotionQtyId3 && subtotalQty >= giftPromotionQtyAmount3) {
              giftPromotionIdsCount = 3;
              giftPromotionQtyAmount = giftPromotionQtyAmount3;
              updateData[giftPromotionQtyId1] = 1;
              updateData[giftPromotionQtyId2] = 1;
              updateData[giftPromotionQtyId3] = 1;
            }

            if ((subtotalQty >= giftPromotionQtyAmount && !giftInCart) || (subtotalQty >= giftPromotionQtyAmount && giftInCart && giftTotal != giftPromotionIdsCount)){
              data = { updates: updateData };

              if(giftPromotionPromo){
                data.properties = {
                  "_promo": giftPromotionPromo
                };
              }

              gwpCartUpdate(updateData);
            } else if (subtotalQty < giftPromotionQtyAmount && giftInCart) {
              gwpCartUpdate(updateData);
            } else {
              renderCartPopover(response);
              if (showCart){ openCart();}
            }
          }

          if ($giftPromotionBuyGet.length && !$giftPromotion.length && !$giftPromotionQty.length) {
            var giftPromotionBuyId1 = parseInt($giftPromotionBuyGet.data('product-buy-1'));
            var giftPromotionBuyId2 = parseInt($giftPromotionBuyGet.data('product-buy-2'));
            var giftPromotionBuyId3 = parseInt($giftPromotionBuyGet.data('product-buy-3'));
            var giftPromotionGetId1 = parseInt($giftPromotionBuyGet.data('product-get-1'));
            var giftPromotionGetId2 = parseInt($giftPromotionBuyGet.data('product-get-2'));
            var giftPromotionGetId3 = parseInt($giftPromotionBuyGet.data('product-get-3'));
            var giftPromotionBuyGetExcludeTypes = $giftPromotionBuyGet.data('exclude-types');
            var itemsCurrentQuantity = 0;
            var giftTotalQuantity = 0;
            var updateData = {};
            var subtotalQty = 0;

            giftInCart = false;

            if (giftPromotionBuyId1 && giftPromotionGetId1 || giftPromotionBuyId2 && giftPromotionGetId2 || giftPromotionBuyId3 && giftPromotionGetId3) {

              items.forEach(function (item) {
                if ($.inArray(item.product_type.toLowerCase(), giftPromotionBuyGetExcludeTypes) == -1 && item.product_type != 'GWP' && item.product_type != 'Evergreen GWP') {
                  subtotalQty = subtotalQty + parseInt(item.quantity, 10);
                }

                if (item.product_type == 'GWP') {
                  updateData[item.id] = 0;
                  giftTotalQuantity = giftTotalQuantity + item.quantity;
                }

                if (item.id === giftPromotionBuyId1){
                  giftInCart = true;
                  itemsCurrentQuantity = itemsCurrentQuantity + 1;
                  updateData[giftPromotionGetId1] = 1;
                }

                if (item.id === giftPromotionBuyId2) {
                  giftInCart = true;
                  itemsCurrentQuantity = itemsCurrentQuantity + 1;
                  updateData[giftPromotionGetId2] = 1;
                }

                if (item.id === giftPromotionBuyId3) {
                  giftInCart = true;
                  itemsCurrentQuantity = itemsCurrentQuantity + 1;
                  updateData[giftPromotionGetId3] = 1;
                }
              });

              if ((Object.keys(updateData).length && !giftInCart) || (Object.keys(updateData).length && giftInCart && giftTotalQuantity != itemsCurrentQuantity) ) {
                gwpCartUpdate(updateData);
              } else if (itemsCurrentQuantity < giftTotalQuantity && giftInCart && Object.keys(updateData).length) {
                gwpCartUpdate(updateData);
              } else {
                renderCartPopover(response);
                if (showCart){ openCart();}
              }
            }  else {
              var giftPromotionBuyGetDisable = true;
            }
          }

          if (!$giftPromotion.length && !$giftPromotionQty.length && !$giftPromotionBuyGet.length || giftPromotionBuyGetDisable) {
            var gwpProductsIds = {};
            items.forEach(function (item) {
              if (item.product_type == 'GWP') {
                gwpProductsIds[item.id] = 0
              }
            });

            if (Object.keys(gwpProductsIds).length) {
              $.ajax({
                method: 'POST',
                url: '/cart/update.js',
                data: {updates: gwpProductsIds},
                dataType: 'json'
              }).done(function () {
                loadCart(false, true);
              }).fail(function (err) {
                renderCartPopover(response);
              });
            } else {
              renderCartPopover(response);
              if (showCart){ openCart();}
            }
          }
        } else {
          renderCartPopover(response);
          if (showCart){ openCart();}
        }
      }).fail(function (err) {
        console.error('loadCart', err);
      });
    }

     function removeItem() {
       $(document).on('click', '.js-item__remove', function (e) {
         e.preventDefault();
         $('.js-item__remove').prop('disabled', true);
         var line = $(this).data('line-item');
         var id = $(this).data('variant-id');

         $.ajax({
           method: 'POST',
           url: '/cart/change.js',
           data: {quantity: 0, line: line},
           dataType: 'json'
         }).done(function (response) {
           var cartItems = response.items;
           var itemsFound = 0;

           if (cartItems.length){
             cartItems.forEach(function(item) {
               var properties = item.properties;

               if (properties["_main-product-id"] && parseInt(properties["_main-product-id"]) === parseInt(id)) {
                 itemsFound = 1;

                 $.ajax({
                   type: "POST",
                   url: "/cart/change.js",
                   dataType: "json",
                   data: {
                     id: item.id,
                     quantity: 0
                   }
                 }).done(function() {
                   loadCart(false, true);
                 }).fail(function(e) {
                   renderCartPopover(response, true);
                 });
               }
             });

             if (itemsFound === 0) {
               loadCart(false, true);
             }
           } else {
             loadCart(false, true);
           }

         }).fail(function (err) {
           $('.js-item__remove').prop('disabled', false);
         });
       });
     }

    function openCart() {
      let $popover = $('#SideCartCont');
      let headerPadding = 15;

      if ($(window).width > 767) {
        headerPadding = 25;
      }

      // const cartThresholdHeight = $('.cart-threshold').outerHeight();
      const cartHeaderHeight = $('.product__add__success__title').outerHeight() + headerPadding;
      const cartFooterHeight = $('.side-cart__footer').outerHeight();

      if (!$popover.hasClass('is-visible')){
        $('body').addClass('cart--open');
        $('.menu__submenu-container').removeClass('active');
        $('.product__add__success__list').css('max-height', $(window).height() - (cartFooterHeight + cartHeaderHeight) );
        $popover.addClass('is-visible');
        overlay.fadeIn(400);
        bodyScrollLock.disableBodyScroll($scrollEl[0]);
      }
    }

    function closeCart() {
      var $popover = $('#SideCartCont');

      if ($popover.hasClass('is-visible')) {
        $popover.removeClass('is-visible');
        overlay.fadeOut(400);
        setTimeout(function () {$('body').removeClass('cart--open')}, 1000);
        bodyScrollLock.enableBodyScroll($scrollEl[0]);
      }
    }

    function updateQuantity(qty, line, id) {
      $.ajax({
        method: 'POST',
        url: '/cart/change.js',
        data: { quantity: qty, line: line },
        dataType: 'json'
      }).done(function (response) {
        $('.product__add__success__item .quantity-selector').css('pointer-events', '');

        if (qty === 0){
          var cartItems = response.items;

          if (cartItems.length){
            let itemsFound = 0;

            cartItems.forEach(function (item) {
              var properties = item.properties;

              if (properties['_main-product-id'] && parseInt(properties['_main-product-id']) === parseInt(id)){
                itemsFound += 1;
                $.ajax({
                  type: 'POST',
                  url: '/cart/change.js',
                  dataType: 'json',
                  data: {
                    id: item.id,
                    quantity: 0
                  }
                }).done(function () {
                  loadCart(false, true);
                }).fail(function (e) {
                  renderCartPopover(response, true);
                });
              }
            });

            if (itemsFound === 0){
              loadCart(false, true);
            }
          } else {
            loadCart(false, true);
          }
        } else {
          loadCart(false, true);
        }
      }).fail(function () {
        console.log('Something went wrong.');
        $('.product__add__success__item .quantity-selector').css('pointer-events', '');
      });
    }

    function initCartRecProductsSlider() {
      var $slider = $('#cart-recommended-product');
      if (!$slider.length) {
        return false;
      }

      var sliderArrow = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
                            viewBox="0 0 185.343 185.343" style="enable-background:new 0 0 185.343 185.343;" xml:space="preserve">
                            <g>
                            \t<path d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175
                            \t\tl74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934
                            \t\tc4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z"/>
                            </g>
                            </svg>`;

      if ($slider.length) {
        $slider.slick({
          slidesToShow: 2,
          slidesToScroll: 2,
          prevArrow: '<button class="slick-arrow slick-prev" aria-label="Previous">' + sliderArrow + '</button>',
          nextArrow: '<button class="slick-arrow slick-next" aria-label="Next">' + sliderArrow + '</button>',
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        })
      }

      let headerPadding = 15;
      if ($(window).width > 767) {
        headerPadding = 25;
      }
      const cartHeaderHeight = $('.product__add__success__title').outerHeight() + headerPadding;
      const cartFooterHeight = $('.side-cart__footer').outerHeight();
      $('.product__add__success__list').css('max-height', $(window).height() - (cartFooterHeight + cartHeaderHeight) );
    }

    function requestCartRecProducts() {
      var $container = $('#cart-recommended-container');

      $.ajax({
        url: '/cart?view=recommended-product',
        method: 'GET'
      })
        .done(function (data) {
          $container.append(data);
          initCartRecProductsSlider();
          if ($(data).find('.cart-rec-product').length) {
            $container.parent().fadeIn();
          } else {
            $container.parent().hide();
          }
        })
        .fail(function () {
          $container.parent().hide();
        })
    }

    let checkSubscriptionProduct = function () {
      var products = $('.product__add__success__item').find('.product__subscription');
      return !!products.length;
    };

    let buildReChargeCheckoutUrl = function () {
      var ga_linker, customer_param;
      var myshopify_domain = Shopify.shop;
      var getToken = function reChargeGetCookie(name) {
        return (document.cookie.match('(^|; )' + name + '=([^;]*)')||0)[2];
      };

      if (Shopify.customer) {
        if (Shopify.customer.id && Shopify.customer.email) {
          customer_param = 'customer_id='+ Shopify.customer.id +'&customer_email='+ Shopify.customer.email;
        } else {
          customer_param = '';
        }
      }

      return 'https://checkout.rechargeapps.com/r/checkout?myshopify_domain=' + myshopify_domain + '&cart_token=' + getToken('cart') + '&' + ga_linker + '&' + customer_param;
    }
  });
})();

;(function () {
    initCollectionsNav();

    function initCollectionsNav() {
        let $navigation = $('.plp__nav');
        let activeUrl = window.location.pathname.split('/')
        
        if ($('body').hasClass('template-collection')) {
            $navigation.find('[data-handle="'+ activeUrl[activeUrl.length - 1] +'"]').addClass('active')
        }
    }
}());
