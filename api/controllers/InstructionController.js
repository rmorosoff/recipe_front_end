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
  create: function (req, res) {

        if(req.method != "POST"){
          return client.get(endpoint + "/" + req.params.id, function (data, response) {
              res.view('create_instruction', {recipe: data});
          })
        }

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };

        client.post(endpoint + "/" + req.params.id + "/instructions", args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "200"){
                req.addFlash("error", data.message.substring(data.message.indexOf("•")));
                return res.redirect(`/${req.params.id}/instructions/create`);
            }

            req.addFlash("success", "Record created successfully");
            return res.redirect(`/${req.params.id}/instructions/create`);

        })

  },


  /**
   * `recipesController.read()`
   */
  read: function (req, res) {

    client.get(endpoint, function (data, response) {
        return res.view('read', {recipes: data});
    }).on('error', function (err) {
        return res.view('read', {error: { message: "There was an error getting the recipes"}});
    });

  },


   /**
   * `recipesController.update()`
   */
  update: function (req, res) {

    if(req.method != "POST"){

      client.get(endpoint, function (data, response) {
        return res.view('update_instruction', {recipes: data});
      }).on('error', function (err) {
          return res.view('update_instruction', {error: { message: "There was an error getting the recipes"}});
      });

    }else{

      var args = {
          data: req.body,
          headers: { "Content-Type": "application/json" }
      };

      client.put(endpoint + "/" + req.body.id, args, function (data, response) {

        if(response.statusCode != "200"){
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
  delete: function (req, res) {

    if(req.method != "POST"){

      client.get(endpoint, function (data, response) {
        return res.view('delete_instruction', {recipes: data});
      }).on('error', function (err) {
          return res.view('delete_instruction', {error: { message: "There was an error getting the recipes"}});
      });

    }else{

      client.delete(endpoint + "/" + req.body.recipe_id + "/instructions/" + req.body.instruction_id, function (data, response) {

        if(response.statusCode != "200"){
            req.addFlash("error", data.message);
            return res.redirect('/{id}/instructions/delete');
        }

        req.addFlash("success", "Record deleted successfully");
        return res.redirect('/{id}/instructions/delete');

      })
    }

  }

};
