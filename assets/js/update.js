/**
 * Use the jQuery Validate and the bootstrap-select plugin to enhance this page
 *
 * Here's what this you will need to do:
 *
 * 1. When the page is loaded all form fields should be disabled except
 *    for the dropdown to select a recipe
 *
 * 2. Using the bootstrap-selct plugin render dropdown on the page
 *
 * 3. Use the live search functionality to make the dropdown searchable
 *
 * 4. Add the user glyphicons next to each recipe in the list
 *
 * 6. Add a menu header to the dropdown
 *
 * 7. Customize further with anything you find intersting
 *
 * 8. When an recipe is selected the form fields should be enabled
      and populated with the data for the selected recipe
 *
 * 9. Use jQuery validate and add validation to the form with the following requirements
 *    First Name - required, at least 2 characters
 *    Last Name  - required, at least 2 characters
 *	  start_date - make sure date is yyyy-mm-dd
 *	  ADD any other validation that makes you happy
 *
 * 10. Make the color of the error text red
 *
 *
 *
 * Here's the documentation you need:
 * https://jqueryvalidation.org/validate/
 * https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods
 * https://silviomoreto.github.io/bootstrap-select/
 * https://silviomoreto.github.io/bootstrap-select/examples/
 * http://getbootstrap.com/components/#glyphicons
 * https://api.jquery.com/jQuery.get/
 * http://stackoverflow.com/questions/9807426/use-jquery-to-re-populate-form-with-json-data
 *
 */

(function() {

  $(function() {

    $("#updateRecipeForm").validate({
      errorClass: "text-danger",
      rules: {
        // at least 15€ when bonus material is included
        title: {
          required: true,
          minlength: 2
        },
        description: {
          required: true,
          minlength: 5
        },
        minutes: {
          required: true,
          min: 1
        }

      },
      messages: {
        title: {
          minlength: "Please enter at least 2 characters"
        },
        description: {
          minlength: "Please enter at least 5 characters"
        },
        minutes: {
          min: "Recipe must take at least a minute"
        }
      }
    });


    // initialize global variable to hold URL with recipe_id, to be used for update of form
    let passURL;

    // disable form initially
    $("#updateRecipeForm :input").prop("disabled", true);

    //  when recipe_id changes in dropdown, let's populate form with selected recipe
    $('#recipe_id').on('change', function() {
      // get the selected recipe_id
      var selected = $(this).find("option:selected").val();
      //  set global URL variable, we'll need it later
      passURL = `http://localhost:1338/${selected}/passiveread`;
      // issue a get to the API on the selected recipe_id
      $.get(passURL, function(data) {
        $.each(data, function(name, val) {
          // magic code I stole and think I understand now
          // updates form with oject from get API call
          var $el = $('[name="' + name + '"]'),
            type = $el.attr('type');

          switch (type) {
            case 'checkbox':
              $el.attr('checked', 'checked');
              break;
            case 'radio':
              $el.filter('[value="' + val + '"]').attr('checked', 'checked');
              break;
            default:
              $el.val(val);
          }
        });
      })
      // now we can enable form
      $("#updateRecipeForm :input").prop("disabled", false);
    });

    //  No longer needed as I fixed the code to leverage form submit built into the framework
    //  On Click event will respond to click on button in form
    // $("#updaterecipeForm").on("submit", function() {
    //   var confirmAnswer = confirm("Are you sure you want to update this recipe?");
    //   if (confirmAnswer) {
    //     $.ajax({
    //       url: passURL, // this is global URL variable we set when Update button was clicked
    //       type: 'PUT',
    //       data: $("#updaterecipeForm").serialize()
    //     });
    //   }
    // })

  })

})();
