(function(jQuery) {
 
   var supported = true;
   if (typeof localStorage == 'undefined' || typeof JSON == 'undefined')
      supported = false;
   else
      var ls = localStorage;
 
   this.setItem = function(key, value, lifetime) {
      if (!supported)
         return false;
 
      if (typeof lifetime == 'undefined')
         lifetime = 60000;
 
      ls.setItem(key, JSON.stringify(value));
      var time = new Date();
      ls.setItem('meta_ct_'+key, time.getTime());
      ls.setItem('meta_lt_'+key, lifetime);
   };
 
   this.getItem = function(key) {
      if (!supported)
         return false;
 
      var time = new Date();
      if (time.getTime() - ls.getItem('meta_ct_'+key) > ls.getItem('meta_lt_'+key)) {
         ls.removeItem(key);
         ls.removeItem('meta_ct_'+key);
         ls.removeItem('meta_lt_'+key);
         return false;
      }
      return JSON.parse(ls.getItem(key));
   };
 
   this.removeItem = function(key) {
      if (!supported)
         return false;
 
      ls.removeItem(key);
      ls.removeItem('meta_ct_'+key);
      ls.removeItem('meta_lt_'+key);
      return true;
   };
 
   jQuery.localStorage = this;
 
})(jQuery);
