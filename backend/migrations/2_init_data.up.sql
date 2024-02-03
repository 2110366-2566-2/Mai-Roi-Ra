DO $$ 
BEGIN
    -- Insert data into Admins table
    INSERT INTO Admins (AdminId, Password, CreatedAt)
    VALUES ('adminId001', 'password123', CURRENT_TIMESTAMP);
    VALUES ('adminId002', 'password234', CURRENT_TIMESTAMP);
    VALUES ('adminId003', 'password345', CURRENT_TIMESTAMP);

    -- Insert data into Users table
    INSERT INTO Users (UserId, PaymentGatewayCustomerId, PhoneNumber, BirthDate, Email, FirstName, LastName, UserImage, CreatedAt)
    VALUES ('userId0001', 'paymentId1', '1234567890', '1990-01-01', 'user1@example.com', 'Terrance', 'Jeffords', 'user1.jpg', CURRENT_TIMESTAMP);
    VALUES ('userId0002', 'paymentId2', '1234567891', '1992-01-01', 'user2@example.com', 'Jake', 'Peralta', 'user2.jpg', CURRENT_TIMESTAMP);
    VALUES ('userId0003', 'paymentId3', '1234567892', '1994-01-01', 'user3@example.com', 'Charles', 'Boyle', 'user3.jpg', CURRENT_TIMESTAMP);

    -- Insert data into Organizers table
    INSERT INTO Organizers (OrganizerId, OfficeHours, CreatedAt, UserId)
    VALUES ('organizer1', ARRAY[CURRENT_TIMESTAMP, CURRENT_TIMESTAMP], CURRENT_TIMESTAMP, 'userId0001');
    VALUES ('organizer2', ARRAY[CURRENT_TIMESTAMP, CURRENT_TIMESTAMP], CURRENT_TIMESTAMP, 'userId0002');

    -- Insert data into Moderates table
    INSERT INTO Moderates (UserId, OrganizerId, CreatedAt)
    VALUES ('userId0001', 'organizer1', CURRENT_TIMESTAMP);

    -- Insert data into Locations table
    INSERT INTO Locations (LocationId, Country, City, District, LocationName)
    VALUES ('location01', 'Country1', 'City1', 'District1', 'LocationName1');
    VALUES ('location02', 'Country2', 'City2', 'District2', 'LocationName2');
    VALUES ('location03', 'Country3', 'City3', 'District3', 'LocationName3');

    -- Insert data into Events table
    INSERT INTO Events (EventId, StartDate, EndDate, Status, Participantfee, Description, EventName, CreatedAt, Deadline, Activities, EventImage, OrganizerId, AdminId, LocationId)
    VALUES ('eventId001', '2024-03-01', '2024-03-05', 'Approved', 50.0, 'Event description 1', 'Event 1', CURRENT_TIMESTAMP, '2024-02-15', 'Activity1', 'event1.jpg', 'organizer1', 'adminId001', 'location01');

    -- Insert data into Posts table
    INSERT INTO Posts (PostId, CreatedAt, PostImage, caption, RatingScore, UserId)
    VALUES ('postId0001', CURRENT_TIMESTAMP, 'post1.jpg', 'Caption for post 1', 4, 'userId0001');

    -- Insert data into Responses table
    INSERT INTO Responses (OrganizerId, PostId, Detail, CreatedAt)
    VALUES ('organizer1', 'postId0001', 'Response to post 1', CURRENT_TIMESTAMP);

    -- Insert data into Reviews table
    INSERT INTO Reviews (UserId, EventId, PostId)
    VALUES ('userId0001', 'eventId001', 'postId0001');

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error: %', SQLERRM;
END $$;
