DROP SCHEMA IF EXISTS qldg;
create database qldg;

use qldg;

drop table if exists category;
create table category(
    cid bigint primary key  AUTO_INCREMENT,
    cname varchar(50) COLLATE utf8_general_ci null
);

drop table if exists type;
create table type(
    tid bigint primary key  AUTO_INCREMENT,
    typename varchar(50) COLLATE utf8_general_ci null,
    cid bigint null
);

drop table if exists favorites;
create table favorites
(
    favid  bigint primary key  AUTO_INCREMENT,
    userid bigint not null,
    pid    bigint not null
);

drop table if exists history;
create table history(
    historyid bigint primary key  AUTO_INCREMENT,
    price float null,
    max_price float null,
    record datetime default current_timestamp,
    idbidder bigint null,
    productid bigint null
);

drop table if exists listbuy;
create table listbuy(
    lbid      bigint not null primary key AUTO_INCREMENT,
    bidderid  bigint not null,
    productid bigint not null,
    price     float  null
);

drop table if exists product;
create table product(
    productid     bigint        not null primary key AUTO_INCREMENT ,
    sellerid      bigint        null,
    productname   varchar(100)   COLLATE utf8_general_ci null,
    title         varchar(50)   COLLATE utf8_general_ci null,
    description   varchar(500)  COLLATE utf8_general_ci null,
    type          bigint        null,
    price         float         null,
    step          float         null,
    purchaseprice float         null,
    rating        float         null,
    datepublished datetime      default current_timestamp,
    dateend       datetime      null

);

drop table if exists rating;
create table rating
(
    ratingid bigint       not null primary key AUTO_INCREMENT ,
    userid   bigint       null,
    assessor bigint       null,
    feedback varchar(200)   COLLATE utf8_general_ci null,
    date     datetime default current_timestamp,
    rate     int          null
);

drop table if exists upgrade;
create table upgrade
(
    uid      bigint   not null primary key  AUTO_INCREMENT,
    bidderid bigint   null,
    date     datetime default current_timestamp,
    content  varchar(200) COLLATE utf8_general_ci null
);

drop table if exists user;
create table user
(
    userid      bigint       not null primary key AUTO_INCREMENT,
    fullname    varchar(100)   COLLATE utf8_general_ci null,
    dob         date         null,
    address     varchar(200)   COLLATE utf8_general_ci null,
    gender      bit          null,
    telephone   char(10)     null,
    email       varchar(50)   COLLATE utf8_general_ci null,
    username    varchar(30)   COLLATE utf8_general_ci null,
    password    varchar(100)   COLLATE utf8_general_ci null,
    role        varchar(1)   COLLATE utf8_general_ci,
    active      int          default 1,
    datefounded datetime     default CURRENT_TIMESTAMP
);

ALTER TABLE user ADD FULLTEXT (address, fullname, email);
ALTER TABLE product ADD FULLTEXT (productname, title, description);