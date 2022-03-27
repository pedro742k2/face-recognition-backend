BEGIN TRANSACTION;

-- User 1
INSERT INTO users (name, user_name, email, entries, joined) VALUES ('Pedro Batista', 'pedro2002', 'pedro2002@gmail.com', 16, '2022-03-11');

INSERT INTO login (hash, user_name, email) VALUES ('$2a$10$mjGQLh2ESGWQk8x0oVxuT.C/.9wFbfpPCl/KgMndH1ti4i/oLzt2G', 'pedro2002', 'pedro2002@gmail.com');

-- User 2
INSERT INTO users (name, user_name, email, entries, joined) VALUES ('Diogo Silva', 'silva1998', 'silva1998@hotmail.com', 5, '2022-03-09');

INSERT INTO login (hash, user_name, email) VALUES ('$2a$10$MdD2OssbHPgE8DPGBZDpK.ygmyZLAp4AIuwgkq7xR3L6UgMC8EKnW', 'silva1998', 'silva1998@hotmail.com');

COMMIT;
