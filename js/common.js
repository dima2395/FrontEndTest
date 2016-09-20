;(function($) {

  $(document).ready(function() {
    

    $.getJSON('../json/posts.json', function(posts) { // get json object 

      for(var i = 0; i < posts.length; i++) {
        var key = 'post_' + i;
        localStorage.setItem(key, posts[i]); // add posts to localStorage
      }

    }); // end getJSON



  });


})(jQuery);