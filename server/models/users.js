var db = require('../db');

module.exports = {
  getAll: function (callback) {
    db.connect.query('SELECT * FROM users', [], (err, results) => {
      if (err) {
        callback(err);
      } else {
        console.log('getAll: results', results);
        callback(null, results);
      }
    });
  },
  create: function ({username}, callback) {
    var query = `INSERT INTO users ( username ) VALUES ( '${username}' )`;
    db.connect.query(query, [], (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }
};