CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT unsigned NOT NULL AUTO_INCREMENT,
  username VARCHAR(150) NOT NULL,
  roomname VARCHAR(150) NOT NULL,
  text VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)

);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  id INT unsigned NOT NULL AUTO_INCREMENT,
  username VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

