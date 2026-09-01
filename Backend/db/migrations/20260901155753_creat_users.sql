-- migrate:up

CREATE TABLE users (
    id SERIAL NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age NUMERIC DEFAULT 18,
    password VARCHAR(100) NOT NULL
);

-- migrate:down

DROP TABLE users;

