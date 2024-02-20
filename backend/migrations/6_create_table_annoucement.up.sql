CREATE TABLE IF NOT EXISTS announcements (
    announcement_id VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    event_id VARCHAR(36) NOT NULL,
    header VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
)