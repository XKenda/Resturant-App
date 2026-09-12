-- migrate:up

CREATE TABLE tokens (
    id SERIAL NOT NULL,
    token VARCHAR(244) NOT NULL UNIQUE,
    endDate TIMESTAMP NOT NULL
);

-- migrate:down

DROP TABLE tokens;