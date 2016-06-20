  window.RESPONSIVE_FALLBACK = 600;

  $(document).ready(function(){
    var ar=new Array(33,34,35,36,37,38,39,40);

    $(document).keydown(function(e) {
         var key = e.which;
          //console.log(key);
          //if(key==35 || key == 36 || key == 37 || key == 39)
          if($.inArray(key,ar) > -1) {
              e.preventDefault();
              return false;
          }
          return true;
    });
    var hash = window.location.hash;
    $("#navigation a[href='" + hash  + "']").parent().addClass('active');
    $(".main_content").onepage_scroll({
      sectionContainer: "section",
      animationTime: 800,
      responsiveFallback: window.RESPONSIVE_FALLBACK,
      easing: "ease",
      loop: false,
      updateURL: true,
      beforeMove: function(index) {
        if (index > 1) {
          $('.header').addClass('header_fixed');
        }
      },
      afterMove: function(index) {
        $('#navigation li.active').each(function(index) {
          $(this).removeClass('active');
        });
        $("#navigation a[href='#" + index + "']").parent().addClass('active');
        if (index > 1) {
          $('.header').addClass('header_fixed');
        } else {
          $('.header_fixed').removeClass('header_fixed');
        }
      }
    });
});
