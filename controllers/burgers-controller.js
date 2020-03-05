var express = require("express");
var mysql = require("mysql");

// Import the model (burger.js) to use its database functions.
var burger = require("../js/burger.js");

//here I will create code that will add burgers to a list and create the devour buttons
//front end development


var router = express.Router();

// Create all our routes and set up logic within those routes where required.
// Use Handlebars to render the main index.html page with the plans in it.
app.get("/", function(req, res) {
  connection.query("SELECT * FROM burger;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { burger: data });
  });
});

// Create a new burger
app.post("/api/burger", function(req, res) {
  connection.query("INSERT INTO burger (name) VALUES (?)", [req.body.burger], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new burger
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// Update a burger
app.put("/api/burger/:id", function(req, res) {
  connection.query("UPDATE burger SET name = ? WHERE id = ?", [req.body.burger, req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Delete a plan
app.delete("/api/burger/:id", function(req, res) {
  connection.query("DELETE FROM burger WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

module.exports = router;