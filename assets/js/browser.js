//////////////////////////////////////////////////////////////////////////////////
// Перезагрузка страницы при ресайзе
//////////////////////////////////////////////////////////////////////////////////
var flag_resize = 1;

function checkFlagResize() {
  if (!flag_resize) {
    if (window.location.hash) {
      window.location.href = '/';
    } else {
      window.location.href = window.location.href;
    }
  } else {

    var col_w = colWidthMiddle();
    var cols = Math.floor($('.type-text').width() / (col_w * 1.3));

    tableResize(cols);
  }
  flag_resize = 0;
}
//////////////////////////////////////////////////////////////////////////////////
// Инициализация слайдера партнеров
//////////////////////////////////////////////////////////////////////////////////
function sliderPartners(page) {
  var ww = $(window).width();
  var slds = 3;

  if (ww < 980) {
    slds = 2;
  }
  if (ww < 480) {
    slds = 1;
  }

  if (myBrowser.IE()) {
    var params = {
      speed: 1500,
      mode: 'horizontal',
      loop: true,
      slidesPerView: slds,
      slidesPerGroup: slds,
    }

    var swiper = $('.' + page + '-slider-partners').swiper(params);

    $('.' + page + '-slider-partners-wrp .swiper-button-prev').click(function(e) {
      swiper.swipePrev()
    });
    $('.' + page + '-slider-partners-wrp .swiper-button-next').click(function(e) {
      swiper.swipeNext()
    });
  } else {
    var params = {
      spaceBetween: 30,
      slidesPerView: slds,
      slidesPerGroup: slds,
      nextButton: '.' + page + '-slider-partners-wrp .swiper-button-next',
      prevButton: '.' + page + '-slider-partners-wrp .swiper-button-prev',
    };
    var swiper = new Swiper('.' + page + '-slider-partners', params);
  }

}
//////////////////////////////////////////////////////////////////////////////////
// Инициализация основного слайдера на главной странице
//////////////////////////////////////////////////////////////////////////////////
function generalSliderInit() {
  var wh = 0;
  wh = $(window).height();
  var ww = 0;
  ww = $(window).width();
  var min_wh = 700; // minimal window height
  var min_ww = 1024; // minimal window width
  var num_sl = 4; // number of slides
  var sense = 1;
  var params = {};
  if (wh >= min_wh && ww >= min_ww) {
    $('.main-slider-general .swiper-scrollbar').hide();
    $('.main-slider-general .swiper-pagination').show();
    params = {
      speed: 500,
      direction: 'vertical',
      slidesPerView: 1,
      mousewheelControl: true,
      pagination: '.main-slider-general .swiper-pagination',
      scrollbar: null,
      paginationClickable: true,
      keyboardControl: true,
      freeMode: false,
      hashnav: true,
      nextButton: '.slide-intro__body > h1 > a',
      paginationBulletRender: function(index, className) {
        var sep = (index + 1 == num_sl) ? sep = "" : sep = "/";
        return '<span class="' + className + '">' + (index + 1) + '</span>' + sep;
      },
    };

  } else {
    if (myBrowser.Firefox()) {
      sense = 15;
    }
    $('.main-slider-general .swiper-pagination').hide();
    $('.main-slider-general .swiper-scrollbar').show();
    params = {
      speed: 500,
      direction: 'vertical',
      slidesPerView: 'auto',
      mousewheelControl: true,
      pagination: null,
      scrollbar: '.main-slider-general .swiper-scrollbar',
      paginationClickable: false,
      freeMode: true,
      scrollbarHide: false,
      mousewheelSensitivity: sense
    };
  }
  swiper = new Swiper('.main-slider-general', params);
}
//////////////////////////////////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////////////////
function scroller() {
  $('.footer__scroller').bind('click', function() {
    if (swiper) {
      swiper.slideTo(0, 500);
    } else {
      $("html,body").animate({
        "scrollTop": 0
      }, 1000);
    }
    /*
    if ( myBrowser.IE() )
    {
        $("html,body").animate({"scrollTop":0},1000);
    }
    else
    {
        swiper.slideTo(0, 500);
    }*/
  });

}
$(window).resize(function() {

  activeCallLink();

  // checkFlagResize();

  if (myBrowser.IE()) {
    $('.slide-intro__body > h1 > a').remove();
    if (myPage.Home()) {
      sliderPartners('main');
      var h = $('.left-column').outerHeight()
      $('.right-column').height(h);
    }

    if (myPage.InnerContacts()) {
      ymaps.ready(initYmap);
      ContactsPage();
      showMap();
    }
    if (myPage.InnerAbout()) {
      sliderPartners('about');
    }
  } else {
    contentResize();

    if (myPage.Home()) {

      sliderPartners('main');
      countPadding();
      var h = $('.left-column').outerHeight()
      $('.right-column').height(h);
      generalSliderInit();
    }
    if (myPage.InnerContacts()) {
      ContactsPage();
      showMap();
      ymaps.ready(initYmap);
    }
    if (myPage.InnerAny()) {
      innerSliderInit();
    }
    if (myPage.InnerAbout()) {
      sliderPartners('about');
    }
  }
  $('.slide-intro__body > h1 > a').unbind('click');
  $('.slide-intro__body > h1 > a').bind('click', function(e) {
    e.stopPropagation();
    swiper.slideTo(1, 500);
  });
  scroller();
  countPadding();
});

$(document).ready(function() {
  $(window).resize();
});
