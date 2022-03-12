BEGIN TRANSACTION;

-- User 1
INSERT INTO users (name, user_name, email, entries, joined) VALUES ('Pedro Batista', 'pedro2002', 'pedro2002@gmail.com', 16, '2022-03-11');
INSERT INTO login (hash, user_name, email) VALUES ('$2a$12$Efw450hN6KO7hPD70yov0en.960mc8AGksDBbcSIktcGC.vMowgte
', 'pedro2002', 'pedro2002@gmail.com');

-- User 2
INSERT INTO users (name, user_name, email, entries, joined) VALUES ('Diogo Silva', 'silva1998', 'silva1998@gmail.com', 5, '2022-03-09');
INSERT INTO login (hash, user_name, email) VALUES ('$2a$12$5quplQSf3ZX4NNU04jhILu.zH9OOXLV420D30A9cpahIckC/DUPHe
', 'silva1998', 'silva1998@gmail.com');

COMMIT;
