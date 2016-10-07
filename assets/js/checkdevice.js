///////////////////////////////////////////////////////////////////////////
// Определение мобильного устройства
///////////////////////////////////////////////////////////////////////////
var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};
///////////////////////////////////////////////////////////////////////////
// Определение браузера
///////////////////////////////////////////////////////////////////////////
var myBrowser = {
  IE: function() {
    return navigator.userAgent.search(/MSIE/) > 0 ? true : false;
  },
  Yandex: function() {
    if (navigator.vendor) {
      return navigator.vendor.match(/Yandex/i) ? true : false;
    }
  },
  Opera: function() {
    if (navigator.vendor) {
      return navigator.vendor.match(/Opera/i) ? true : false;
    }
  },
  Chrome: function() {
    if (navigator.vendor) {
      return navigator.vendor.match(/Google/i) ? true : false;
    }
  },
  Firefox: function() {
    if (navigator.oscpu) {
      return navigator.oscpu ? true : false;
    }
  },
  Safari: function() {
    if (navigator.vendor) {
      return navigator.vendor.match(/Apple/i) ? true : false;
    }
  },
};
