DO $$ 
BEGIN
    -- Insert data into Admins table
    -- INSERT INTO admins (admin_id, password, created_at, updated_at)
    -- VALUES 
    -- ('550e8400-e29b-41d4-a716-446655440000', 'password123', CURRENT_TIMESTAMP, NULL),
    -- ('550e8400-e29b-41d4-a716-446655440001', 'password234', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + interval '1 day'),
    -- ('550e8400-e29b-41d4-a716-446655440002', 'password345', CURRENT_TIMESTAMP, NULL),
    -- ('550e8400-e29b-41d4-a716-446655440003', 'password456', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + interval '2 days'),
    -- ('550e8400-e29b-41d4-a716-446655440004', 'password567', CURRENT_TIMESTAMP, NULL)
    

    -- Insert data into Users table
    INSERT INTO users (user_id, username, phone_number, email, first_name, last_name, password, is_enable_notification, payment_gateway_customer_id, birth_date, user_image, address, district, province, banner_image, token, role, created_at, updated_at)
    VALUES 
    ('550e8400-e29b-41d4-a716-446655440100', 'TerranceJ', '1234567890', 'user1@example.com', 'Terrance', 'Jeffords', 'password1', TRUE, 'paymentid1', '1990-01-01', 'https://picsum.photos/200/300?random=1', '123 Main St', 'Downtown', 'New York', 'https://picsum.photos/200/300?random=11', '', 'ORGANIZER', CURRENT_TIMESTAMP, NULL),
    ('550e8400-e29b-41d4-a716-446655440101', 'JakeP', '1234567891', 'user2@example.com', 'Jake', 'Peralta', 'password2', FALSE, 'paymentid2', '1992-01-01', 'https://picsum.photos/200/300?random=2', '456 Side St', 'Midtown', 'New York', 'https://picsum.photos/200/300?random=12', '', 'ORGANIZER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + interval '1 day'),
    ('550e8400-e29b-41d4-a716-446655440102', 'CharlesB', '1234567892', 'user3@example.com', 'Charles', 'Boyle', 'password3', TRUE, 'paymentid3', '1994-01-01', 'https://picsum.photos/200/300?random=3', '789 Circle Ave', 'Uptown', 'New York', 'https://picsum.photos/200/300?random=13', '', 'USER', CURRENT_TIMESTAMP, NULL),
    ('550e8400-e29b-41d4-a716-446655440103', 'RosaD', '1234567893', 'user4@example.com', 'Rosa', 'Diaz', 'password4', FALSE, 'paymentid4', '1996-01-01', 'https://picsum.photos/200/300?random=4', '1010 Square Rd', 'East Village', 'New York', 'https://picsum.photos/200/300?random=14', '', 'USER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + interval '2 days'),
    ('550e8400-e29b-41d4-a716-446655440104', 'AmyS', '1234567894', 'user5@example.com', 'Amy', 'Santiago', 'password5', FALSE, 'paymentid5', '1998-01-01', 'https://picsum.photos/200/300?random=5', '1313 Hex St', 'West End', 'New York', 'https://picsum.photos/200/300?random=15', '', 'USER', CURRENT_TIMESTAMP, NULL),
    ('550e8400-e29b-41d4-a716-446655440105', 'TerryC', '1234567895', 'user6@example.com', 'Terry', 'Crews', 'password6', TRUE, 'paymentid6', '2000-01-01', 'https://picsum.photos/200/300?random=16', '1414 Random Rd', 'Brooklyn', 'New York', 'https://picsum.photos/200/300?random=17', '', 'USER', CURRENT_TIMESTAMP, NULL),
    ('550e8400-e29b-41d4-a716-446655440106', 'GinaL', '1234567896', 'user7@example.com', 'Gina', 'Linetti', 'password7', TRUE, 'paymentid7', '2002-01-01', 'https://picsum.photos/200/300?random=18', '1616 Quirky St', 'Queens', 'New York', 'https://picsum.photos/200/300?random=19', '', 'USER', CURRENT_TIMESTAMP, NULL),
    ('550e8400-e29b-41d4-a716-446655440107', 'RaymondH', '1234567897', 'user8@example.com', 'Raymond', 'Holt', 'password8', FALSE, 'paymentid8', '2004-01-01', 'https://picsum.photos/200/300?random=20', '1818 Precise Ave', 'Bronx', 'New York', 'https://picsum.photos/200/300?random=21', '', 'USER', CURRENT_TIMESTAMP, NULL),
    ('550e8400-e29b-41d4-a716-446655440108', 'KevinC', '1234567898', 'user9@example.com', 'Kevin', 'Cozner', 'password9', FALSE, 'paymentid9', '2006-01-01', 'https://picsum.photos/200/300?random=22', '2020 Calm Rd', 'Staten Island', 'New York', 'https://picsum.photos/200/300?random=23', '', 'ADMIN', CURRENT_TIMESTAMP, NULL);

    -- Insert data into Organizers table
    INSERT INTO organizers (organizer_id, user_id, start_office_hours, end_office_hours, created_at, updated_at)
    VALUES 
    ('550e8400-e29b-41d4-a716-446655440200', '550e8400-e29b-41d4-a716-446655440100', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + interval '1 hour', CURRENT_TIMESTAMP, NULL),
    ('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440101', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + interval '2 hours', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + interval '1 day');

    -- Insert data into Locations table
    INSERT INTO locations (location_id, country, city, district, location_name, created_at, updated_at)
    VALUES 
    ('550e8400-e29b-41d4-a716-446655440300', 'Country1', 'City1', 'District1', 'LocationName1', CURRENT_TIMESTAMP, NULL),
    ('550e8400-e29b-41d4-a716-446655440301', 'Country2', 'City2', 'District2', 'LocationName2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + interval '2 days');

    -- Corrected: Insert data into Events table with ENUM values for activities
    INSERT INTO events (event_id, organizer_id, user_id, location_id, start_date, end_date, status, participant_fee, participant_count, description, event_name, deadline, activities, event_image, created_at, updated_at)
    VALUES 
    ('550e8400-e29b-41d4-a716-446655440400', '550e8400-e29b-41d4-a716-446655440200', '550e8400-e29b-41d4-a716-446655440108', '550e8400-e29b-41d4-a716-446655440300', '2024-03-01', '2024-03-05', 'Approved', 50.0, 6, 'Event description 1', 'Event 1', '2024-02-15', 'Entertainment', 'https://picsum.photos/200/300?random=6', CURRENT_TIMESTAMP, NULL);

    -- Insert data into Posts table
    INSERT INTO posts (post_id, user_id, post_image, caption, rating_score, created_at, updated_at)
    VALUES 
    ('550e8400-e29b-41d4-a716-446655440500', '550e8400-e29b-41d4-a716-446655440100', 'https://picsum.photos/200/300?random=7', 'Caption for post 1', 4, CURRENT_TIMESTAMP, NULL);

    -- Insert data into Responses table
    INSERT INTO responses (organizer_id, post_id, detail, created_at, updated_at)
    VALUES 
    ('550e8400-e29b-41d4-a716-446655440200', '550e8400-e29b-41d4-a716-446655440500', 'Response to post 1', CURRENT_TIMESTAMP, NULL);

    -- Insert data into Reviews table
    INSERT INTO reviews (user_id, event_id, post_id)
    VALUES 
    ('550e8400-e29b-41d4-a716-446655440100', '550e8400-e29b-41d4-a716-446655440400', '550e8400-e29b-41d4-a716-446655440500');

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error: %', SQLERRM;
END $$;
