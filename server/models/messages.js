var db = require('../db');

module.exports = {
  getAll: function (callback) {
    db.connect.query('SELECT * FROM messages', [], (err, results) => {
      if (err) {
        callback(err);
      } else {
        console.log('getAll: results', results);
        callback(null, results);
      }
    });
  },
  create: function ({username, roomname, text}, callback) {
    var query = `INSERT INTO messages ( username, roomname, text) VALUES ( '${username}', '${roomname}', '${text}' )`;
    db.connect.query(query, [], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, {username, roomname, text});
      }
    });
  }
};
