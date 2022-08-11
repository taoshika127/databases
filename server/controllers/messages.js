var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.messages.getAll((err, results) => {
      if (err) {
        throw err;
      } else {
        res.statusCode = 200;
        res.send(JSON.stringify(results));
      }
    });
  }, // a function which handles a get request for all messages
  post: function (req, res) {
    models.messages.create(req.body, (err) => {
      if (err) {
        throw err;
      } else {
        res.statusCode = 201;
        res.send(req.body);
      }
    });
  } // a function which handles posting a message to the database
};
