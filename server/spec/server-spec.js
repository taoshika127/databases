/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3001/classes';

const messageTable = 'Messages';
const userTable = 'Users';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chatter'
  });
  // {
  //   user: 'student',
  //   password: 'student',
  //   database: 'chat',
  // }

  beforeAll((done) => {
    dbConnection.connect();

    // TODO: fill this out

    /* Empty the db table before all tests so that multiple tests
     * (or repeated runs of the tests)  will not fail when they should be passing
     * or vice versa */
    dbConnection.query(`truncate ${messageTable}`, done);
    dbConnection.query(`truncate ${userTable}`, done);
  }, 6500);

  afterAll(() => {

    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean';
    const text = 'In mercys name, three days is all I need.';
    const roomname = 'Hello';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        // Post a message to the node chat server:
        return axios.post(`${API_URL}/messages`, { username, roomname, text });
      })
      .then(() => {
        // Now if we look in the database, we should find the posted message there.

        /* TODO: You might have to change this test to get all the data from
         * your message table, since this is schema-dependent. */
        const queryString = 'SELECT * FROM Messages';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            throw err;
          }
          // Should have one result:
          console.log('result', results);
          expect(results.length).toEqual(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).toEqual(text);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should create another user to the Users table', (done) => {
    const username = 'Sam';
    const text = 'Hello, my name is Sam.';
    const roomname = 'Hello';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        // Now if we look in the database, we should find the posted message there.

        /* TODO: You might have to change this test to get all the data from
         * your message table, since this is schema-dependent. */
        const queryString = 'SELECT username FROM Users';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            throw err;
          }
          // Should have two result:
          console.log('user test:', results);
          expect(results.length).toEqual(2);

          // Should equal to 'Sam'
          expect(results[1].username).toEqual(username);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should delete all users from the User table', (done) => {
    const name = 'Sam';
    const queryString = `DELETE FROM Users WHERE username = '${name}'`;
    const queryArgs = [];

    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      axios.get(`${API_URL}/users`)
        .then((response) => {
          const userLog = response.data;
          console.log(userLog);
          expect(userLog.length).toEqual(1);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  it('Should delete all messages from the DB', (done) => {
    const name = 'Valjean';
    const queryString = `DELETE FROM Messages WHERE username = '${name}'`;
    const queryArgs = [];

    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;
          expect(messageLog).toEqual([]);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  it('Should delete all messages from the DB', (done) => {
    const name = 'Valjean';
    const queryString = `DELETE FROM Messages WHERE username = '${name}'`;
    const queryArgs = [];

    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;
          expect(messageLog).toEqual([]);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  it('Should output all messages from the DB', (done) => {

    dbConnection.query(`truncate ${messageTable}`, done);
    // Let's insert a message into the db
    const roomname = 'lobby';
    const text = 'hello';
    const name = 'Sandy';
    const queryString = `INSERT INTO Messages ( username, roomname, text) VALUES ( '${name}', '${roomname}', '${text}' )`;
    const queryArgs = [];
    /* TODO: The exact query string and query args to use here
     * depend on the schema you design, so I'll leave them up to you. */
    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      // Now query the Node chat server and see if it returns the message we just inserted:
      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;
          expect(messageLog[0].text).toEqual(text);
          expect(messageLog[0].roomname).toEqual(roomname);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });


});
