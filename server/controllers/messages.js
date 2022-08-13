
var { db, User, Message } = require('../../orm-resources/orm-example');

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
    console.log('sequelize post - messages', req.body);
    Message.sync()
      .then(() => {
        Message.create(req.body)
          .then(() => {
            Message.findAll()
              .then((messages) => {
                res.statusCode = 201;
                //console.log('messages', messages);
                res.send(JSON.stringify(messages));
              })
              .catch(err => {
                console.error(err);
              });
          });
      });
  }
};
