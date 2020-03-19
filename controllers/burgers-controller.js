
var connection = require("../config/connection");

//here I will create code that will add burgers to a list and create the devour buttons
//front end development



  module.exports = function(app){

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
  connection.query("INSERT INTO burger (name, devoured) VALUES (?,?)", [req.body.name, req.body.devoured], function(err, result) {
    if (err) {
      return res.status(500).end();
    }
    console.log(req.body.devoured);
    // Send back the ID of the new burger
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// Update a burger
app.put("/api/burger/:id", function(req, res) {
  connection.query("UPDATE burger SET devoured = ? WHERE id = ?", [req.body.devoured, req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      console.log(err)
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





}