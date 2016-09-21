

  $(document).ready(function() {
    
    function printPosts(id) { //print posts from localStorage inside container with id = id
      var source   = $("#template-post").html(),
          template = Handlebars.compile(source),
          posts = JSON.parse(localStorage.getItem('posts')),
          wrapper = {objects: posts},
          result = template(wrapper),
          container = document.getElementById(id);
      container.innerHTML = result;
    }


    if(localStorage.getItem('posts') === null) {
      $.getJSON('../json/posts.json', function(posts) {
        localStorage.setItem('posts', JSON.stringify(posts)); // add posts to localStorage
        printPosts('posts');
      });
    } else {
      printPosts('posts');
    }
    


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



    $.validator.addMethod( //additional method for jquery Validator plugin
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            console.log("REGEXP: " + re + " Value: " + value + " Test: " + re.test(value));
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );


    var $form = $('#post-add');
    $form.validate({ // validating form
      rules: {
        title: {
          required: true,
          rangelength: [2, 50],
          regex: "^([а-яА-ЯâăîșțÂĂÎȘȚa-zA-Z]+[\\s,]?[\\s,]?)+$",
        },
        body: {
          required: true,
          rangelength: [2, 100],
          regex: "^([а-яА-ЯâăîșțÂĂÎȘȚa-zA-Z]+[\\s,]?[\\s,]?)+$",
        },
        tags: {
          required: true,
          regex: "^([а-яА-ЯâăîșțÂĂÎȘȚa-zA-Z\\s]+[\\s]?,?)+$",
        }
      },
      messages: {
        title: {
          required: "Пожалуйста введите заголовок <b>на русском или румынском языке</b>",
          rangelength: "Заголовок должен содержать от 2 до 50 символов",
          regex: "Пожалуйста введите заголовок <b>на русском или румынском языке</b>",
        },
        body: {
          required: "Пожалуйста введите запись <b>на русском или румынском языке</b>",
          rangelength: "Запись должна содержать от 2 до 100 символов",
          regex: "Пожалуйста введите запись <b>на русском или румынском языке</b>",
        },
        tags: {
          required: "Пожалуйста введите теги <b>на русском или румынском языке</b> через запятую",
          regex: "Не соответствет шаблону [тег, тег, тег] либо теги <b>не на русском или румынском языке</b> ",
        }
      }
    });


    $form.submit(function(e){
      if($form.valid()) { // valid is jquery Validator plugin's method
        var title = $('input[name="title"]', $form).val(),
            body = $('input[name="body"]', $form).val(),
            tags = $('input[name="tags"]', $form).val(),
            result = {
              "id": "",
              "title": "",
              "body": "",
              "tags": [],
            };

        // preparing values for adding to localStorage
        title = title.trim().toLowerCase();
        result['title'] = title.charAt(0).toUpperCase() + title.slice(1) + '.';

        body = body.trim().toLowerCase();
        result['body'] = body.charAt(0).toUpperCase() + body.slice(1) + '.';

        tags = tags.trim().toLowerCase();
        if(tags.charAt(tags.length-1) == ',') { //check and remove last comma
          tags = tags.slice(0, -1);
          result['tags'] = tags.split(',');
        } else {
          result['tags'] = tags.split(',');
        }

        posts = JSON.parse(localStorage.getItem('posts'));
        result['id'] = posts[posts.length-1]['id'] + 1; //takes last post's id and increment it

        posts.push(result);
        localStorage.setItem('posts', JSON.stringify(posts));
        printPosts('posts');

      }
    })

  }); //function ready end
