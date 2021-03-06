//////////////////////////////////////////////////////////////////////////////////
// Импорт
//////////////////////////////////////////////////////////////////////////////////
function _import(src) {
  var scriptElem = document.createElement('script');
  scriptElem.setAttribute('src', src);
  scriptElem.setAttribute('type', 'text/javascript');
  document.getElementsByTagName('head')[0].appendChild(scriptElem);
}

function _importNoCache(src) {
  var ms = new Date().getTime().toString();
  var seed = "?" + ms;
  _import(src + seed);
}


//////////////////////////////////////////////////////////////////////////////////
// RESPONSIVE TABLE
//////////////////////////////////////////////////////////////////////////////////
function tableResize(cols_gen) {
  var cols = cols_gen - 1;
  var isChange = false;

  $('.withscroll').each(function() {
    $('tr', this).each(function(e) {
      var flag = true;
      $('td, th', this).each(function(e) {
        if (e > cols) {
          isChange = true;
          if (flag) {
            $(this).parent().parent().append('<tr></tr>');
            flag = false;
          }

          var clone = $(this).clone();

          $(this).parent().parent().find('tr').eq(-1).append(clone);
          $(this).remove();
        }
      });
    });
  });
  if (isChange) {
    tableResize(cols_gen);
  }
}

function colWidthMiddle() {
  var i = 1;
  var w = 0;
  var sum = 0;
  $('.withscroll td').each(function() {
    w += $(this).outerWidth();
    i++;
  });
  sum = w / i;
  return sum;
}

//////////////////////////////////////////////////////////////////////////////////
// Считает (и устанавливает) высоту основного блока
//////////////////////////////////////////////////////////////////////////////////
function contentResize() {
  var ww = 0;
  ww = $(window).width();
  var wh = 0;
  wh = $(window).height();
  var hh = 0;
  hh = $('.header-wrp').height();
  var fh = 0;
  fh = $('.footer-wrp').height();

  $('.main-content').height(wh - hh - fh);
}
//////////////////////////////////////////////////////////////////////////////////
// Считает (и устанавивает) внутренние отступы
//////////////////////////////////////////////////////////////////////////////////
function countPadding() {
  $('.main-slider-general > .swiper-wrapper > .swiper-slide').each(function() {
    var sh = 0;
    sh = $(this).height();
    var dh = 0;
    dh = $('.padding-wrp > div, .padding-wrp > ol', this).height();
    var p = 0;

    if (sh < dh) {
      $('.padding-wrp', this).css({
        'padding': '20px 5%'
      });
    } else {
      p = (sh - dh) / 2 + 'px ';
      $('.padding-wrp', this).css({
        'padding': p + '5%'
      });
    }
  });
}
//////////////////////////////////////////////////////////////////////////////////
// Контакты
//////////////////////////////////////////////////////////////////////////////////
function ContactsPage() {
  var m_h = $('.main-content').height();
  $('.right-column').height(m_h);
  $('.slider-inner').height(m_h);
}
//////////////////////////////////////////////////////////////////////////////////
// Инициализация слайдера на внутренних страницах
//////////////////////////////////////////////////////////////////////////////////
function innerSliderInit() {
  var params = {};

  var wh = 0;
  wh = $(window).height();
  var ww = 0;
  ww = $(window).width();
  var min_wh = 1000; // minimal window height
  var min_ww = 1024; // minimal window width

  var sense = 1;

  /*if ( wh < min_wh || ww <  min_ww )
  {*/
  if (myBrowser.Firefox()) {
    sense = 20;
  }

  params = {
    direction: 'vertical',
    slidesPerView: 'auto',
    mousewheelControl: true,
    scrollbar: '.slider-inner .swiper-scrollbar',
    freeMode: true,
    scrollbarHide: false,
    mousewheelSensitivity: sense
  };

  swiper = new Swiper('.slider-inner', params);
  /*}*/
}

//////////////////////////////////////////////////////////////////////////////////
// Показ/сокрытие навигационного меню в хэдере
//////////////////////////////////////////////////////////////////////////////////
function headerMenuBtn() {
  $('.header__menu-btn').bind('click', function() {
    $('.header__menu').toggleClass('active');
  });
}
//////////////////////////////////////////////////////////////////////////////////
function activeCallLink() {
  $('.dropup__phones a,.dropup__main-phone a').bind("click", function() {
    return false;
  });
}
//////////////////////////////////////////////////////////////////////////////////
function showMap() {
  var btn = $('.inner-contacts .left-column > span');
  var l_col = $('.inner-contacts .left-column');
  var r_col = $('.inner-contacts .right-column');

  var w_w = 0;
  w_w = $(window).width();

  var l_h = 0;
  l_h = $(l_col).height();

  var l_w = 0;
  l_w = $(l_col).width();

  var r_w = 0;
  r_w = $(r_col).width();

  var sl_h = 0;
  sl_h = $('.slider-inner .swiper-slide').height(); // slider heigth

  if (w_w < 980) {

    $('.inner-contacts .left-column > span').show();
  }

  btn.bind('click', function() {
    if ($(this).hasClass('closed')) {
      $(this).removeClass('closed');
      $('> *', l_col).not('span').animate({
        'opacity': '1'
      }, 1000);
      l_col.animate({
        'width': l_w,
        'height': l_h,
        'padding': (sl_h - l_h) / 2 + ' 5%'
      }, 500);
      r_col.animate({
        'width': r_w
      }, 500);
    } else {
      $(this).addClass('closed');
      $('> *', l_col).not('span').animate({
        'opacity': '0'
      }, 200);
      l_col.animate({
        'width': '0%',
        'height': l_h,
        'padding': '0'
      }, 500);
      r_col.animate({
        'width': '100%'
      }, 500);
    }
  });
}
//////////////////////////////////////////////////////////////////////////////////
function chooseLang(lang, page) {
  var el = $('.lang__el');

  el.each(function() {
    if ($(this).attr('data-lang') == lang) {
      $(this).addClass('active');
    }
  });

  var el_act = $('.lang__el.active');

  el_act.bind('click', function() {
    return false;
  });

  el.bind('click', function() {
    el.removeClass('active');
    $(this).addClass('active');
    window.location.href = '/' + $(this).attr('data-lang') + '/' + page;
  });
}
//////////////////////////////////////////////////////////////////////////////////
function checkLang(path) {
  var lang = '';
  var page = '';
  var path_arr = path.split('/');

  lang = (path_arr[1] == 'en') ? 'en' : 'ru';

  if (path_arr[1] == 'ru' || path_arr[1] == 'en') {
    page = (path_arr[2]) ? path_arr[2] + '/' : '';
  } else {
    page = (path_arr[1]) ? path_arr[1] + '/' : '';
  }

  chooseLang(lang, page);
}
//////////////////////////////////////////////////////////////////////////////////
// HEADER PHONES FUNCTION
//////////////////////////////////////////////////////////////////////////////////
function footerDropupPhones() {
  var c = $('.footer__dropup');
  var f = $('.dropup__main-phone', c);
  var a = $('.arr', f);

  $(a).bind('click', function() {
    var summ = $('.dropup__phones > li').length - 1;

    if ($(a).hasClass('open')) {
      $('.dropup__phones > li').each(function(i) {
        $(this).stop(true, true).delay((i++) * 300).fadeOut(300);
      });
      $(a).removeClass('open');
    } else {
      $('.dropup__phones > li').each(function(i) {
        $(this).stop(true, true).delay((summ--) * 150).fadeIn(300);
      });
      $(a).addClass('open');
    }

    //click on another element
    $(document).bind("click.arr", function(e) {
      if ($(e.target).closest(c).length) {
        e.stopPropagation();
      } else {
        $('.dropup__phones > li').each(function(i) {
          $(this).stop(true, true).delay((i++) * 300).fadeOut(300);
        });
        $(a).removeClass('open');
        $(document).unbind("click.arr");
      }
    });
    return false;
  });
}

function changeLogo() {
  var lang = '';
  var path_arr = window.location.pathname.split('/');
  var ww = 0;
  ww = $(window).width();

  lang = (path_arr[1] == 'en') ? '_en' : '';

  if (ww < 1366) {
    $('.header__logo').css({
      'background-image': 'url(' + '/img/logo1366.jpg' + ')'
    });
  }
}
//////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
  changeLogo();
  //-------------------------------------//
  checkLang(window.location.pathname);
  //-------------------------------------//
  footerDropupPhones();
  //-------------------------------------//
  // WebFont.load({
  //   custom: {
  //     families: ['DINPro'],
  //   }
  // });
  //-------------------------------------//
  headerMenuBtn();
  //-------------------------------------//
  if (!isMobile.any()) {
    //-------------------------------------//
    _importNoCache('/js/browser.js');
    //-------------------------------------//
  } else {
    //-------------------------------------//
    _importNoCache('/js/mobile.js');
    //-------------------------------------//
  }
})
