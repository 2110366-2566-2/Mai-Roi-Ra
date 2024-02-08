CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS Admins (
    admin_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    password VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY (admin_id)
);

CREATE TABLE IF NOT EXISTS Users (
    user_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    payment_gateway_customer_id VARCHAR(36) NOT NULL,
    phone_number CHAR(10) NOT NULL,
    birth_date DATE,
    email VARCHAR(64) NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    user_image VARCHAR(1024),
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY (user_id),
    CONSTRAINT check_phone_length CHECK (LENGTH(phone_number) = 10)
);

CREATE TABLE IF NOT EXISTS Organizers (
    organizer_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    office_hours TIMESTAMP[] NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY (organizer_id)
);

CREATE TABLE IF NOT EXISTS Moderates (
    user_id VARCHAR(36) NOT NULL,
    organizer_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
    REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_organizer FOREIGN KEY (organizer_id)
    REFERENCES organizers(organizer_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Locations (
    location_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    country VARCHAR(64) NOT NULL,
    city VARCHAR(64) NOT NULL,
    district VARCHAR(64) NOT NULL,
    location_name VARCHAR(64) NOT NULL,
    PRIMARY KEY (location_id)
);

CREATE TABLE IF NOT EXISTS Events (
    event_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Approved', 'Rejected', 'Waiting')),
    participant_fee DOUBLE PRECISION NOT NULL,
    description VARCHAR(1000),
    event_name VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    deadline DATE NOT NULL,
    activities VARCHAR(36) NOT NULL,
    event_image VARCHAR(1024),
    organizer_id VARCHAR(36) NOT NULL,
    admin_id VARCHAR(36) NOT NULL,
    location_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (event_id),
    CONSTRAINT fk_organizer FOREIGN KEY (organizer_id)
    REFERENCES organizers(organizer_id) ON DELETE CASCADE,
    CONSTRAINT fk_admin FOREIGN KEY (admin_id)
    REFERENCES admins(admin_id) ON DELETE CASCADE,
    CONSTRAINT fk_location FOREIGN KEY (location_id)
    REFERENCES locations(location_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Posts (
    post_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    post_image VARCHAR(1024),
    caption VARCHAR(1000),
    rating_score INT NOT NULL CHECK (rating_score BETWEEN 1 AND 5),
    user_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (post_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id)
    REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Responses (
    organizer_id VARCHAR(36) NOT NULL,
    post_id VARCHAR(36) NOT NULL,
    detail VARCHAR(1000),
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT fk_organizer FOREIGN KEY (organizer_id)
    REFERENCES organizers(organizer_id) ON DELETE CASCADE,
    CONSTRAINT fk_post FOREIGN KEY (post_id)
    REFERENCES posts(post_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Reviews (
    user_id VARCHAR(36) NOT NULL,
    event_id VARCHAR(36) NOT NULL,
    post_id VARCHAR(36) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
    REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_post FOREIGN KEY (post_id)
    REFERENCES posts(post_id) ON DELETE CASCADE,
    CONSTRAINT fk_event FOREIGN KEY (event_id)
    REFERENCES events(event_id) ON DELETE CASCADE
);