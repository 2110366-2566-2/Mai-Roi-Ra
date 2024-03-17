CREATE TABLE search_histories (
    search_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    user_id VARCHAR(36) NOT NULL,
    search_name VARCHAR(64) NOT NULL,
    search_timestamp TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (search_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION maintain_search_history_limit() RETURNS TRIGGER AS $$
BEGIN
    -- Delete oldest rows if the count exceeds 5 for the inserted user_id
    DELETE FROM search_histories
    WHERE (user_id, search_timestamp) IN (
            SELECT user_id, search_timestamp
            FROM (
                    SELECT user_id,
                        search_timestamp,
                        ROW_NUMBER() OVER (
                            PARTITION BY user_id
                            ORDER BY search_timestamp DESC
                        ) AS row_num
                    FROM search_histories
                ) AS subquery
            WHERE row_num > 5
        );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER maintain_search_history_limit_trigger
AFTER INSERT ON search_histories
FOR EACH ROW EXECUTE FUNCTION maintain_search_history_limit();
