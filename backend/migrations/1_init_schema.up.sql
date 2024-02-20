CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS admins (
    admin_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    password VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (admin_id)
);

CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) UNIQUE NOT NULL,
    phone_number CHAR(10) UNIQUE,
    email VARCHAR(64) UNIQUE,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    password VARCHAR(1024) NOT NULL,
    is_enable_notification BOOLEAN NOT NULL DEFAULT FALSE,
    payment_gateway_customer_id CHAR(10) NOT NULL,
    birth_date DATE NOT NULL,
    user_image VARCHAR(1024) NOT NULL,
    address VARCHAR(255) NOT NULL,
    district VARCHAR(64) NOT NULL,
    province VARCHAR(64) NOT NULL,
    banner_image VARCHAR(1024) NOT NULL,
    token VARCHAR(1024) DEFAULT '' NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (user_id)
);

CREATE INDEX users_token_index ON users (token);

CREATE TABLE IF NOT EXISTS organizers (
    organizer_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    user_id VARCHAR(36) NOT NULL,
    start_office_hours TIMESTAMP,
    end_office_hours TIMESTAMP,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (organizer_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS moderates (
    user_id VARCHAR(36) NOT NULL,
    organizer_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_organizer FOREIGN KEY (organizer_id) REFERENCES organizers(organizer_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS locations (
    location_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    country VARCHAR(64) NOT NULL,
    city VARCHAR(64) NOT NULL,
    district VARCHAR(64) NOT NULL,
    location_name VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (location_id)
);

DO $$ BEGIN -- CREATE TYPE activity_type AS ENUM ('Entertainment', 'Meditation', 'Exercise', 'Cooking', 'Volunteer');
IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'activity_type'
) THEN CREATE TYPE activity_type AS ENUM (
    'Entertainment',
    'Meditation',
    'Exercise',
    'Cooking',
    'Volunteer'
);
END IF;
END $$;

CREATE TABLE IF NOT EXISTS events (
    event_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    organizer_id VARCHAR(36) NOT NULL,
    admin_id VARCHAR(36) NOT NULL,
    location_id VARCHAR(36) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Approved', 'Rejected', 'Waiting')),
    participant_fee DOUBLE PRECISION NOT NULL,
    participant_count INT NOT NULL DEFAULT 0,
    description VARCHAR(1000),
    event_name VARCHAR(64) NOT NULL,
    deadline DATE NOT NULL,
    activities activity_type NOT NULL,
    event_image VARCHAR(1024),
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (event_id),
    CONSTRAINT fk_organizer FOREIGN KEY (organizer_id) REFERENCES organizers(organizer_id) ON DELETE CASCADE,
    CONSTRAINT fk_admin FOREIGN KEY (admin_id) REFERENCES admins(admin_id) ON DELETE CASCADE,
    CONSTRAINT fk_location FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS posts (
    post_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    user_id VARCHAR(36) NOT NULL,
    post_image VARCHAR(1024),
    caption VARCHAR(1000),
    rating_score INT NOT NULL CHECK (rating_score BETWEEN 1 AND 5),
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (post_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS responses (
    organizer_id VARCHAR(36) NOT NULL,
    post_id VARCHAR(36) NOT NULL,
    detail VARCHAR(1000),
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT fk_organizer FOREIGN KEY (organizer_id) REFERENCES organizers(organizer_id) ON DELETE CASCADE,
    CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
    user_id VARCHAR(36) NOT NULL,
    event_id VARCHAR(36) NOT NULL,
    post_id VARCHAR(36) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
);