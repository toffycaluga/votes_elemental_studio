CREATE DATABASE votes;



create table users(
    id serial primary key ,
    name varchar(255)not null,
    password varchar(255) not null,
    es_admin boolean,
    email varchar(255) 
);
create table sedes(
    id serial primary key ,
    name varchar(255) not null
);

create table mesas(
    id serial primary key ,
    name varchar(255) not null,
    estado_mesa boolean default null,
    sede_id integer not null,
    foreign key (sede_id) references sedes(id)
);


create table project_type(
    id serial primary key ,
    name varchar(255) not null
);

create table project_options(
    id varchar(255) primary key ,
    name varchar(255) not null,
    sector varchar(255) not null,
    project_type_id integer not null,
    periodo integer not null,
    FOREIGN key (project_type_id) references project_type(id)
);


create table option_counters (
    id serial primary key,
    sede_id integer not null,
    mesa_id varchar(255) not null,
    cant_votes integer not null,
    project_option_id varchar(255) not null,
    foreign key (project_option_id) references project_options(id),
    foreign key (sede_id) references sedes(id)
);

create table vote_user(
    id varchar(255) not null primary key ,
    name varchar(255) not null,
    addres varchar(255) not null,
    birthdate date not null,
    sede_id integer not null,
    periodo integer not null,
    mesa varchar(255) not null,
    rut varchar(255) not null,
    foreign key (sede_id) references sedes(id)
);

create table funcionarios(
    id serial primary key ,
    name varchar(255) not null,
    username varchar(255) not null,
    functions varchar(255) not null,
    password varchar(255) not null,
    sede_id integer ,
    mesa varchar(255),
    periodo integer not null,
    foreign key (sede_id) references sedes(id)
);
