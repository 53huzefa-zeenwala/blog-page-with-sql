use blog;
create table user (
id Int Not null auto_increment,
username varchar(45) not null,
email varchar(255) not null,
password varchar(255) not null,
image varchar(255),
primary key (id)
);

Alter table user
rename users;

create table posts (
id int not null auto_increment,
title varchar(255) not null,
description varchar(1000) not null,
image varchar(255) not null,
date datetime not null,
user_id int not null,
primary key (id),
foreign key (user_id) references users(id) on update cascade on delete cascade
);

insert into users (username, email, password)
values ('huzefa', 'email', 'password');

select * from users
join posts on users.id = posts.user_id;
select * from posts Where category = 'art' And id != 4;

insert into posts (title, description, image, date, user_id, category)
values ('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, ut?', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ab mollitia fuga! Atque ad dignissimos repellendus est laborum incidunt tempora provident qui!'
, 'https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
, "2007-05-08 12:35:29.123", 3, 'art');

delete from posts
where id = 2;

alter table users
add unique (username), 
add unique (email);

Alter table posts
Add column category varchar(45) not null;