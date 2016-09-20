

  $(document).ready(function() {
    
    function printPosts(id) { //print posts from localStorage inside container
      var source   = $("#template-post").html();
      console.log('source:' + source );
      var template = Handlebars.compile(source),
          posts = JSON.parse(localStorage.getItem('posts')),
          wrapper = {objects: posts},
          result = template(wrapper),
          container = document.getElementById(id);
      container.innerHTML = result;

    }

    $.getJSON('../json/posts.json', function(posts) { // get json object 

      localStorage.setItem('posts', JSON.stringify(posts)); // add posts to localStorage

    }); // end getJSON

    printPosts('posts');

  });


