
var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.users.getAll((err, results) => {
      if (err) {
        throw err;
      } else {
        res.statusCode = 200;
        res.send(JSON.stringify(results));
      }
    });
  },
  post: function (req, res) {
    models.users.create(req.body, (err, results) => {
      if (err) {
        throw err;
      } else {
        res.statusCode = 201;
        res.send(results);
      }
    });
  }
};
