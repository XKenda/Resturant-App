-- migrate:up

CREATE TYPE user_roles AS ENUM (
    "Customer", 
    "Recepionist",
    "Waiter",
    "Chef",
    "Manager",
    "CEO"
)


CREATE TABLE users (
    id SERIAL NOT NULL,
    profilePictureURL VARCHAR(255),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT false,
    age NUMERIC DEFAULT 18,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(100) UNIQUE,
    user_roles NOT Null DEFAULT 'Customer'
);

-- migrate:down

DROP TABLE users;

