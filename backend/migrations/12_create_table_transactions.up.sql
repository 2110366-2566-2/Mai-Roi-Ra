CREATE TABLE transactions (
    transaction_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    user_id VARCHAR(36) NOT NULL,
    transaction_amount DECIMAL(10, 2),
    transaction_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(16) NOT NULL CHECK (status IN ('Completed', 'Pending', 'Canceled')),
    PRIMARY KEY (transaction_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);