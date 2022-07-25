create table users(
    id serial primary key ,
    name varchar(255)not null,
    password varchar(255) not null,
    es_admin boolean,
    email varchar(255) not null
);


create table project_type(
    id varchar(255) not null primary key ,
    name_project varchar(255) not null,
    period_project varchar(255) not null
);

create table project_options(
    id serial primary key ,
    name_option varchar(255) not null,
    project_type_id varchar(255) not null,
    FOREIGN key (project_type_id) references project_type(id)
);


create table option_counters (
    id serial primary key,
    numero_mesa varchar(255) not null,
    cant_votes integer not null,
    project_option_id integer not null,
    foreign key (project_option_id) references project_options(id)
);

create table vote_user(
    id serial primary key ,
    nombre varchar(255) not null,
    direccion varchar(255) not null,
    edad integer not null,
    sede varchar(255) not null,
    periodo integer not null,
    numero_mesa varchar(255) not null,
    rut varchar(255) not null

);