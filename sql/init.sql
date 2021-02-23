create table `User` (
  id int not null primary key auto_increment,
  nickName varchar(20),
  email varchar(100) not null unique,
  password varchar(255) not null,
  trialed boolean not null default 0, -- 是否试用过付费模式
  premiumEndTime timestamp,
  createAt timestamp not null default current_timestamp
)

create table `Preference` (
  id int not null primary key auto_increment,
  email varchar(100) not null unique,
  members text
)

create table `Book` (
  id int not null primary key auto_increment,
  email varchar(100) not null unique,
  name varchar(100),
  budget float
)

create table `Record` (
  id int not null primary key auto_increment,
  email varchar(100) not null unique,
  book varchar(100),
  type char(10),
  category char(10),
  cost float(2),
  date timestamp,
  member varchar(100),
  remark text
)
