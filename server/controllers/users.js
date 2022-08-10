var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.users.getAll((err, results) => {
      if (err) {
        throw err;
      } else {
        res.send(results);
      }
    });
  },
  post: function (req, res) {
    models.users.create(req.body, (err) => {
      if (err) {
        throw err;
      } else {
        res.send(req.body);
      }
    });
  }
};
