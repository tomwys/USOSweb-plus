$(function(){
  function enableWikispaces() {
    var h2 = $('h2')
    if(h2) {
      if(h2[0].innerHTML == 'Informacje o pracowniku') {
        var h1 = $('h1')[0];
        var name = h1.childNodes[2].nodeValue.split(' ');
        var url = 'http://mimuw.wikispaces.com/' + name[2] + ', ' + name[0];
        $(h2[0].parentNode).append('<br><a href="' +
          url + '">Przejdź do wikispaces</a><iframe style="width: 100%; height: 500px;" src="'+url+'"></iframe>');
      }
    }
  }
    
  enableWikispaces();
});