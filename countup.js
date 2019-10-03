/*
    ████████████████████████████████████████████████████████████████████████████████████████████████████
    * Application: countup v0.0.0.1
    * https://gunessahin.github.io/
    ════════════════════════════════════════════════════════════════════════════════════════════════════
    * Copyright gunessahin@outlook.com.tr
    * Licence (https://github.com/gunessahin)
    ████████████████████████████████████████████████████████████████████████████████████████████████████
*/

(function () {

  /**
   * Number.prototype.format(n, x)
   * 
   * @param integer n: length of decimal
   * @param integer x: length of sections
   */
  Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
  }

  // Element gorundugunde
  function gorundugunde(element, event) {

    var listener = new ScrollListener(element, function () {
      calistir(element)
    })

    if (listener['on' + event.toLowerCase()])
      return listener['on' + event.toLowerCase()].call()
  }

  // tum sayaclar
  var sayaclar = document.querySelectorAll('.sayac')

  // toplam ozellik uzunlugu
  var toplamOzellik = sayaclar.length

  // Data özellikleri aranıyor
  for (var index = 0; index < toplamOzellik; index++) {

    // her ozelligin html elementi
    var element = sayaclar[index]

    // element ekranda görüntülendiğinde işlem yap
    gorundugunde(element, 'visible')

    // Tüm nesler görünüyor ise, çalıştırır.
    calistir(element)
  }

  // Sayacı başlatır
  function calistir(element) {

    // Default özellikler
    var baslangic = 0
    var bitis = 1
    var adim = 1
    var hiz = 1
    var bicim = 'false'
    var textBefore = ''
    var textAfter = ''

    // Data özellikleri alındı
    baslangic = element.attributes.getNamedItem('data-baslangic') === null ? baslangic : parseInt(element.attributes.getNamedItem('data-baslangic').value)
    bitis = element.attributes.getNamedItem('data-bitis') === null ? bitis : parseInt(element.attributes.getNamedItem('data-bitis').value)
    adim = element.attributes.getNamedItem('data-adim') === null ? adim : parseInt(element.attributes.getNamedItem('data-adim').value)
    hiz = element.attributes.getNamedItem('data-hiz') === null ? hiz : parseInt(element.attributes.getNamedItem('data-hiz').value)
    bicim = element.attributes.getNamedItem('data-bicim') === null ? bicim : element.attributes.getNamedItem('data-bicim').value
    textBefore = element.attributes.getNamedItem('data-text-before') === null ? textBefore : element.attributes.getNamedItem('data-text-before').value
    textAfter = element.attributes.getNamedItem('data-text-after') === null ? textAfter : element.attributes.getNamedItem('data-text-after').value

    // İşlemleri başlat
    yazdir(baslangic, bitis, adim, hiz, bicim, textBefore, textAfter, element)
  }

  // İşlemleri Başlatır
  function yazdir(baslangic, bitis, adim, hiz, bicim, textBefore, textAfter, element) {

    // Başlangıç indexi
    var index = baslangic

    // Sayaıcı yukarı doğru yönlendirir
    function sayici() {
      var number = index
      if (index <= bitis) {
        number = bicim == 'true' ? index.format() : index
        number = textBefore + number + textAfter
        ekranayaz(number)
        setTimeout(sayici, hiz)
        index += adim
      }
    }

    // Ekrana parametreyi yazar
    function ekranayaz(parametre) {
      element.innerHTML = parametre

    }

    // Bekleme süresi
    setTimeout(sayici, hiz)
  }
})()