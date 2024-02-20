DO $$
BEGIN
    INSERT INTO announcements (announcement_id, event_id, header, description, created_at, updated_at)
    VALUES 
    ('d1f29fd6-52e6-4a8c-8f16-9f8b9d8b7a2e', '550e8400-e29b-41d4-a716-446655440400', 'Event Launch', 'We are thrilled to announce the launch of Event 1. Join us for a memorable experience!', CURRENT_TIMESTAMP, NULL),
    ('ecf0e8a7-e1a4-4c21-9927-bb1e8a14e3b4', '550e8400-e29b-41d4-a716-446655440400', 'Early Bird Registration', 'Early Bird registration is now open! Secure your spot at a discounted rate.', CURRENT_TIMESTAMP, NULL),
    ('a3b3ae1b-4f1c-4dbb-8e6f-9c8b9d9d4f5e', '550e8400-e29b-41d4-a716-446655440400', 'Keynote Speaker Announcement', 'We are excited to reveal our keynote speaker. Stay tuned for more details!', CURRENT_TIMESTAMP, NULL);
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error: %', SQLERRM;
END $$;