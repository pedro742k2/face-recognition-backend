-- Deploy fresh database tables
\i '/docker-entrypoint-initdb.d/schemas/users.sql'
\i '/docker-entrypoint-initdb.d/schemas/login.sql'

\i '/docker-entrypoint-initdb.d/mocks/seed.sql'