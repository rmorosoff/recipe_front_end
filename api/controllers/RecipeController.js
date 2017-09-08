/**
 * recipesController
 *
 * @description :: Server-side logic for managing recipes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "https://pure-waters-78967.herokuapp.com/api/recipes";

module.exports = {

  /**
   * `recipesController.create()`
   */
  create: function(req, res) {

    if (req.method != "POST") {
<<<<<<< HEAD
      return res.view('create');
=======
        return res.view('create');
>>>>>>> master
    }

    var args = {
      data: req.body,
      headers: {
        "Content-Type": "application/json"
      }
    };

    client.post(endpoint, args, function(data, response) {
      // return res.view('create', {success: { message: "Record added successfully"}});
<<<<<<< HEAD
      if (response.statusCode != "201") {
=======
      if (response.statusCode != "200") {
>>>>>>> master
        req.addFlash("error", data.message.substring(data.message.indexOf("•")));
        return res.redirect('/create');
      }

      req.addFlash("success", "Record created successfully");
      return res.redirect('/create');

    })

  },


  /**
   * `recipesController.read()`
   */
  read: function(req, res) {

    client.get(endpoint, function(data, response) {
      return res.view('read', {
        recipes: data
      });
    }).on('error', function(err) {
      return res.view('read', {
        error: {
          message: "There was an error getting the recipes"
        }
      });
    });

  },

  /**
   * `recipesController.show()`
   */
  show: function(req, res) {

    client.get(endpoint + "/" + req.params.id, function(data, response) {
      if (data.instructions) {
        data.instructions.sort(function(a, b){
          return a.id - b.id;
        })
      }
      if (data.ingredients) {
        data.ingredients.sort(function(a, b){
          return a.id - b.id;
        })
      }
      return res.view('show', {
        recipe: data
      });
    }).on('error', function(err) {
      return res.view('show', {
        error: {
          message: "There was an error getting the recipe"
        }
      });
    });

  },

  passiveread: function(req, res) {

    client.get(endpoint + "/" + req.params.id, function(data, response) {
      return res.send(data);
    }).on('error', function(err) {
      return res.send({
        error: {
          message: "There was an error getting the recipe"
        }
      });
    });

  },


  /**
   * `recipesController.update()`
   */
  update: function(req, res) {

    if (req.method != "POST") {

      client.get(endpoint, function(data, response) {
        return res.view('update', {
          recipes: data
        });
      }).on('error', function(err) {
        return res.view('update', {
          error: {
            message: "There was an error getting the recipes"
          }
        });
      });

    } else {

      var args = {
        data: req.body,
        headers: {
          "Content-Type": "application/json"
        }
      };

      client.put(endpoint + "/" + req.body.id, args, function(data, response) {

        if (response.statusCode != "200") {
          req.addFlash("error", data.message);
          return res.redirect('/update');
        }

        req.addFlash("success", "Record updated successfully");
        return res.redirect('/update');

      })

    }
  },

  /**
   * `recipesController.delete()`
   */
  delete: function(req, res) {

    if (req.method != "POST") {

      client.get(endpoint, function(data, response) {
        return res.view('delete', {
          recipes: data
        });
      }).on('error', function(err) {
        return res.view('delete', {
          error: {
            message: "There was an error getting the recipes"
          }
        });
      });

    } else {

      client.delete(endpoint + "/" + req.body.recipe_id, function(data, response) {

        if (response.statusCode != "200") {
          req.addFlash("error", data.message);
          return res.redirect('/delete');
        }

        req.addFlash("success", "Record deleted successfully");
        return res.redirect('/delete');

      })
    }

  }

};
