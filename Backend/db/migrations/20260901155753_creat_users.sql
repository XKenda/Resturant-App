-- migrate:up

CREATE TABLE users (
    id SERIAL NOT NULL,
    profilePictureURL VARCHAR(255),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    emailVerified BOOLEAN DEFAULT false,
    age NUMERIC DEFAULT 18,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(100) UNIQUE
);

-- migrate:down

DROP TABLE users;

