var leasingSliderBack, leasingSliderBullets, leasingSlider;

$(function ($) {

    leasingSliderBack = $('.leasingSliderBack').slick({
        slidesToScroll: 1,
        //asNavFor: '.leasingSlider',
        speed: 2000,
        dots: false,
        arrows: false,
        rightMode: true,
        variableWidth: true,
        centerMode: false,
        infinite: false
    });

    leasingSliderBullets = $('.leasingSliderBullets').on ('beforeChange', function (event, slick, currentSlide, nextSlide) {
        //console.log(nextSlide, leasingSlider[0].slick);

        leasingSlider[0].slick.slickGoTo(nextSlide);
        leasingSliderBack[0].slick.slickGoTo(nextSlide);

    }).slick({
        slidesToScroll: 1,
        //asNavFor: '.leasingSlider',
        speed: 1000,
        dots: false,
        arrows: false,
        variableWidth: true,
        focusOnSelect: true,
        centerMode: false,
        infinite: false
    });

    leasingSlider = $('.leasingSlider').on ('beforeChange', function (event, slick, currentSlide, nextSlide) {
        leasingSliderBullets[0].slick.slickGoTo(nextSlide);
        leasingSliderBack[0].slick.slickGoTo(nextSlide);
    }).slick({
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        prevArrow: '#leasing_slide_prev',
        nextArrow: '#leasing_slide_next',
        //fade: true,
        infinite: false
    });

});