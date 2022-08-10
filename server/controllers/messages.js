var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.messages.getAll((err, results) => {
      if (err) {
        throw err;
      } else {
        res.send(results);
      }
    });
  }, // a function which handles a get request for all messages
  post: function (req, res) {
    models.messages.create(req.body, (err, results) => {
      if (err) {
        throw err;
      } else {
        res.send(results);
      }
    });
  } // a function which handles posting a message to the database
};
