
var { db, User, Message } = require('../../orm-resources/orm-example');

// module.exports = {
//   get: function (req, res) {
//     models.messages.getAll((err, results) => {
//       if (err) {
//         throw err;
//       } else {
//         res.statusCode = 200;
//         res.send(JSON.stringify(results));
//       }
//     });
//   }, // a function which handles a get request for all messages
//   post: function (req, res) {
//     console.log(req.body);
//     models.messages.create(req.body, (err, results) => {
//       if (err) {
//         throw err;
//       } else {
//         res.statusCode = 201;
//         res.send(JSON.stringify(results));
//       }
//     });
//   } // a function which handles posting a message to the database
// };

module.exports = {
  get: (req, res) => {
    Message.sync()
      .then(()=> {
        Message.findAll()
          .then((messages) => {
            res.statusCode = 200;
            res.send(JSON.stringify(messages));
          })
          .catch(err => {
            console.error(err);
          });
      });

  },

  post: (req, res) => {
    Message.sync()
      .then(() => {
        Message.create(req.body)
          .then(() => {
            Message.findAll()
              .then((messages) => {
                res.statusCode = 201;
                console.log('messages', messages);
                res.send(JSON.stringify(messages));
              })
              .catch(err => {
                console.error(err);
              });
          });
      });
  }
};
