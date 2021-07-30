create table users
(
id int auto_increment,
username varchar(50) not null primary key,
password varchar(30) not null,
authority varchar(30) not null
);