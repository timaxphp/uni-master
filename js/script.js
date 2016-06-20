$(function ($) {
    var order_sum_toddler = document.getElementById('order_sum_toddler'),
        order_sum = document.getElementById('order_sum'),
        order_period_toddler = document.getElementById('order_period_toddler'),
        order_period = document.getElementById('order_period');


    noUiSlider.create(order_sum_toddler, {
        start: [20000000],
        range: {
            'min': [5000],
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

    var e = 'keyup,focus,blur,change'.split(',');
    for (var i in e) $(inp).on(e[i], function (e) {
        tdlr.noUiSlider.set([(inp.value).replace(/\D/ig, '')]);
    });
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
