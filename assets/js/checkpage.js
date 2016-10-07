///////////////////////////////////////////////////////////////////////////
// Определение страницы
///////////////////////////////////////////////////////////////////////////
var myPage = {
  Home: function() {
    return $('body').hasClass('home') ? true : false;
  },
  InnerAny: function() {
    return $('body').hasClass('inner') ? true : false;
  },
  InnerText: function() {
    return $('body').hasClass('inner-text') ? true : false;
  },
  InnerAbout: function() {
    return $('body').hasClass('inner-about') ? true : false;
  },
  InnerContacts: function() {
    return $('body').hasClass('inner-contacts') ? true : false;
  },
  InnerUsluga: function() {
    return $('body').hasClass('inner-usluga') ? true : false;
  },
};
