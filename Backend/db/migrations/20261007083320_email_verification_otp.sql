-- migrate:up

CREATE TABLE emailVerificationOTP (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    email VARCHAR NOT Null,
    otp_hash VARCHAR(65) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);


-- migrate:down

DROP TABLE emailVerificationOTP