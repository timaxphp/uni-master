var $html, $header, $doc, $browserWindow, $order_form, $restore_form, $auth_form, $restore_complete_form, $callback_form, $callback_complete_form;

$(function ($) {
    var order_sum_toddler = document.getElementById('order_sum_toddler'),
        order_sum = document.getElementById('order_sum'),
        order_period_toddler = document.getElementById('order_period_toddler'),
        order_period = document.getElementById('order_period');


    noUiSlider.create(order_sum_toddler, {
        start: [20000000],
        range: {
            'min': [1],
            'max': [40000000]
        }
    });

    order_sum_toddler.noUiSlider.on('update', function (values, handle) {
        //order_sum.value = plural(Math.round(values[handle]), 'рубль', 'рубля', 'рублей');

        //order_sum.value = Math.round(values[handle]);

        updateInput(order_sum, Math.round(values[handle]));

    });

    noUiSlider.create(order_period_toddler, {
        start: [10],
        range: {
            'min': [1],
            'max': [24]
        }
    });

    order_period_toddler.noUiSlider.on('update', function (values, handle) {
        updateInput(order_period, Math.round(values[handle]));

        //order_period.value = Math.round(values[handle]);

        //order_period.value = plural(Math.round(values[handle]), 'месяц', 'месяца', 'месяцев');

    });

    updateToddler(order_period, order_period_toddler);

    updateToddler(order_sum, order_sum_toddler);

    $(".digitsOnly_").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
                // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }


    }).keyup(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
                // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }

        var val = (this.value).replace(/\D/ig, ''), selStart = this.selectionStart, plurArr = $(this).attr('data-plural').split(','), plurInd = pluralN(val);

        this.value = numFormat(val) + ' ' + plurArr[plurInd];

        this.selectionStart = selStart - plurArr[plurInd].length;
        this.selectionEnd = selStart - plurArr[plurInd].length;

    });

    var clientsReviewSlider = $('.clientsReviewSlider').slick({
        //infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        //fade: true,
        asNavFor: '.clientsReviewAuthors'
    });

    var clientsReviewAuthors = $('.clientsReviewAuthors').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        arrows: false,
        //infinite: true,
        asNavFor: '.clientsReviewSlider',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                }
            }]
    });


    $html = $('html');
    $header = $('.header');
    $doc = $(document);
    $browserWindow = $(window);

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

    $('.landSwitcher').on ('click', function () {
        toggleLandMenu();
        return false;
    });

    $('.openAsideMenu').on ('click', function () {
        toggleAsideMenu();
        return false;
    });

    $('.sectionBS').each(function (ind) {
        var section = $(this), img = section.find('.imgBS');

        section.backstretch(img.attr('src'));
    });

    $('.uBlock').plaxify({"xRange": 100, "yRange": 0, "invert": true});
    $.plax.enable(
        //{"activityTarget": $('.wrapper')}
    );

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
            },
            close: function (event, ui) {
                $html.removeClass('dialog_regular_open');
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
        autoHidePrompt: true,
        autoHideDelay: 2000,
        autoPositionUpdate: true,
        //prettySelect             : true,
        //useSuffix                : "_VE_field",
        addPromptClass: 'relative_mode single_msg_mode',
        showOneMessage: false
    });

    $(".maskMe").inputmask();

    $(".maskMePostfix").inputmask(
        //'decimal', {
        //    groupSeparator: ' ',
        //    digitsOptional: true,
        //    autoGroup: true,
        //    rightAlign: false,
        //    onBeforeWrite: function (event, buffer, caretPos, opts) {
        //        console.log(opts);
        //    
        //    
        //    },
        //postFormat: function (event, buffer, caretPos, opts) {
        //    console.log(buffer);
        //    //return processedValue;
        //
        //    return 10;
        //}

        //}
    );

    var agentOrgINN = $('#agent_org_inn');

    $('.agentEntity').on ('change', function () {
        var firedEl = $(this);

        if (firedEl.prop('checked')) {
            agentOrgINN
                .attr('data-inputmask', '"mask": "9", "repeat": "12"')
                .attr('class', agentOrgINN.attr('class').replace(/custom\[inn10\]/ig, 'custom[inn12]'));
        } else {
            agentOrgINN
                .attr('data-inputmask', '"mask": "9", "repeat": "10"')
                .attr('class', agentOrgINN.attr('class').replace(/custom\[inn12\]/ig, 'custom[inn10]'));
        }

        agentOrgINN.inputmask();

        if (agentOrgINN.val()) agentOrgINN.validationEngine('validate');

    });


    all_dialog_close();
});

function updateInput(inp, val) {

    var plurInd = pluralN(val), newVal = numFormat(val), plurArr = inp.dataset.plural.split(',');

    //console.log(plurArr[plurInd].length);

    inp.value = newVal + ' ' + plurArr[plurInd];

    //inp.value = numFormat(val) + ' ' + plurArr[plurInd];

    //inp.value = plural(Math.round(val), str1, str2, str3);

    inp.selectionStart = newVal.length;
    inp.selectionEnd = newVal.length;
}

function updateToddler(inp, tdlr) {

    $(inp).on('keydown', function (e) {
        //console.log('keydown', this.value, (inp.value).replace(/\D/ig, ''));
        //
        //if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        //        // Allow: Ctrl+A
        //    (e.keyCode == 65 && e.ctrlKey === true) ||
        //        // Allow: Ctrl+C
        //    (e.keyCode == 67 && e.ctrlKey === true) ||
        //        // Allow: Ctrl+X
        //    (e.keyCode == 88 && e.ctrlKey === true) ||
        //        // Allow: home, end, left, right
        //    (e.keyCode >= 35 && e.keyCode <= 39)) {
        //    // let it happen, don't do anything
        //    return;
        //}
        //// Ensure that it is a number and stop the keypress
        //if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        //    e.preventDefault();
        //}
        //
        //tdlr.noUiSlider.set([(inp.value).replace(/\D/ig, '')]);
    });

    var e = 'keyup,focus,blur,change'.split(',');
    for (var i in e) $(inp).on(e[i], function (e) {
        tdlr.noUiSlider.set([(inp.value).replace(/\D/ig, '')]);
    });
}

$(window).on("backstretch.after", function (e, instance, index) {
    instance.$container.css('minHeight', instance.$img[0].clientHeight);
}).on('scroll', function () {
    $header.toggleClass('header_fixed', !!$doc.scrollTop());
});


function all_dialog_close() {
    $html.on('click', '.ui-widget-overlay', all_dialog_close_gl);
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