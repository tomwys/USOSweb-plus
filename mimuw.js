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
  
  /*
  Podglad punktow ze sprawdzianow na glownej (Moim Usoswebie)
  W localstorage zapisuje poprzednio sprawdzona sume, jezeli sie rozni
  to wyswietla roznice
  
  By pyetras
  */
  function lookupTests(){
    var url_exp = "https://usosweb.mimuw.edu.pl/kontroler.php?_action=actionx:dla_stud/studia/sprawdziany/pokaz(wez_id:"
    var alrdy_checked = [];
    $('a[href^='+url_exp+']').each(function(i){
      var url = $(this).attr('href');
     
      if (alrdy_checked[url]){
        return;
      }else{
        alrdy_checked[url] = true;
      }
      
      var link = this;
      $.get(url, function(data){
        var re = /wez_id:(\d+)/;
        var id = re.exec(url)[1];
        var wynik = 0.0;
        var nullCount = 0;
        
        var rec_find = function(table){
          $(table).each(function(i){
            if ($($(this).find('td')[1]).text().search('ocena') != -1)
              return;
              
            var pkt_txt = $($(this).find('td')[2]).text();
            pkt = parseFloat(pkt_txt.replace('pkt', ''));
            if (!isNaN(pkt)){
              wynik += pkt;
            }else{
              nullCount++;
              //nie ma punktu, sprawdzam poddrzewo
              rec_find($(this).next('div[id^=childrenof]').children('table'));
            }
          });
        }
        
        rec_find($('div#childrenof'+id+' > table', data));
        $(link).after(' <span class="note">' + wynik + ' pkt</span> ');
        var data;

        if (!(data = $.localStorage.getItem(id))){
          data = [0, 0];
        }else{
          data = [parseFloat(data[0]), parseInt([data[1]])];
        }
        if (data[0] != wynik || data[1] != nullCount){
          var dif = wynik - data[0];
          $(link).next().append(' (' + ((dif >= 0)?'+':'') + dif +')');
          $(link).next().css('font-weight', 'bold');
          $.localStorage.setItem(id, [wynik, nullCount]);
        }
        
      });
    });
  }
  
  enableWikispaces();
  lookupTests();
});