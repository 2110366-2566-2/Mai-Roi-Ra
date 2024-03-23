CREATE TABLE IF NOT EXISTS otp (
    user_id VARCHAR(36) NOT NULL,
    otp VARCHAR(6),
    otp_expires_at TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);