CREATE DATABASE 2018MobileContent;

USE 2018MobileContent;

CREATE TABLE user(
  username VARCHAR(100) NOT NULL ,
  schoolName VARCHAR(150) NOT NULL,
  schoolNumber VARCHAR(20) NOT NULL ,
  birthday VARCHAR(20) NOT NULL ,
  password VARCHAR(200) NOT NULL ,
  usertoken VARCHAR(250) NOT NULL
)DEFAULT CHARSET=utf8;

CREATE TABLE photobook(
  name VARCHAR(200) NOT NULL ,
  photo VARCHAR(200) NOT NULL ,
  count INT(11) NOT NULL ,
  summary VARCHAR(250) NOT NULL ,
  since VARCHAR(20) NOT NULL ,
  booktoken VARCHAR(250) NOT NULL,
  usertoken VARCHAR(250) NOT NULL
)DEFAULT CHARSET=utf8;

CREATE TABLE photo(
  booktoken VARCHAR(250) NOT NULL ,
  summary VARCHAR(250) NOT NULL ,
  photo VARCHAR(250) NOT NULL
)DEFAULT CHARSET=utf8;