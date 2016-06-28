var $html, $header, $doc, $browserWindow, $order_form, $restore_form, $auth_form, $restore_complete_form, $callback_form, $callback_complete_form, $news_form;

$(function ($) {
    $html = $('html');
    $header = $('.header');
    $doc = $(document);
    $browserWindow = $(window);

    var header_height = $('.header').height();
    $(window).on("scroll", function () {
        if($('.main_content').isResponsiveFallback()) {
            if ($(this).scrollTop() > 100) {
                $(".header").addClass("header_fixed");
            }
            else {
                $(".header").removeClass("header_fixed");
            }
        }
    });

    $(".popup_form .close").click (function () {
        $(this).parents(".popup_form").dialog( "close" );
    });

    // navigation waypoints

    $('#navigation').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 1000,
        scrollOffset: 70,
        scrollThreshold: 0.5,
        filter: ':not(.external)',
        easing: 'swing',

        begin: function ($currentListItem) {

        },
        end: function ($currentListItem) {

        },
        scrollChange: function ($currentListItem) {

        }
    });

    $('input[type=radio][name=order_type]').change(function() {
        check_order_type(jQuery(this));
    });

    check_order_type($('input[type=radio][name=order_type]:checked'));

    function check_order_type(element) {
        if (element.val() == 'provide') {
            $('.prepay-block').hide();
        }
        else if (element.val() == 'execute') {
            $('.prepay-block').show();
        }
    }

    $('.aside_menu a.aside_m_link').click(function(event) {
        if(!$('.main_content').isResponsiveFallback()) return;

        var data_index = $(this).data('index');
        if (!data_index) return;

        $('.main_content').moveTo(data_index);
        var slider_position = $('section[data-index=' + data_index + ']').position();
        $(window).scrollTop(slider_position.top);
    });

    // product menu

    $('.landSwitcher').on ('click', function () {
        toggleLandMenu();
        return false;
    });

    // aside menu

    $('.openAsideMenu').on ('click', function () {
        toggleAsideMenu();
        return false;
    });

    // image to section BG

    $('.sectionBS').each(function (ind) {
        var section = $(this), img = section.find('.imgBS');

        section.backstretch(img.attr('src'));
    });

    // U movements

    $('.uBlock').plaxify({"xRange": 100, "yRange": 0, "invert": true});
    $.plax.enable();

    // forms

    formInit();

    $('.validateMe').validationEngine({
        //binded: false,
        scroll: false,
        showPrompts: true,
        showArrow: false,
        addSuccessCssClassToField: 'success',
        addFailureCssClassToField: 'error',
        parentFieldClass: '.form_cell',
        //parentFormClass: '.order_block',
        //promptPosition: "centerRight",
        //doNotShowAllErrosOnSubmit: true,
        //focusFirstField          : false,
        autoPositionUpdate: true,
        //prettySelect             : true,
        validationEventTrigger: 'submit',
        //useSuffix                : "_VE_field",
        addPromptClass: 'relative_mode single_msg_mode',
        showOneMessage: false
    });

    $('.validateMe-auth').validationEngine({
        //binded: false,
        scroll: false,
        showPrompts: true,
        showArrow: false,
        addSuccessCssClassToField: 'success',
        addFailureCssClassToField: 'error',
        parentFieldClass: '.form_cell',
        //parentFormClass: '.order_block',
        //promptPosition: "centerRight",
        //doNotShowAllErrosOnSubmit: true,
        //focusFirstField          : false,
        autoPositionUpdate: true,
        //prettySelect             : true,
        validationEventTrigger: 'submit',
        //useSuffix                : "_VE_field",
        addPromptClass: 'relative_mode single_msg_mode',
        showOneMessage: false
    });

    $(".maskMe").inputmask();

    $(".maskMePostfix").inputmask();
    

  // send email on submit form
    $("#callback_form form").submit(function(e) {
        e.preventDefault();
        var form = $(this);
        if(!form.find('.error').size()) {
            $.ajax({
                url: "send.php?callback",
                dataType: "json",
                type: "POST",
                data: form.serialize()
            }).done(function(data){
                if(data.success) {
                    $callback_form.dialog('close');
                    $callback_complete_form.dialog('open');
                } else {
                    // error
                }
                form[0].reset();
            });
        }
    });    
    $(".order_form form").submit(function(e) {
        e.preventDefault();
        var form = $(this);
        if(!form.find('.error').size()) {
            $.ajax({
                url: "send.php?order_form",
                dataType: "json",
                type: "POST",
                data: form.serialize()
            }).done(function(data){
                if(data.success) {
                    $callback_complete_form.dialog('open');
                } else {
                    // error
                }
                form[0].reset();
            });
        }
    });    
    $("#agent_form form").submit(function(e) {
        e.preventDefault();
        var form = $(this);
        if(!form.find('.error').size()) {
            $.ajax({
                url: "send.php?agent_form",
                dataType: "json",
                type: "POST",
                data: form.serialize()
            }).done(function(data){
                if(data.success) {
                    $order_form.dialog('close');
                    $callback_complete_form.dialog('open');
                } else {
                    // error
                }
                form[0].reset();
            });
        }
    });   

});

$(window).on("backstretch.after", function (e, instance, index) {
    instance.$container.css('minHeight', instance.$img[0].clientHeight);
}).on('scroll', function () {
    $header.toggleClass('header_fixed', !!$doc.scrollTop());
}).load(function () {

    // s = skrollr.init({forceHeight: false});

});
function formInit() {

    if ($("#agent_form").length) {

        $order_form = $("#agent_form").dialog({
            autoOpen: false,
            resizable: false,
            modal: false,
            closeOnEscape: true,
            closeText: '',
            show: "fade",
            appendTo: '.dialog_viewport',
            position: {my: "center center", at: "center center", of: window},
            draggable: false,
            dialogClass: 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1 title_center_mod dialog_butt_v1',
            width: 940,
            open: function (event, ui) {
                $html.addClass('dialog_regular_open');
                    $('.dialog_viewport.ui-widget-overlay').animate({
                        scrollTop: $('#news_form').parent().position().top},
                    'slow');
                $(".main_content").stopScroll();
            },
            close: function (event, ui) {
                $html.removeClass('dialog_regular_open');
                $(".main_content").resumeScroll();
            }
        });

        $('.agentFormOpen').on('click', function () {
            $order_form.dialog('open');

            return false;
        });
    }

    if ($("#auth_form").length) {

        $auth_form = $("#auth_form").dialog({
            autoOpen: false,
            resizable: false,
            modal: false,
            closeOnEscape: true,
            closeText: '',
            show: "fade",
            appendTo: '.dialog_viewport',
            position: {my: "center center", at: "center center", of: window},
            draggable: true,
            dialogClass: 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1 title_center_mod dialog_butt_v1',
            width: 510,
            open: function (event, ui) {
                $html.addClass('dialog_regular_open');
            },
            close: function (event, ui) {
                $html.removeClass('dialog_regular_open');
            }
        });

        $('.authFormOpen').on('click', function () {
            $auth_form.dialog('open');

            return false;
        });
    }

    if ($("#restore_complete_form").length) {

        $restore_complete_form = $("#restore_complete_form").dialog({
            autoOpen: false,
            resizable: false,
            modal: false,
            closeOnEscape: true,
            closeText: '',
            show: "fade",
            appendTo: '.dialog_viewport',
            position: {my: "center center", at: "center center", of: window},
            draggable: true,
            dialogClass: 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1 title_center_mod dialog_butt_v1',
            width: 510,
            open: function (event, ui) {
                $html.addClass('dialog_regular_open');
            },
            close: function (event, ui) {
                $html.removeClass('dialog_regular_open');
            }
        });

        $('.restoreCompliteFormOpen').on('click', function () {
            $restore_complete_form.dialog('open');

            return false;
        });
    }

    if ($("#restore_form").length) {

        $restore_form = $("#restore_form").dialog({
            autoOpen: false,
            resizable: false,
            modal: false,
            closeOnEscape: true,
            closeText: '',
            show: "fade",
            appendTo: '.dialog_viewport',
            position: {my: "center center", at: "center center", of: window},
            draggable: true,
            dialogClass: 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1 title_center_mod dialog_butt_v1',
            width: 510,
            open: function (event, ui) {
                $html.addClass('dialog_regular_open');
            },
            close: function (event, ui) {
                $html.removeClass('dialog_regular_open');
            }
        });

        $('.restoreFormOpen').on('click', function () {
            $restore_form.dialog('open');

            return false;
        });
    }

    if ($("#callback_form").length) {

        $callback_form = $("#callback_form").dialog({
            autoOpen: false,
            resizable: false,
            modal: false,
            closeOnEscape: true,
            closeText: '',
            show: "fade",
            appendTo: '.dialog_viewport',
            position: {my: "center center", at: "center center", of: window},
            draggable: true,
            dialogClass: 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1 title_center_mod dialog_butt_v1',
            width: 510,
            open: function (event, ui) {
                $html.addClass('dialog_regular_open');
            },
            close: function (event, ui) {
                $html.removeClass('dialog_regular_open');
            }
        });

        $('.openCallBackForm').on('click', function () {
            $callback_form.dialog('open');

            return false;
        });
    }

    if ($("#callback_complete_form").length) {

        $callback_complete_form = $("#callback_complete_form").dialog({
            autoOpen: false,
            resizable: false,
            modal: false,
            closeOnEscape: true,
            closeText: '',
            show: "fade",
            appendTo: '.dialog_viewport',
            position: {my: "center center", at: "center center", of: window},
            draggable: true,
            dialogClass: 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1 title_center_mod dialog_butt_v1',
            width: 510,
            open: function (event, ui) {
                $html.addClass('dialog_regular_open');
            },
            close: function (event, ui) {
                $html.removeClass('dialog_regular_open');
            }
        });

        $('.openCallBackCompleteForm').on('click', function () {
            $callback_complete_form.dialog('open');


            return false;
        });
    }
     if ($("#callback_no_user").length) {

        $callback_no_user = $("#callback_no_user").dialog({
            autoOpen: false,
            resizable: false,
            modal: false,
            closeOnEscape: true,
            closeText: '',
            show: "fade",
            appendTo: '.dialog_viewport',
            position: {my: "center center", at: "center center", of: window},
            draggable: true,
            dialogClass: 'dialog_global dialog_g_size_1 dialog_close_butt_mod_1 title_center_mod dialog_butt_v1',
            width: 510,
            open: function (event, ui) {
                $html.addClass('dialog_regular_open');
            },
            close: function (event, ui) {
                $html.removeClass('dialog_regular_open');
            }
        });

        $('.openCallBackNoUserForm').on('click', function () {
            $auth_form.dialog('close');
            $callback_no_user.dialog('open');

            return false;
        });
    }

    if ($("#news_form").length) {

        $news_form = $("#news_form").dialog({
            autoOpen: false,
            resizable: false,
            modal: false,
            closeOnEscape: true,
            closeText: '',
            show: "fade",
            appendTo: '.dialog_viewport',
            position: {my: "center center", at: "center center", of: window},
            draggable: false,
            dialogClass: 'dialog_global dialog_g_size_2 dialog_close_butt_mod_1 title_center_mod dialog_butt_v1',
            width: 940,
            open: function (event, ui) {
                $html.addClass('dialog_regular_open');
                    $('.dialog_viewport.ui-widget-overlay').animate({
                        scrollTop: $('#news_form').parent().position().top},
                    'slow');
                $(".main_content").stopScroll();
            },
            close: function (event, ui) {
                $html.removeClass('dialog_regular_open');
                $(".main_content").resumeScroll();
            }
        });

        $('.openNewsPopup').on('click', function () {
            $news_form.dialog('open');
            return false;
        });
    }

    all_dialog_close();
}

function all_dialog_close() {
    $html.on('click', '.ui-widget-overlay', function (e) {
        if ($(e.target).hasClass('ui-widget-overlay')) all_dialog_close_gl();
    });
}

function all_dialog_close_gl() {
    $(".ui-dialog-content").each(function () {
        var $this = $(this);
        if (!$this.parent().hasClass('always_open')) {
            $this.dialog("close");
        }
    });
}



function toggleLandMenu() {
    $html.toggleClass('show_land_switcher');

    $('.landMenu').slideToggle(300);
}

function toggleAsideMenu() {
    $html.toggleClass('open_aside_menu');
}

function numFormat(num) {
    return num.toString().replace(/(?!^)(?=(\d{3})+(?=\.|$))/gm, ' ');
}

function plural(n, str1, str2, str5) {
    return numFormat(n) + ' ' + ((((n % 10) == 1) && ((n % 100) != 11)) ? (str1) : (((((n % 10) >= 2) && ((n % 10) <= 4)) && (((n % 100) < 10) || ((n % 100) >= 20))) ? (str2) : (str5)))
}


function pluralN(n) {
    return ((((n % 10) == 1) && ((n % 100) != 11)) ? 0 : (((((n % 10) >= 2) && ((n % 10) <= 4)) && (((n % 100) < 10) || ((n % 100) >= 20))) ? 1 : 2));
}





