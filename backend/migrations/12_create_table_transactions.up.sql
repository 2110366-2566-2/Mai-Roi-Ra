DO $$ BEGIN -- CREATE TYPE activity_type AS ENUM ('Entertainment', 'Meditation', 'Exercise', 'Cooking', 'Volunteer');
IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'payment_way'
) THEN CREATE TYPE payment_way AS ENUM (
    'Transferred',
    'Received'
);
END IF;
END $$;


CREATE TABLE IF NOT EXISTS transactions (
    transaction_id VARCHAR(27) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    event_id VARCHAR(36) NOT NULL,
    transaction_amount DECIMAL(10, 2),
    transaction_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(16) NOT NULL CHECK (status IN ('Completed', 'Pending', 'Cancelled')),
    transaction_way payment_way NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (transaction_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS refunds (
    refund_id VARCHAR(27) NOT NULL,
    transaction_id VARCHAR(27) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    refund_amount DECIMAL(10, 2) NOT NULL,
    refund_reason TEXT,
    refund_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY (refund_id),
    CONSTRAINT fk_transaction FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);