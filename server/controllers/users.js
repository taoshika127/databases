var { db, User, Message } = require('../../orm-resources/orm-example');

module.exports = {
  get: (req, res) => {
    User.sync()
      .then(()=> {
        User.findAll()
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
    User.sync()
      .then(() => {
        User.create(req.body)
          .then(() => {
            User.findAll()
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