// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function() {
  $(".change-devoured").on("click", function(event) {
    event.preventDefault();
    var id = $(this).data("id");
    console.log(id);
    var notDevoured = $(this).attr("notDevoured");

    if(notDevoured === "true") {

      // Send the DELETE request.
      $.ajax("/api/burger/" + id, {
      type: "DELETE"
      }).then(
      function() {
      console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    }
    );

    }
    else {
      var newDinnerState = {
        devoured: 1
      };
    // Send the PUT request.
    $.ajax("/api/burger/" + id, {
      type: "PUT",
      data: newDinnerState
    }).then(
      function() {
        console.log("changed devour to", newDinnerState.notDevoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );

    }
    
 
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#createBurger").val().trim(),
      devoured: $("[name=devoured]").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burger", {
      type: "POST",
      data: newBurger
    }).then(
      function(res) {
        console.log("created new burger", res);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});