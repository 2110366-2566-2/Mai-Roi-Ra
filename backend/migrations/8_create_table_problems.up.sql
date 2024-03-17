DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'problem_type'
) THEN CREATE TYPE problem_type AS ENUM ('Event', 'Payment', 'Others');
END IF;
END $$;
CREATE TABLE IF NOT EXISTS problems (
    problem_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    admin_username VARCHAR(255) NOT NULL,
    problem problem_type NOT NULL,
    description TEXT NOT NULL,
    reply TEXT NOT NULL,
    status VARCHAR(8) NOT NULL CHECK (status IN ('Pending', 'Replied')),
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE
)