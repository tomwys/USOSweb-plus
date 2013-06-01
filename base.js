$(function(){
function enableStudentPhotos() {
  var rows = $('table.wrnav tr td a.wrgrey');
  var personRegexp = new RegExp("pokazOsobe\\(os_id:([0-9]*)\\)");
  for(var i = 0; i < rows.length; i++) {
    var match = personRegexp.exec(rows[i].href);
    if(match) {
      var id = match[1];
      var row = rows[i].parentNode.parentNode;
      $(row.childNodes[row.childNodes.length - 2]).append(
        '<a href="/kontroler.php?_action=actionx:katalog2/osoby/pokazOsobe(os_id:'+id+')">'+
          '<img id="stud'+id+'" style="height: 40px;" />'+
        '</a>'
      );
      var remover = function(id) {
        func = function() {
          $('#stud'+id).remove();
        }
        return func;
      }			
      $('#stud'+id).error(remover(id));
      $('#stud'+id).attr("src",'/kontroler.php?_action=actionx:dodatki/zdj_do_legitymacji/pokazZdjecie(os_id:'+id+')');
    }
  }
}

enableStudentPhotos();
});