BEGIN TRANSACTION;

CREATE TABLE login (
  id serial PRIMARY KEY,
  user_name VARCHAR(255) UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  hash VARCHAR(255) NOT NULL
);

COMMIT;