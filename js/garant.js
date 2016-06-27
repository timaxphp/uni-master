var MIN_ORDER_SUM = 20000000;
var MIN_PERIOD = 1;
$(function ($) {
    var order_sum_toddler = document.getElementById('order_sum_toddler'),
        order_sum = document.getElementById('order_sum'),
        order_period_toddler = document.getElementById('order_period_toddler'),
        order_period = document.getElementById('order_period');


    noUiSlider.create(order_sum_toddler, {
        start: [5000],
        range: {
            'min': [5000],
            '1%': [20000000],
            'max': [200000000]
        }
    });

    order_sum_toddler.noUiSlider.on('update', function (values, handle) {
        //order_sum.value = plural(Math.round(values[handle]), 'рубль', 'рубля', 'рублей');

        //order_sum.value = Math.round(values[handle]);
        updateInput(order_sum, Math.floor(values[handle]));

    });

    noUiSlider.create(order_period_toddler, {
        start: [1],
        range: {
            'min': [1],
            '1%': [1],
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

    all_dialog_close();
});

function getMinValue(inp) {
    if (jQuery(inp).is('#order_sum')) {
        return MIN_ORDER_SUM;
    } else if (jQuery(inp).is('#order_period')) {
        return MIN_PERIOD;
    }
}

function updateInput(inp, val) {
    var plurInd = pluralN(val), newVal = numFormat(val), plurArr = inp.dataset.plural.split(','), minValue = getMinValue(inp);

    //console.log(plurArr[plurInd].length);

    var old_selection_start = inp.selectionStart;
    var old_selection_end = inp.selectionEnd;

    if (val < minValue) {
        if (jQuery(inp).is('#order_sum')) {
            inp.value = newVal + " рублей";
        } else if (jQuery(inp).is('#order_period')){
            inp.value = newVal + "";
        }
    } else {
        inp.value = newVal + ' ' + plurArr[plurInd];
    }

    //inp.value = numFormat(val) + ' ' + plurArr[plurInd];

    //inp.value = plural(Math.round(val), str1, str2, str3);

    inp.selectionStart = old_selection_start;
    inp.selectionEnd = old_selection_end;
}

function updateToddler(inp, tdlr) {

    var e = 'keyup,change'.split(',');
    for (var i in e) $(inp).on(e[i], function (e) {
        if (e.type == "keyup") {
            if (e.keyCode == 37) {
                inp.selectionStart = inp.selectionStart-1;
                inp.selectionEnd = inp.selectionStart;
                return true;
            } else if (e.keyCode == 39) {
                inp.selectionStart = inp.selectionStart+1;
                inp.selectionEnd = inp.selectionStart;
                return true;
            }
        }
        if ((inp.value).replace(/\D/ig, ''))
            tdlr.noUiSlider.set([parseInt((inp.value).replace(/\D/ig, ''))]);
        else
            inp.value = "";
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
