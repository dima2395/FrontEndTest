

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

    $.getJSON('../json/posts.json', function(posts) {
      localStorage.setItem('posts', JSON.stringify(posts)); // add posts to localStorage
    });

    printPosts('posts'); 

    $('#posts').on('click', '.btn-delete', function(e) { // delete elements from localStorage and from html on event click
      var $this = $(this),
          postIdToDelete = $this.parent().parent().data('postId'), // get post id from article data attribute(data-post-id)
          posts = JSON.parse(localStorage.getItem('posts'));

      for(var i = 0; i < posts.length; i++) {
        if(postIdToDelete == posts[i]['id']) {
          posts.splice(i, 1);
          localStorage.setItem('posts', JSON.stringify(posts));
          $this.parent().parent().remove();
        }
      }
    });

  });


