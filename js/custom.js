/**
 * Custom JavaScript - Enhanced Cosmic Theme Edition
 * Local Implementation with Cosmic Interactions
 * No external dependencies or cloud services
 */

(function($) {
    'use strict';

    // Initialize on document ready
    $(document).ready(function() {
        // AUTO-LOGIN FOR SINGLE USER (BYPASS AUTHENTICATION)
        localStorage.setItem('isLoggedIn', 'true');

        // ORIGINAL FUNCTIONALITY - DO NOT REMOVE
        initializeTheme();
        initializeFormHandling();
        initializePasswordToggle();
        initializeRememberMe();

        // NEW COSMIC FEATURES
        initializeCosmicTheme();
        enhanceCosmicInputs();
        initializeCosmicButtons();
        initializeCosmicParticles();
    });

    /**
     * Theme Management (ORIGINAL - PRESERVED)
     */
    function initializeTheme() {
        const savedTheme = localStorage.getItem('skin') || 'default';
        applyTheme(savedTheme);
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }
        localStorage.setItem('skin', theme);
    }

    /**
     * Form Handling (ORIGINAL - PRESERVED)
     */
    function initializeFormHandling() {
        const $form = $('#loginform');

        $form.on('submit', function(e) {
            e.preventDefault();

            // Show cosmic loading state
            showCosmicLoader();

            // Original functionality preserved
            console.log('Form submitted - login requirement bypassed');

            // Simulate brief processing
            setTimeout(function() {
                hideCosmicLoader();
                showCosmicSuccess();

                // Set logged in flag and redirect to dashboard
                localStorage.setItem('isLoggedIn', 'true');

                setTimeout(function() {
                    window.location.href = 'dashboard.html';
                }, 1000);
            }, 1500);
        });
    }

    /**
     * Password Visibility Toggle (ORIGINAL - ENHANCED)
     */
    function initializePasswordToggle() {
        // Create toggle button with cosmic styling
        const $passwordField = $('#password');
        const $toggleBtn = $('<button>')
            .attr('type', 'button')
            .addClass('btn btn-link position-absolute cosmic-toggle-btn')
            .css({
                right: '10px',
                top: '35px',
                transition: 'all 0.3s ease'
            })
            .html('<i class="fas fa-eye"></i>')
            .on('click', function() {
                const type = $passwordField.attr('type') === 'password' ? 'text' : 'password';
                $passwordField.attr('type', type);

                // Enhanced icon animation
                var $icon = $(this).find('i');
                $icon.addClass('cosmic-icon-spin');
                setTimeout(function() {
                    $icon.removeClass('cosmic-icon-spin');
                }, 300);

                $icon.toggleClass('fa-eye fa-eye-slash');
            })
            .on('mouseenter', function() {
                $(this).css('transform', 'scale(1.1)');
            })
            .on('mouseleave', function() {
                $(this).css('transform', 'scale(1)');
            });

        // Add to password field parent if it has relative positioning
        const $parent = $passwordField.parent();
        if (!$parent.hasClass('position-relative')) {
            $parent.addClass('position-relative');
        }
        $parent.append($toggleBtn);
    }

    /**
     * Remember Me Functionality (ORIGINAL - PRESERVED)
     */
    function initializeRememberMe() {
        // Load saved email if remember me was checked
        if (localStorage.getItem('rememberEmail')) {
            $('#email').val(localStorage.getItem('rememberEmail'));
            $('#remember-me').prop('checked', true);
        }

        // Save/remove email on form submit
        $('#loginform').on('submit', function() {
            if ($('#remember-me').is(':checked')) {
                localStorage.setItem('rememberEmail', $('#email').val());
            } else {
                localStorage.removeItem('rememberEmail');
            }
        });
    }

    /**
     * ========================================
     * NEW COSMIC THEME FEATURES
     * ========================================
     */

    /**
     * Cosmic Theme Switcher
     * Cycles between: cosmic-dark, cosmic-nebula, cosmic-aurora
     */
    function initializeCosmicTheme() {
        // Load saved cosmic theme
        const savedCosmicTheme = localStorage.getItem('cosmicTheme') || 'cosmic-dark';
        applyCosmicTheme(savedCosmicTheme);

        // THEME TOGGLE DISABLED - Single theme only
        // const $themeToggle = $('<button>')
        //     .attr('type', 'button')
        //     .addClass('cosmic-theme-toggle')
        //     .html('<i class="fas fa-palette"></i>')
        //     .css({
        //         position: 'fixed',
        //         top: '20px',
        //         right: '20px',
        //         width: '50px',
        //         height: '50px',
        //         borderRadius: '50%',
        //         border: 'none',
        //         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        //         color: 'white',
        //         fontSize: '20px',
        //         cursor: 'pointer',
        //         zIndex: '9999',
        //         boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
        //         transition: 'all 0.3s ease'
        //     })
        //     .on('click', function() {
        //         cycleCosmicTheme();
        //         $(this).addClass('cosmic-spin');
        //         setTimeout(function() {
        //             $themeToggle.removeClass('cosmic-spin');
        //         }, 600);
        //     })
        //     .on('mouseenter', function() {
        //         $(this).css({
        //             transform: 'scale(1.1)',
        //             boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
        //         });
        //     })
        //     .on('mouseleave', function() {
        //         $(this).css({
        //             transform: 'scale(1)',
        //             boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
        //         });
        //     });

        // $('body').append($themeToggle);

        // Add cosmic spin animation style
        if (!$('#cosmic-animations').length) {
            $('<style id="cosmic-animations">').text('\
                .cosmic-spin { animation: cosmicSpin 0.6s ease; }\
                @keyframes cosmicSpin { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.2); } 100% { transform: rotate(360deg) scale(1); } }\
                .cosmic-icon-spin { animation: iconSpin 0.3s ease; }\
                @keyframes iconSpin { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }\
                .cosmic-glow { box-shadow: 0 0 10px rgba(102, 126, 234, 0.5), 0 0 20px rgba(102, 126, 234, 0.3) !important; }\
                .cosmic-glow-green { box-shadow: 0 0 10px rgba(61, 213, 152, 0.5), 0 0 20px rgba(61, 213, 152, 0.3) !important; }\
                .cosmic-glow-red { box-shadow: 0 0 10px rgba(252, 90, 90, 0.5), 0 0 20px rgba(252, 90, 90, 0.3) !important; }\
                .cosmic-ripple { position: relative; overflow: hidden; }\
                .cosmic-ripple:after { content: ""; position: absolute; top: 50%; left: 50%; width: 0; height: 0; border-radius: 50%; background: rgba(255,255,255,0.5); transform: translate(-50%, -50%); }\
                .cosmic-ripple.active:after { animation: rippleEffect 0.6s ease-out; }\
                @keyframes rippleEffect { 0% { width: 0; height: 0; opacity: 1; } 100% { width: 300px; height: 300px; opacity: 0; } }\
                .cosmic-particle { position: fixed; pointer-events: none; border-radius: 50%; background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0) 70%); animation: float 3s ease-in-out infinite; z-index: 1; }\
                @keyframes float { 0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; } 50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; } }\
            ').appendTo('head');
        }
    }

    function cycleCosmicTheme() {
        const themes = ['cosmic-dark', 'cosmic-nebula', 'cosmic-aurora'];
        const current = localStorage.getItem('cosmicTheme') || 'cosmic-dark';
        const currentIndex = themes.indexOf(current);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];

        applyCosmicTheme(nextTheme);

        // Show theme name notification
        showThemeNotification(nextTheme);
    }

    function applyCosmicTheme(theme) {
        const $html = $('html');

        // Remove all cosmic themes
        $html.removeClass('cosmic-dark cosmic-nebula cosmic-aurora');

        // Apply new theme
        $html.addClass(theme);
        localStorage.setItem('cosmicTheme', theme);

        // Apply theme-specific colors
        var gradient = '';
        switch(theme) {
            case 'cosmic-nebula':
                gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                break;
            case 'cosmic-aurora':
                gradient = 'linear-gradient(135deg, #3dd598 0%, #50b5ff 100%)';
                break;
            default:
                gradient = 'linear-gradient(135deg, #44444f 0%, #0062ff 100%)';
        }

        // Update page background if announcement section exists
        if ($('.auth-announcement').length) {
            $('.auth-announcement').css('background', gradient);
        }
    }

    function showThemeNotification(theme) {
        const themeName = theme.replace('cosmic-', '').charAt(0).toUpperCase() + theme.replace('cosmic-', '').slice(1);
        const $notification = $('<div>')
            .addClass('cosmic-notification')
            .text('Theme: ' + themeName)
            .css({
                position: 'fixed',
                top: '80px',
                right: '20px',
                padding: '10px 20px',
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                borderRadius: '5px',
                fontSize: '14px',
                zIndex: '9999',
                opacity: '0',
                transition: 'opacity 0.3s ease'
            });

        $('body').append($notification);
        setTimeout(function() { $notification.css('opacity', '1'); }, 10);
        setTimeout(function() {
            $notification.css('opacity', '0');
            setTimeout(function() { $notification.remove(); }, 300);
        }, 2000);
    }

    /**
     * Enhanced Form Input Interactions
     */
    function enhanceCosmicInputs() {
        $('.form-control').each(function() {
            var $input = $(this);

            // Add focus glow
            $input.on('focus', function() {
                $(this).addClass('cosmic-glow');
            }).on('blur', function() {
                $(this).removeClass('cosmic-glow');

                // Validate on blur
                if ($(this).val()) {
                    if ($(this).attr('type') === 'email') {
                        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (emailRegex.test($(this).val())) {
                            $(this).addClass('cosmic-glow-green').removeClass('cosmic-glow-red');
                        } else {
                            $(this).addClass('cosmic-glow-red').removeClass('cosmic-glow-green');
                        }
                    } else {
                        $(this).addClass('cosmic-glow-green').removeClass('cosmic-glow-red');
                    }
                } else {
                    $(this).removeClass('cosmic-glow-green cosmic-glow-red');
                }
            });

            // Animate label on input
            $input.on('input', function() {
                var $label = $('label[for="' + $(this).attr('id') + '"]');
                if ($(this).val()) {
                    $label.css({
                        transform: 'translateY(-5px)',
                        fontSize: '12px',
                        color: 'var(--primary)'
                    });
                } else {
                    $label.css({
                        transform: 'translateY(0)',
                        fontSize: '14px',
                        color: ''
                    });
                }
            });
        });
    }

    /**
     * Cosmic Button Interactions
     */
    function initializeCosmicButtons() {
        $('.btn').each(function() {
            var $btn = $(this);

            // Add ripple effect container
            if (!$btn.hasClass('cosmic-ripple')) {
                $btn.addClass('cosmic-ripple');
            }

            // Ripple on click
            $btn.on('click', function(e) {
                $(this).addClass('active');
                setTimeout(function() {
                    $btn.removeClass('active');
                }, 600);
            });
        });
    }

    /**
     * Cosmic Particle Background Effect
     * Subtle floating particle animation with low performance impact
     */
    function initializeCosmicParticles() {
        var particleCount = 15; // Low count for performance
        var $container = $('body');

        for (var i = 0; i < particleCount; i++) {
            createCosmicParticle($container, i);
        }
    }

    function createCosmicParticle($container, index) {
        var size = Math.random() * 4 + 2; // 2-6px
        var left = Math.random() * 100; // 0-100%
        var top = Math.random() * 100; // 0-100%
        var delay = Math.random() * 3; // 0-3s delay

        var $particle = $('<div>')
            .addClass('cosmic-particle')
            .css({
                width: size + 'px',
                height: size + 'px',
                left: left + '%',
                top: top + '%',
                animationDelay: delay + 's'
            });

        $container.append($particle);
    }

    /**
     * Enhanced Cosmic Loader
     * Galaxy rotation animation with cosmic color scheme
     */
    function showCosmicLoader() {
        var loader = '\
            <div id="cosmic-loader" class="position-fixed d-flex align-items-center justify-content-center"\
                 style="top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999;">\
                <div class="cosmic-spinner">\
                    <div class="cosmic-ring"></div>\
                    <div class="cosmic-ring"></div>\
                    <div class="cosmic-ring"></div>\
                    <div class="cosmic-text">Loading...</div>\
                </div>\
            </div>\
        ';

        // Add cosmic spinner styles if not exists
        if (!$('#cosmic-loader-styles').length) {
            $('<style id="cosmic-loader-styles">').text('\
                .cosmic-spinner { position: relative; width: 100px; height: 100px; }\
                .cosmic-ring { position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 3px solid transparent; animation: cosmicRotate 2s linear infinite; }\
                .cosmic-ring:nth-child(1) { border-top-color: #667eea; animation-duration: 1.5s; }\
                .cosmic-ring:nth-child(2) { border-right-color: #764ba2; animation-duration: 2s; }\
                .cosmic-ring:nth-child(3) { border-bottom-color: #50b5ff; animation-duration: 2.5s; }\
                .cosmic-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 14px; white-space: nowrap; }\
                @keyframes cosmicRotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }\
            ').appendTo('head');
        }

        $('body').append(loader);
    }

    function hideCosmicLoader() {
        $('#cosmic-loader').fadeOut(300, function() {
            $(this).remove();
        });
    }

    function showCosmicSuccess() {
        var $success = $('<div>')
            .addClass('cosmic-success')
            .html('<i class="fas fa-check-circle"></i><br>Login Successful!')
            .css({
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(0)',
                padding: '30px 40px',
                background: 'linear-gradient(135deg, #3dd598 0%, #50b5ff 100%)',
                color: 'white',
                borderRadius: '10px',
                fontSize: '18px',
                textAlign: 'center',
                zIndex: '10000',
                boxShadow: '0 10px 40px rgba(61, 213, 152, 0.4)',
                transition: 'transform 0.3s ease'
            });

        $('body').append($success);

        setTimeout(function() {
            $success.css('transform', 'translate(-50%, -50%) scale(1)');
        }, 10);

        setTimeout(function() {
            $success.css('transform', 'translate(-50%, -50%) scale(0)');
            setTimeout(function() { $success.remove(); }, 300);
        }, 2000);
    }

    /**
     * Utility Functions (ORIGINAL - PRESERVED & ENHANCED)
     */
    function showLoader() {
        // Use cosmic loader by default
        showCosmicLoader();
    }

    function hideLoader() {
        // Use cosmic loader by default
        hideCosmicLoader();
    }

    // Export utilities to global scope (ORIGINAL - PRESERVED)
    window.AppUtils = {
        showLoader: showLoader,
        hideLoader: hideLoader,
        applyTheme: applyTheme,
        // New cosmic utilities
        showCosmicLoader: showCosmicLoader,
        hideCosmicLoader: hideCosmicLoader,
        applyCosmicTheme: applyCosmicTheme,
        cycleCosmicTheme: cycleCosmicTheme
    };

})(jQuery);
