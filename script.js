(function() {
  // Zdjęcia na liście studentów
  var rows = $('table.wrnav tr td a.wrgrey');
  var personRegexp = new RegExp("pokazOsobe\\(os_id:([0-9]*)\\)");
  for(var i = 0; i < rows.length; i++) {
    var match = personRegexp.exec(rows[i].href);
    if(match) {
      var id = match[1];
      var row = rows[i].parentNode.parentNode;
      $(row.childNodes[row.childNodes.length - 2]).append('<img style="height: 40px;" src="https://usosweb.mimuw.edu.pl/kontroler.php?_action=actionx:dodatki/zdj_do_legitymacji/pokazZdjecie(os_id:'+id+')" />');
    }
  }

  // Wikispaces
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
})();
