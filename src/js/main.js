$(function() {
    var BREAKPOINTS = {
        maxMobile: '480',
        maxTabletLandscape: '1024'
    };

    var Website = {
        init: function() {
            this.detectElements();
            this.bindEvents();
            this.screenCheckThing();
            this.checkIE();
        },
        detectElements: function() {
            this.$htmlBody = $('html,body');
            this.$overlay = $('.overlay');
            this.$triggerEl = $('[data-jumpto]');
            this.$triggerAudioBtn = $('.js-trigger-sound');
            this.$audioElements = $('audio');
            this.screenSize = window.innerWidth;
        },
        bindEvents: function() {
            if (this.$triggerEl) {
				this.$triggerEl.on('click', this.jumpToX);
			}
			
			if (this.$triggerAudioBtn) {
				this.$triggerAudioBtn.on('mouseenter touchstart', this.audioMouseEnterThing);
				this.$triggerAudioBtn.on('mouseleave', this.audioMouseLeaveThing.bind(this));
			}
        },
        screenCheckThing: function() {
            if (this.screenSize > BREAKPOINTS.maxTabletLandscape) {
                this.gifHoverThing();
                this.gameThing();
            }
            this.hideOverlay();
        },
        checkIE: function() {
            var ua = window.navigator.userAgent,
                is_ie = /MSIE|Trident/.test(ua);

            if (is_ie) {
                $("body").addClass("ie");
            }
        },
        jumpToX: function() {
            var $targetElData = $(this).data('jumpto'),
            $targetEl = $('.' + $targetElData);

            Website.$htmlBody.animate({
                    scrollTop: $targetEl.offset().top - 50
                },
                this.jumpSpeed
            );

            return false;
        },
        gifHoverThing: function() {
            var $triggerGifBtn = $('.js-trigger-gif'),
                defaultImage = 'url(images/coding.gif)';

            if ($triggerGifBtn) {
                $triggerGifBtn
                    .on('mouseenter touchstart', function() {
                        var dataGif = $(this).data('gif'),
                            $mediaEl = $(this).parents('.section__content').find('.side-gif');

                        $($mediaEl).css('background-image', 'url(images/' + dataGif + '.gif)');
                    })
                    .on('mouseleave', function() {
                        var $mediaEl = $(this).parents('.section__content').find('.side-gif');

                        $mediaEl.css('background-image', defaultImage);
                    });
            }
        },
        audioMouseEnterThing: function() {
            var dataSound = $(this).data('sound');
            $('#sound-' + dataSound)[0].play();
        },
        audioMouseLeaveThing: function() {
            this.$audioElements.each(function() {
                this.pause();
                this.currentTime = 0;
            });
        },
        gameThing: function() {
            var $game = $('.game');

            if ($game) {
                $game.blockrain({ autoplayRestart: true, theme: 'modern' });
            }
        },
        hideOverlay: function() {
            this.$overlay.hide();
        }
    };

    Website.init();
});
