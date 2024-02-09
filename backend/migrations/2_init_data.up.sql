DO $$ 
BEGIN
    -- Insert data into Admins table
    INSERT INTO admins (admin_id, password, created_at)
    VALUES 
    ('adminid001', 'password123', CURRENT_TIMESTAMP),
    ('adminid002', 'password234', CURRENT_TIMESTAMP),
    ('adminid003', 'password345', CURRENT_TIMESTAMP);

INSERT INTO users (
    user_id, 
    username, 
    phone_number, 
    email, 
    first_name, 
    last_name, 
    password, 
    payment_gateway_customer_id, 
    birth_date, 
    user_image, 
    address, 
    district, 
    province, 
    banner_image, 
    created_at
)
VALUES 
    ('userid0001', 'TerranceJ', '1234567890', 'user1@example.com', 'Terrance', 'Jeffords', 'password1', 'paymentid1', '1990-01-01', 'user1.jpg', '123 Main St', 'Downtown', 'New York', 'banner1.jpg', CURRENT_TIMESTAMP),
    ('userid0002', 'JakeP', '1234567891', 'user2@example.com', 'Jake', 'Peralta', 'password2', 'paymentid2', '1992-01-01', 'user2.jpg', '456 Side St', 'Midtown', 'New York', 'banner2.jpg', CURRENT_TIMESTAMP),
    ('userid0003', 'CharlesB', '1234567892', 'user3@example.com', 'Charles', 'Boyle', 'password3', 'paymentid3', '1994-01-01', 'user3.jpg', '789 Circle Ave', 'Uptown', 'New York', 'banner3.jpg', CURRENT_TIMESTAMP);


    -- Insert data into Organizers table
    INSERT INTO organizers (organizer_id, office_hours, created_at)
    VALUES 
    ('organizer1', ARRAY[CURRENT_TIMESTAMP, CURRENT_TIMESTAMP], CURRENT_TIMESTAMP),
    ('organizer2', ARRAY[CURRENT_TIMESTAMP, CURRENT_TIMESTAMP], CURRENT_TIMESTAMP);

    -- Insert data into Moderates table
    INSERT INTO moderates (user_id, organizer_id, created_at)
    VALUES 
    ('userid0001', 'organizer1', CURRENT_TIMESTAMP);

    -- Insert data into Locations table
    INSERT INTO locations (location_id, country, city, district, location_name)
    VALUES 
    ('location01', 'Country1', 'City1', 'District1', 'LocationName1'),
    ('location02', 'Country2', 'City2', 'District2', 'LocationName2'),
    ('location03', 'Country3', 'City3', 'District3', 'LocationName3');

    -- Insert data into Events table
    INSERT INTO events (event_id, start_date, end_date, status, participant_fee, description, event_name, created_at, deadline, activities, event_image, organizer_id, admin_id, location_id)
    VALUES 
    ('eventid001', '2024-03-01', '2024-03-05', 'Approved', 50.0, 'Event description 1', 'Event 1', CURRENT_TIMESTAMP, '2024-02-15', 'Activity1', 'event1.jpg', 'organizer1', 'adminid001', 'location01');

    -- Insert data into Posts table
    INSERT INTO posts (post_id, created_at, post_image, caption, rating_score, user_id)
    VALUES 
    ('postid0001', CURRENT_TIMESTAMP, 'post1.jpg', 'Caption for post 1', 4, 'userid0001');

    -- Insert data into Responses table
    INSERT INTO responses (organizer_id, post_id, detail, created_at)
    VALUES 
    ('organizer1', 'postid0001', 'Response to post 1', CURRENT_TIMESTAMP);

    -- Insert data into Reviews table
    INSERT INTO reviews (user_id, event_id, post_id)
    VALUES 
    ('userid0001', 'eventid001', 'postid0001');

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error: %', SQLERRM;
END $$;