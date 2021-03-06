//////////////////////////////////////////////////////////////////////////////////
// Инициализация Яндекс карты
//////////////////////////////////////////////////////////////////////////////////
function initYmap() {

  var myMap = new ymaps.Map('map', {
    center: [55.753994, 37.622093],
    zoom: 9,
    controls: ['zoomControl']
  }, {
    autoFitToViewport: 'always'
  });
  myMap.behaviors.disable('scrollZoom');

  var addr = $('#map').attr('data-address');

  // Поиск координат значения полученного из addr
  ymaps.geocode(
      addr, {
        results: 1
      }
    )
    .then(function(res) {
      // Выбираем первый результат геокодирования.
      var firstGeoObject = res.geoObjects.get(0),
        // Координаты геообъекта.
        coords = firstGeoObject.geometry.getCoordinates(),
        // Область видимости геообъекта.
        bounds = firstGeoObject.properties.get('boundedBy');

      // Добавляем первый найденный геообъект на карту.
      myMap.geoObjects.add(firstGeoObject);
      // Масштабируем карту на область видимости геообъекта.
      myMap.setBounds(bounds);
      // Задаем масштаб
      myMap.setZoom(13);
      // Создаем метку со своими параметрами в той же точке
      var myPlacemark = new ymaps.Placemark(coords, {
        balloonContent: '<b>' + firstGeoObject.properties.get("name") + '</b>' + '<br/>' + '<br/>' + firstGeoObject.properties.get("description"),
      }, {
        iconLayout: 'default#image',
        iconImageHref: '/baloon.png',
        iconImageSize: [45, 63],
        iconImageOffset: [-22.5, -70]
      });
      // Удаляем старубю метку
      myMap.geoObjects.remove(firstGeoObject);
      // Добавляем нашу кастомную метку
      myMap.geoObjects.add(myPlacemark);
    });
}
