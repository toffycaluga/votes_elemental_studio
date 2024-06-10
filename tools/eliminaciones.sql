-- Eliminar registros de las tablas sin dependencias primero
DELETE FROM option_counters;
DELETE FROM vote_user;
DELETE FROM funcionarios;

-- Eliminar registros de las tablas que son referenciadas por otras tablas
DELETE FROM project_options;
DELETE FROM project_type;
DELETE FROM mesas;
DELETE FROM sedes;
DELETE FROM users;
DELETE FROM contribuyentes;
