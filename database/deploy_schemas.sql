-- Deploy fresh database tables
\i '/docker-entrypoint-initdb.d/schemas/users.sql'
\i '/docker-entrypoint-initdb.d/schemas/login.sql'

-- Deploy mock users
\i '/docker-entrypoint-initdb.d/mocks/seed.sql'
