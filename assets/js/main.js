(function ($) {
    "use strict";
    /*=================================
        JS Index Here
    ==================================*/
    /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu
    04. Sticky fix
    05. One Page Nav
    06. Scroll To Top
    07. Set Background Image Color & Mask
    08. Global Slider
    09. Ajax Contact Form
    10. Search Box Popup
    11. Popup Sidemenu
    12. Magnific Popup
    13. Section Position
    14. Filter
    15. Counter Up
    16. Shape Mockup
    17. Progress Bar Animation
    18. Countdown
    19. Image to SVG Code
    20. Circle Progress
    21. Woocommerce Toggle
    22. Quantity Plus Minus
    23. Color Scheme
    24. lettering js
    25. Hover Item Active Class
    26. Smooth Scroll
    27. Fade-class-active
    28. webgl images hover animation
    29. th-text-perspective
    30. th-anim-lr
    31. th-anim-spin
    32. scroll-to-zoom
    00. Right Click Disable
    */
    /*=================================
        JS Index End
    ==================================*/
    /*

    /*---------- 01. On Load Function ----------*/
    function hidePreloader() {
        $(".preloader").fadeOut(800, function() {
            $(this).addClass("hidden").removeAttr("style");
            $('body').removeClass('preloader-active');
        });
        wowAnimation();
    }
    
    window.addEventListener("load", hidePreloader);
    
    // Mobile fallback: If resources don't load in 5 seconds, hide preloader
    var preloaderTimeout = setTimeout(function() {
        hidePreloader();
    }, 5000);
    
    // Clear timeout when page loads
    window.addEventListener("load", function() {
        clearTimeout(preloaderTimeout);
    });
    
    // Add preloader-active class on page start
    $(document).ready(function() {
        $('body').addClass('preloader-active');
        
        // Ensure video plays on mobile
        var preloaderVideo = document.querySelector('.preloader-video');
        if (preloaderVideo) {
            preloaderVideo.play().catch(function(error) {
                console.log('Autoplay not allowed:', error);
            });
        }
    });

    /*---------- 02. Preloader ----------*/
    $(document).on("click", ".preloaderCls", function (e) {
        e.preventDefault();
        $(".preloader").hide();
    });

    /*---------- 03. Mobile Menu ----------*/
    $.fn.thmobilemenu = function (options) {
        var opt = $.extend(
            {
                menuToggleBtn: ".th-menu-toggle",
                bodyToggleClass: "th-body-visible",
                subMenuClass: "th-submenu",
                subMenuParent: "menu-item-has-children",
                thSubMenuParent: "th-item-has-children",
                subMenuParentToggle: "th-active",
                meanExpandClass: "th-mean-expand",
                appendElement: '<span class="th-mean-expand"></span>',
                subMenuToggleClass: "th-open",
                toggleSpeed: 400,
            },
            options
        );
    
        return this.each(function () {
            var menu = $(this); // Select menu
    
            // Menu Show & Hide
            function menuToggle() {
                menu.toggleClass(opt.bodyToggleClass);
    
                // collapse submenu on menu hide or show
                var subMenu = "." + opt.subMenuClass;
                $(subMenu).each(function () {
                    if ($(this).hasClass(opt.subMenuToggleClass)) {
                        $(this).removeClass(opt.subMenuToggleClass);
                        $(this).css("display", "none");
                        $(this).parent().removeClass(opt.subMenuParentToggle);
                    }
                });
            }
    
            // Class Set Up for every submenu
            menu.find("." + opt.subMenuParent).each(function () {
                var submenu = $(this).find("ul");
                submenu.addClass(opt.subMenuClass);
                submenu.css("display", "none");
                $(this).addClass(opt.subMenuParent);
                $(this).addClass(opt.thSubMenuParent); // Add th-item-has-children class
                $(this).children("a").append(opt.appendElement);
            });
    
            // Toggle Submenu
            function toggleDropDown($element) {
                var submenu = $element.children("ul");
                if (submenu.length > 0) {
                    $element.toggleClass(opt.subMenuParentToggle);
                    submenu.slideToggle(opt.toggleSpeed);
                    submenu.toggleClass(opt.subMenuToggleClass);
                }
            }
    
            // Submenu toggle Button
            var itemHasChildren = "." + opt.thSubMenuParent + " > a";
            $(itemHasChildren).each(function () {
                $(this).on("click", function (e) {
                    e.preventDefault();
                    toggleDropDown($(this).parent());
                });
            });
    
            // Menu Show & Hide On Toggle Btn click
            $(opt.menuToggleBtn).each(function () {
                $(this).on("click", function () {
                    menuToggle();
                });
            });
    
            // Hide Menu On outside click
            menu.on("click", function (e) {
                e.stopPropagation();
                menuToggle();
            });
    
            // Stop Hide full menu on menu click
            menu.find("div").on("click", function (e) {
                e.stopPropagation();
            });
        });
    };
    
    $(".th-menu-wrapper").thmobilemenu();

    /*---------- 04. Sticky fix ----------*/
    (function () {
        var $stickyWrappers = $(".sticky-wrapper");
        if (!$stickyWrappers.length) {
            return;
        }

        $stickyWrappers.each(function () {
            var $wrapper = $(this);
            if (!$wrapper.next(".sticky-height-spacer").length) {
                $wrapper.after('<div class="sticky-height-spacer" aria-hidden="true"></div>');
            }
        });

        function updateStickyHeader() {
            var topPos = $(window).scrollTop();
            var isSticky = topPos > 80;

            $("body").toggleClass("header-scrolled", isSticky);
            $(".category-menu").toggleClass("close-category", isSticky);

            $stickyWrappers.each(function () {
                var $wrapper = $(this);
                var $spacer = $wrapper.next(".sticky-height-spacer");
                if (isSticky) {
                    if (!$wrapper.hasClass("sticky")) {
                        $spacer.height($wrapper.outerHeight());
                    }
                    $wrapper.addClass("sticky");
                } else {
                    $wrapper.removeClass("sticky");
                    $spacer.height(0);
                }
            });
        }

        $(window).on("scroll", updateStickyHeader);
        updateStickyHeader();
    })();

    $(".menu-expand").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            $('.category-menu').toggleClass('open-category');
        });
    });

    /*----------- 05. One Page Nav ----------*/
    function onePageNav(element) {
        if ($(element).length > 0) {
            $(element).each(function () {
            var link = $(this).find('a');
            $(this).find(link).each(function () {
                $(this).on('click', function () {
                var target = $(this.getAttribute('href'));
                if (target.length) {
                    event.preventDefault();
                    $('html, body').stop().animate({
                    scrollTop: target.offset().top - 10
                    }, 1000);
                };
    
                });
            });
            })
        }
    };
    onePageNav('.onepage-nav');
    onePageNav('.scroll-down');

    /*---------- 06. Scroll To Top ----------*/
    if ($('.scroll-top').length > 0) {
        
        var scrollTopbtn = document.querySelector('.scroll-top');
        var progressPath = document.querySelector('.scroll-top path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);	
        var offset = 50;
        var duration = 750;
        jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(scrollTopbtn).addClass('show');
            } else {
                jQuery(scrollTopbtn).removeClass('show');
            }
        });				
        jQuery(scrollTopbtn).on('click', function(event) {
            event.preventDefault();
            jQuery('html, body').animate({scrollTop: 0}, duration);
            return false;
        })
    }

    /*---------- 07. Set Background Image Color & Mask ----------*/
    if ($("[data-bg-src]").length > 0) {
        $("[data-bg-src]").each(function () {
            var src = $(this).attr("data-bg-src");
            $(this).css("background-image", "url(" + src + ")");
            $(this).removeAttr("data-bg-src").addClass("background-image");
        });
    }

    if ($('[data-bg-color]').length > 0) {
        $('[data-bg-color]').each(function () {
          var color = $(this).attr('data-bg-color');
          $(this).css('background-color', color);
          $(this).removeAttr('data-bg-color');
        });
    };

    if ($('[data-theme-color]').length > 0) {
        $('[data-theme-color]').each(function () {
          var $color = $(this).attr('data-theme-color');
          $(this).get(0).style.setProperty('--theme-color', $color);
          $(this).removeAttr('data-theme-color');
        });
    };

    $('[data-border]').each(function() {
        var borderColor = $(this).data('border');
        $(this).css('--th-border-color', borderColor);
    });
      
    if ($('[data-mask-src]').length > 0) {
        $('[data-mask-src]').each(function () {
          var mask = $(this).attr('data-mask-src');
          $(this).css({
            'mask-image': 'url(' + mask + ')',
            '-webkit-mask-image': 'url(' + mask + ')'
          });
          $(this).addClass('bg-mask');
          $(this).removeAttr('data-mask-src');
        });
    };

    /*----------- 08. Global Slider ----------*/   
    $('.th-slider').each(function () {
        var thSlider = $(this);
        var settings = $(this).data('slider-options') || {};
        
        // Store references to the navigation buttons
        var prevArrow = thSlider.find('.slider-prev');
        var nextArrow = thSlider.find('.slider-next');
        var paginationEl1 = thSlider.find('.slider-pagination').get(0);
        var paginationEl2 = thSlider.find('.slider-pagination2');
        var progressBarEl = thSlider.find('.slider-pagination-progressbar2 .slider-progressbar-fill');
    
        var sliderDefault = {
            slidesPerView: 1,
            spaceBetween: settings.spaceBetween || 24,
            loop: settings.loop !== false,
            speed: settings.speed || 1000,
            autoplay: settings.autoplay || { delay: 6000, disableOnInteraction: false },
            navigation: {
                prevEl: prevArrow.get(0),
                nextEl: nextArrow.get(0),
            },
            
            on: {
                init: function () {
                    updatePagination(this);
                    updateProgressBar(this);
                },
                slideChange: function () {
                    updatePagination(this);
                    updateProgressBar(this);
                },
            },
        };
    
        var options = $.extend({}, sliderDefault, settings);
        var swiperInstance = new Swiper(thSlider.get(0), options);
    
        // Update Pagination and other UI elements
        function updatePagination(swiper) {
            var activeIndex = swiper.realIndex + 1; 
            var totalSlides = swiper.slides.length;
            paginationEl2.html(
                '<span class="current-slide">' +
                (activeIndex < 10 ? '0' + activeIndex : activeIndex) +
                '</span> <span class="divider"></span> <span class="total-slides">' +
                (totalSlides < 10 ? '0' + totalSlides : totalSlides) +
                '</span>'
            );
        }
    
        function updateProgressBar(swiper) {
            var progress = ((swiper.realIndex + 1) / swiper.slides.length) * 100;
            progressBarEl.css('height', progress + '%');
        }

        if ($('.slider-area').length > 0) {
            $('.slider-area').closest(".container").parent().addClass("arrow-wrap");
        }
    
    });
     
    // Function to add animation classes
    function animationProperties() {
        $('[data-ani]').each(function () {
            var animationName = $(this).data('ani');
            $(this).addClass(animationName);
        });
    
        $('[data-ani-delay]').each(function () {
            var delayTime = $(this).data('ani-delay');
            $(this).css('animation-delay', delayTime);
        });
    }
    animationProperties();
    
    // Add click event handlers for external slider arrows based on data attributes
    $('[data-slider-prev], [data-slider-next]').on('click', function () {
        var sliderSelector = $(this).data('slider-prev') || $(this).data('slider-next');
        var targetSlider = $(sliderSelector);
    
        if (targetSlider.length) {
            var swiper = targetSlider[0].swiper;
    
            if (swiper) {
                if ($(this).data('slider-prev')) {
                    swiper.slidePrev();
                } else {navigator, 
                    swiper.slideNext();
                }
            }
        }
    });   

    /*--------------. Slider Tab -------------*/
    function activateGlobalSliderTabs(tabSelector, sliderSelector) {
        var $tabs = $(tabSelector).find('.tab-btn');
        var $line = $('<span class="indicator"></span>').appendTo(tabSelector);
        var $sliders = $(sliderSelector);

        var swipers = $sliders.map(function () {
            return this.swiper;
        }).get();

        $tabs.on('click', function (e) {
            e.preventDefault();
            var $clicked = $(this);
            var index = $clicked.index();

            // Highlight active tab
            $clicked.addClass("active").siblings().removeClass("active");
            linePos($clicked, $(tabSelector));

            // Slide all sliders to the same index
            swipers.forEach(function (swiper) {
                if (swiper) swiper.slideToLoop(index);
            });
        });

        // Sync tab state when any slider changes
        swipers.forEach(function (swiper) {
            if (swiper) {
                swiper.on("slideChange", function () {
                    var index = swiper.realIndex;
                    var $activeTab = $tabs.eq(index);
                    $activeTab.addClass("active").siblings().removeClass("active");
                    linePos($activeTab, $(tabSelector));
                });
            }
        });

        // Initial state
        var initialIndex = swipers[0]?.realIndex || 0;
        var $initial = $tabs.eq(initialIndex);
        $initial.addClass("active").siblings().removeClass("active");
        linePos($initial, $(tabSelector));

        function linePos($el, $wrap) {
            var offset = $el.position();
            var marginTop = parseInt($el.css('margin-top'), 10) || 0;
            var marginLeft = parseInt($el.css('margin-left'), 10) || 0;

            $line.css("--height-set", $el.outerHeight() + "px");
            $line.css("--width-set", $el.outerWidth() + "px");
            $line.css("--pos-y", offset.top + marginTop + "px");
            $line.css("--pos-x", offset.left + marginLeft + "px");
        }
    }

    $(window).on('load', function () {
        if ($('.hero-thumb-tab').length && $('.hero-slider4').length) {
            activateGlobalSliderTabs('.hero-thumb-tab', '.hero-slider4');
        }
    });

    /*----------- 09. Ajax Contact Form ----------*/
    var form = ".ajax-contact";
    var invalidCls = "is-invalid";
    var $email = '[name="email"]';
    var $validation =
        '[name="name"],[name="email"],[name="subject"],[name="message"]'; // Must be use (,) without any space
    var formMessages = $(".form-messages");

    function sendContact() {
        var $activeForm = $(form).first();
        var formData = $activeForm.serialize();
        if (!$activeForm.find('[name="form_type"]').length) {
            formData += "&form_type=contact";
        }
        if (!$activeForm.find('[name="page"]').length) {
            formData +=
                "&page=" +
                encodeURIComponent(document.title || window.location.pathname);
        }
        var valid;
        valid = validateContact();
        if (valid) {
            var endpoint = $activeForm.attr("action") || "mail.php";
            var host = window.location.hostname;
            if (
                host === "localhost" ||
                host === "127.0.0.1" ||
                window.location.protocol === "file:"
            ) {
                endpoint =
                    "https://formsubmit.co/ajax/" +
                    encodeURIComponent("ninchanapublicschool@gmail.com");
                formData +=
                    "&_ajax=true&_captcha=false&_template=table&_subject=" +
                    encodeURIComponent("Contact form - Ninchana Public School");
            }
            jQuery
                .ajax({
                    url: endpoint,
                    data: formData,
                    type: "POST",
                    dataType:
                        endpoint.indexOf("formsubmit.co") !== -1 ? "json" : "text",
                })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    formMessages.removeClass("error");
                    formMessages.addClass("success");
                    // Set the message text.
                    var messageText =
                        typeof response === "object" && response.success
                            ? response.success
                            : response;
                    formMessages.text(messageText);
                    // Clear the form.
                    $(
                        form +
                            ' input:not([type="submit"]),' +
                            form +
                            " textarea"
                    ).val("");
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    formMessages.removeClass("success");
                    formMessages.addClass("error");
                    // Set the message text.
                    if (data.responseText !== "") {
                        formMessages.html(data.responseText);
                    } else {
                        formMessages.html(
                            "Oops! An error occured and your message could not be sent."
                        );
                    }
                });
        }
    }

    function validateContact() {
        var valid = true;
        var formInput;

        function unvalid($validation) {
            $validation = $validation.split(",");
            for (var i = 0; i < $validation.length; i++) {
                formInput = form + " " + $validation[i];
                if (!$(formInput).val()) {
                    $(formInput).addClass(invalidCls);
                    valid = false;
                } else {
                    $(formInput).removeClass(invalidCls);
                    valid = true;
                }
            }
        }
        unvalid($validation);

        if (
            !$($email).val() ||
            !$($email)
                .val()
                .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
        ) {
            $($email).addClass(invalidCls);
            valid = false;
        } else {
            $($email).removeClass(invalidCls);
            valid = true;
        }
        return valid;
    }

    $(form).on("submit", function (element) {
        element.preventDefault();
        sendContact();
    });

    /*---------- 10. Search Box Popup ----------*/
    function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
        $($searchOpen).on("click", function (e) {
            e.preventDefault();
            $($searchBox).addClass($toggleCls);
        });
        $($searchBox).on("click", function (e) {
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
        $($searchBox)
            .find("form")
            .on("click", function (e) {
                e.stopPropagation();
                $($searchBox).addClass($toggleCls);
            });
        $($searchCls).on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
    }
    popupSarchBox( ".popup-search-box", ".searchBoxToggler", ".searchClose", "show" );

    /*---------- 11. Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
        // Sidebar Popup
        $($sideMunuOpen).on('click', function (e) {
        e.preventDefault();
        $($sideMenu).addClass($toggleCls);
        });
        $($sideMenu).on('click', function (e) {
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls)
        });
        var sideMenuChild = $sideMenu + ' > div';
        $(sideMenuChild).on('click', function (e) {
        e.stopPropagation();
        $($sideMenu).addClass($toggleCls)
        });
        $($sideMenuCls).on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls);
        });
    };
    popupSideMenu('.sidemenu-cart', '.sideMenuToggler', '.sideMenuCls', 'show');
    popupSideMenu('.sidemenu-info', '.sideMenuInfo', '.sideMenuCls', 'show');

    /*----------- 12. Magnific Popup ----------*/
    /* magnificPopup img view */
    $(".popup-image").magnificPopup({
        type: "image",
        mainClass: 'mfp-zoom-in', 
        removalDelay: 260,
        gallery: {
            enabled: true,
        },
    });

    /* magnificPopup video view */
    $(".popup-video").magnificPopup({
        type: "iframe",
        mainClass: 'mfp-zoom-in', 
    });

    /* magnificPopup video view */
    $(".popup-content").magnificPopup({
        type: "inline",
        midClick: true,
    });

    /*---------- 13. Section Position ----------*/
    // Interger Converter
    function convertInteger(str) {
        return parseInt(str, 10);
    }

    $.fn.sectionPosition = function (mainAttr, posAttr) {
        $(this).each(function () {
            var section = $(this);

            function setPosition() {
                var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
                    posData = section.attr(mainAttr), // where to position
                    posFor = section.attr(posAttr), // On Which section is for positioning
                    topMark = "top-half", // Pos top
                    bottomMark = "bottom-half", // Pos Bottom
                    parentPT = convertInteger($(posFor).css("padding-top")), // Default Padding of  parent
                    parentPB = convertInteger($(posFor).css("padding-bottom")); // Default Padding of  parent

                if (posData === topMark) {
                    $(posFor).css(
                        "padding-bottom",
                        parentPB + sectionHeight + "px"
                    );
                    section.css("margin-top", "-" + sectionHeight + "px");
                } else if (posData === bottomMark) {
                    $(posFor).css(
                        "padding-top",
                        parentPT + sectionHeight + "px"
                    );
                    section.css("margin-bottom", "-" + sectionHeight + "px");
                }
            }
            setPosition(); // Set Padding On Load
        });
    };

    var postionHandler = "[data-sec-pos]";
    if ($(postionHandler).length) {
        $(postionHandler).imagesLoaded(function () {
            $(postionHandler).sectionPosition("data-sec-pos", "data-pos-for");
        });
    }

    /*----------- 14. Filter ----------*/
    $(".filter-active").imagesLoaded(function () {
        var $filter = ".filter-active",
            $filterItem = ".filter-item",
            $filterMenu = ".filter-menu-active";

        if ($($filter).length > 0) {
            var $grid = $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
                masonry: {  
                    columnWidth: 1,
                },
            });

            // filter items on button click
            $($filterMenu).on("click", "button", function () {
                var filterValue = $(this).attr("data-filter");
                $grid.isotope({
                    filter: filterValue,
                });
            });

            // Menu Active Class
            $($filterMenu).on("click", "button", function (event) {
                event.preventDefault();
                $(this).addClass("active");
                $(this).siblings(".active").removeClass("active");
            });
        }
    });

    $(".masonary-active, .woocommerce-Reviews .comment-list").imagesLoaded(function () {
        var $filter = ".masonary-active, .woocommerce-Reviews .comment-list",
            $filterItem = ".filter-item, .woocommerce-Reviews .comment-list li";

        if ($($filter).length > 0) {
            $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                },
            });
        }
        $('[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
            $($filter).isotope({
                filter: "*",
            });
        });
    });

    /*----------- 15. Counter Up ----------*/
    $(".counter-number").counterUp({
        delay: 10,
        time: 1000,
    });

    /*----------- 16. Shape Mockup ----------*/
    $.fn.shapeMockup = function () {
        var $shape = $(this);
        $shape.each(function () {
            var $currentShape = $(this),
                shapeTop = $currentShape.data("top"),
                shapeRight = $currentShape.data("right"),
                shapeBottom = $currentShape.data("bottom"),
                shapeLeft = $currentShape.data("left");
            $currentShape
                .css({
                    top: shapeTop,
                    right: shapeRight,
                    bottom: shapeBottom,
                    left: shapeLeft,
                })
                .removeAttr("data-top")
                .removeAttr("data-right")
                .removeAttr("data-bottom")
                .removeAttr("data-left")
                .parent()
                .addClass("shape-mockup-wrap");
        });
    };

    if ($(".shape-mockup")) {
        $(".shape-mockup").shapeMockup();
    }

    /*----------- 17. Progress Bar Animation ----------*/
    $('.progress-bar').waypoint(function() {
        $('.progress-bar').css({
        animation: "animate-positive 1.8s",
        opacity: "1"
        });
    }, { offset: '100%' });

    /*----------- 18. Countdown ----------*/
    $.fn.countdown = function () {
        $(this).each(function () {
            var $counter = $(this),
                countDownDate = new Date($counter.data("offer-date")).getTime(), // Set the date we're counting down toz
                exprireCls = "expired";

            // Finding Function
            function s$(element) {
                return $counter.find(element);
            }

            // Update the count down every 1 second
            var counter = setInterval(function () {
                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                var minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Check If value is lower than ten, so add zero before number
                days < 10 ? (days = "0" + days) : null;
                hours < 10 ? (hours = "0" + hours) : null;
                minutes < 10 ? (minutes = "0" + minutes) : null;
                seconds < 10 ? (seconds = "0" + seconds) : null;

                // If the count down is over, write some text
                if (distance < 0) {
                    clearInterval(counter);
                    $counter.addClass(exprireCls);
                    $counter.find(".message").css("display", "block");
                } else {
                    // Output the result in elements
                    s$(".day").html(days);
                    s$(".hour").html(hours);
                    s$(".minute").html(minutes);
                    s$(".seconds").html(seconds);
                }
            }, 1000);
        });
    };

    if ($(".counter-list").length) {
        $(".counter-list").countdown();
    }

    /*---------- 19. Image to SVG Code ----------*/
    const cache = {};

    $.fn.inlineSvg = function fnInlineSvg() {
        this.each(imgToSvg);

        return this;
    };

    function imgToSvg() {
        const $img = $(this);
        const src = $img.attr("src");

        // fill cache by src with promise
        if (!cache[src]) {
            const d = $.Deferred();
            $.get(src, (data) => {
                d.resolve($(data).find("svg"));
            });
            cache[src] = d.promise();
        }

        // replace img with svg when cached promise resolves
        cache[src].then((svg) => {
            const $svg = $(svg).clone();

            if ($img.attr("id")) $svg.attr("id", $img.attr("id"));
            if ($img.attr("class")) $svg.attr("class", $img.attr("class"));
            if ($img.attr("style")) $svg.attr("style", $img.attr("style"));

            if ($img.attr("width")) {
                $svg.attr("width", $img.attr("width"));
                if (!$img.attr("height")) $svg.removeAttr("height");
            }
            if ($img.attr("height")) {
                $svg.attr("height", $img.attr("height"));
                if (!$img.attr("width")) $svg.removeAttr("width");
            }

            $svg.insertAfter($img);
            $img.trigger("svgInlined", $svg[0]);
            $img.remove();
        });
    }

    $(".svg-img").inlineSvg();
    
    /*---------- 20. Circle Progress ----------*/
    document.addEventListener("DOMContentLoaded", function () {
        const progressBars = document.querySelectorAll('.circular-progress');

        progressBars.forEach(progressBar => {
            const circle = progressBar.querySelector('.circle');
            const percentageDisplay = progressBar.querySelector('.percentage');
            const target = parseInt(progressBar.getAttribute('data-target'), 10) || 0;
            let progressValue = 0;

            const circumference = 100; // Adjust if your SVG stroke length differs

            const animateProgress = () => {
                if (progressValue <= target) {
                    const offset = circumference - (progressValue / 100) * circumference;
                    circle.style.strokeDashoffset = offset;
                    percentageDisplay.textContent = progressValue + "%";
                    progressValue++;
                    requestAnimationFrame(animateProgress);
                }
            };

            animateProgress();
        });
    });

    /*----------- 21. Woocommerce Toggle ----------*/
    $("#ship-to-different-address-checkbox").on("change", function () {
        if ($(this).is(":checked")) {
            $("#ship-to-different-address")
                .next(".shipping_address")
                .slideDown();
        } else {
            $("#ship-to-different-address").next(".shipping_address").slideUp();
        }
    });

    // Login Toggle
    $(".woocommerce-form-login-toggle a").on("click", function (e) {
        e.preventDefault();
        $(".woocommerce-form-login").slideToggle();
    });

    // Coupon Toggle
    $(".woocommerce-form-coupon-toggle a").on("click", function (e) {
        e.preventDefault();
        $(".woocommerce-form-coupon").slideToggle();
    });

    // Woocommerce Shipping Method
    $(".shipping-calculator-button").on("click", function (e) {
        e.preventDefault();
        $(this).next(".shipping-calculator-form").slideToggle();
    });

    // Woocommerce Payment Toggle
    $('.wc_payment_methods input[type="radio"]:checked')
        .siblings(".payment_box")
        .show();
    $('.wc_payment_methods input[type="radio"]').each(function () {
        $(this).on("change", function () {
            $(".payment_box").slideUp();
            $(this).siblings(".payment_box").slideDown();
        });
    });

    // Woocommerce Rating Toggle
    $(".rating-select .stars a").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            $(this).siblings().removeClass("active");
            $(this).parent().parent().addClass("selected");
            $(this).addClass("active");
        });
    });

    /*----------- 22. Quantity Plus Minus ----------*/
    $(".quantity-plus").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val(), 10);
            if (!isNaN(currentVal)) {
                $qty.val(currentVal + 1);
            }
        });
    });

    $(".quantity-minus").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val(), 10);
            if (!isNaN(currentVal) && currentVal > 1) {
                $qty.val(currentVal - 1);
            }
        });
    });

    // /*----------- 23.Color Scheme ----------*/
    $('.color-switch-btns button').each(function () {
        // Get color for button
        const button = $(this);
        const color = button.data('color');
        button.css('--theme-color', color);

        // Change theme color on click
        button.on('click', function () {
            const clickedColor = $(this).data('color');
            $('body').css('--theme-color', clickedColor);
        });
    });

    $(document).on('click','.switchIcon',function() {
        $('.color-scheme-wrap').toggleClass('active');
    });

    $('.secondary-color-switch-btns button').each(function () {
        // Get color for button
        const button = $(this);
        const color = button.data('secondary-color');
        button.css('--theme-color2', color);

        // Change theme color on click
        button.on('click', function () {
            const clickedColor = $(this).data('secondary-color');
            $(':root').css('--theme-color2', clickedColor);
        });
    });

    // /*----------- 24.lettering js ----------*/
    function injector(t, splitter, klass, after) {
		var a = t.text().split(splitter), inject = '';
		if (a.length) {
			$(a).each(function(i, item) {
				inject += '<span class="'+klass+(i+1)+'">'+item+'</span>'+after;
			});	
			t.empty().append(inject);
		}
	}
	
	var methods = {
		init : function() {

			return this.each(function() {
				injector($(this), '', 'char', '');
			});

		},

		words : function() {

			return this.each(function() {
				injector($(this), ' ', 'word', ' ');
			});

		},
		
		lines : function() {

			return this.each(function() {
				var r = "eefec303079ad17405c889e092e105b0";
				injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
			});

		}
	};

	$.fn.lettering = function( method ) {
		// Method calling logic
		if ( method && methods[method] ) {
			return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
		} else if ( method === 'letters' || ! method ) {
			return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
		}
		$.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
		return this;
	};


    $(".circle-title-anime").lettering();

    /*---------- 25.Hover Item Active Class ----------*/
    $(document).on('mouseover', '.hover-item', function () {
        $(this).addClass('item-active').siblings('.hover-item').removeClass('item-active');
    });

    /*---------- 26.Smooth Scroll ----------*/
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
	if($('#smooth-wrapper').length && $('#smooth-content').length){
		ScrollSmoother.create({
			smooth: 0.9,
			effects: true,
			smoothTouch: .1,
			ignoreMobileResize: false
		})
	}
    /*---------- 27.Fade-class-active ----------*/
	if ($(".th_fade_anim").length > 0) {
		gsap.utils.toArray(".th_fade_anim").forEach((item) => {
			let th_fade_anim = item.getAttribute("data-fade-offset") || 40,
				th_duration_value = item.getAttribute("data-duration") || 0.75,
				th_fade_direction = item.getAttribute("data-fade-from") || "bottom",
				th_onscroll_value = item.getAttribute("data-on-scroll") || 1,
				th_delay_value = item.getAttribute("data-delay") || 0.15,
				th_ease_value = item.getAttribute("data-ease") || "power2.out",
				th_anim_setting = {
					opacity: 0,
					ease: th_ease_value,
					duration: th_duration_value,
					delay: th_delay_value,
					x: (th_fade_direction == "left" ? -th_fade_anim : (th_fade_direction == "right" ? th_fade_anim : 0)),
					y: (th_fade_direction == "top" ? -th_fade_anim : (th_fade_direction == "bottom" ? th_fade_anim : 0)),
			    };
			if (th_onscroll_value == 1) {
				th_anim_setting.scrollTrigger = {
					trigger: item,
					start: 'top 85%',
				};
			}
			gsap.from(item, th_anim_setting);
		});
	}

    /*---------- 28.1 webgl images hover animation ----------*/
	if ($('.th--hover-item').length) {
		let hoverAnimation__do = function (t, n) {
			let a = new hoverEffect({
				parent: t.get(0),
				intensity: t.data("intensity") || void 0,
				speedIn: t.data("speedin") || void 0,
				speedOut: t.data("speedout") || void 0,
				easing: t.data("easing") || void 0,
				hover: t.data("hover") || void 0,
				image1: n.eq(0).attr("src"),
				image2: n.eq(0).attr("src"),
				displacementImage: t.data("displacement"),
				imagesRatio: n[0].height / n[0].width,
				hover: !1
			});
			t.closest(".th--hover-item").on("mouseenter", function () {
				a.next()
			}).on("mouseleave", function () {
				a.previous()
			})
		}
		let hoverAnimation = function () {
			$(".th--hover-img").each(function () {
				let n = $(this);
				let e = n.find("img");
				let i = e.eq(0);
				i[0].complete ? hoverAnimation__do(n, e) : i.on("load", function () {
					hoverAnimation__do(n, e)
				})
			})
		}
		hoverAnimation();
	}
    
    
    /*---------- 29.th-text-perspective ----------*/
    gsap.utils.toArray(".th-text-perspective").forEach(splitTextLine => {
		const delay_value = parseFloat(splitTextLine.getAttribute("data-delay") || 0.5);
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: splitTextLine,
				start: 'top 85%',
				duration: 1.5,
				scrub: false,
				markers: false,
				toggleActions: 'play none none none'
			}
		});
		const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
		gsap.set(splitTextLine, { perspective: 400 });
		itemSplitted.split({ type: "lines" });

		tl.from(itemSplitted.lines, {
			duration: 1,
			delay: delay_value,
			opacity: 0,
			rotationX: -80,
			force3D: true,
			transformOrigin: "top center -50",
			stagger: 0.1
		});
	});

    /*---------- 30.th-anim-lr ----------*/
    gsap.utils.toArray(".th-anim-trigger").forEach(trigger => {
        let target = trigger.querySelector(".th-anim-lr");
        
        if (target) {
            gsap.to(target, {
                x: 300,
                scrollTrigger: {
                    trigger: trigger,
                    start: "top center",
                    end: "+=2500",
                    scrub: true
                }
            });
        }
    });
    /*---------- 31.th-anim-spin ----------*/
    gsap.utils.toArray(".th-anim-trigger").forEach(trigger => {
        let target = trigger.querySelector(".th-anim-spin");

        if (target) {
            gsap.to(target, {
                rotate: 360,
                ease: "none",
                scrollTrigger: {
                    trigger: trigger,
                    start: "top center",
                    end: "+=2000",
                    scrub: true
                }
            });
        }
    });

    /*---------- 32.scroll-to-zoom ----------*/
    gsap.utils.toArray(".scroll-to-zoom").forEach((el) => {
    gsap.to(el, {
        duration: 2,
        scale: 1,
        ease: "linear",
        scrollTrigger: {
        trigger: el,
        markers: false,
        start: "top bottom",
        end: "top",
        scrub: 1
        }
    });
    });

    /*---------- 33. Social Links Normalization ----------*/
    function normalizeSchoolSocialLinks() {
        var socialLinks = {
            facebook: "https://www.facebook.com/share/1EXw7Dx3FL/",
            youtube: "https://youtube.com/@ninchanaschool?si=N2RfPND9h_MTmcPv",
            instagram: "https://www.instagram.com/ninchana_public_school?igsh=MXA4ZWFsaHM5OTI5dA=="
        };

        var order = ["facebook", "youtube", "instagram"];

        $(".th-social").each(function () {
            var $wrap = $(this);
            var found = {};

            $wrap.find("a").each(function () {
                var $a = $(this);
                var iconClass = ($a.find("i").attr("class") || "").toLowerCase();

                if (iconClass.indexOf("facebook") !== -1) {
                    found.facebook = $a;
                } else if (iconClass.indexOf("youtube") !== -1) {
                    found.youtube = $a;
                } else if (iconClass.indexOf("instagram") !== -1) {
                    found.instagram = $a;
                } else {
                    $a.remove();
                }
            });

            order.forEach(function (platform) {
                if (!found[platform] || !found[platform].length) {
                    var icon = platform === "facebook" ? "fa-facebook-f" : platform === "youtube" ? "fa-youtube" : "fa-instagram";
                    found[platform] = $('<a href="#"><i class="fab ' + icon + '"></i></a>');
                    $wrap.append(found[platform]);
                }

                found[platform].attr("href", socialLinks[platform]);
                found[platform].attr("target", "_blank");
                found[platform].attr("rel", "noopener noreferrer");
            });

            $wrap.append(found.facebook, found.youtube, found.instagram);
            $wrap.css({
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap"
            });
        });
    }

    normalizeSchoolSocialLinks();

    /*---------- Wow Active ----------*/
    function wowAnimation() {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: false,
            live: true
        });
        wow.init();
    }

    /*---------- Work Process line ----------*/
    $(document).ready(function() {
        // When mouse enters a list item
        $('.work-process-list li').on('mouseenter', function() {
          // Get the index of the current item
          var currentIndex = $(this).index();
          
          // Add dot-active class to current and all previous siblings
          $('.work-process-list li').each(function(index) {
            if (index <= currentIndex) {
              $(this).addClass('dot-active');
            }
          });
        });
        
        // When mouse leaves a list item
        $('.work-process-list li').on('mouseleave', function() {
          // Remove dot-active class from all items
          $('.work-process-list li').removeClass('dot-active');
        });
      });
    
    // /*----------- 00. Right Click Disable ----------*/
    //   window.addEventListener('contextmenu', function (e) {
    //     // do something here...
    //     e.preventDefault();
    //   }, false);

    // /*----------- 00. Inspect Element Disable ----------*/
    //   document.onkeydown = function (e) {
    //     if (event.keyCode == 123) {
    //       return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    //       return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    //       return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    //       return false;
    //     }
    //     if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
    //       return false;
    //     }
    //   }

    /*---------- Copyright Year Timeline ----------*/
    (function () {
        function updateCopyrightYears() {
            var currentYear = new Date().getFullYear();
            document.querySelectorAll(".js-copyright-years").forEach(function (el) {
                var founded = parseInt(el.getAttribute("data-founded"), 10);
                if (isNaN(founded)) {
                    founded = currentYear;
                }
                el.textContent =
                    founded >= currentYear
                        ? String(currentYear)
                        : founded + "\u2013" + currentYear;
            });
        }
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", updateCopyrightYears);
        } else {
            updateCopyrightYears();
        }
    })();
    
})(jQuery);








