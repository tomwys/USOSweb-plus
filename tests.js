$(function(){
  /*
  Podglad punktow ze sprawdzianow na glownej (Moim Usoswebie)
  W localstorage zapisuje poprzednio sprawdzona sume, jezeli sie rozni
  to wyswietla roznice
  
  By pyetras
  */
  function lookupTests(){
    var url_exp = "kontroler.php?_action=actionx:dla_stud/studia/sprawdziany/pokaz(wez_id:"
    var alrdy_checked = [];
    $('a[href]').each(function(i){
      if ($(this).attr("href").indexOf(url_exp) == -1) return;
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

        if (!(data = localStorage[id])){
          data = [0, 0];
        }else{
          data = JSON.parse(data);
          data = [parseFloat(data[0]), parseInt([data[1]])];
        }
        if (data[0] != wynik || data[1] != nullCount){
          var dif = wynik - data[0];
          $(link).next().append(' (' + ((dif >= 0)?'+':'') + dif +')');
          $(link).next().css('font-weight', 'bold');
          localStorage[id] = JSON.stringify([wynik, nullCount]);
        }
        
      });
    });
  }
  
  lookupTests();
})