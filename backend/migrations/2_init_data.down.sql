DO $$

BEGIN
    -- Attempt to truncate the tables
    TRUNCATE TABLE Responses;
    TRUNCATE TABLE Reviews;
    TRUNCATE TABLE Moderates;
    TRUNCATE TABLE Posts;
    TRUNCATE TABLE Events;
    TRUNCATE TABLE Locations;
    TRUNCATE TABLE Organizers;
    TRUNCATE TABLE Users;
    TRUNCATE TABLE Admins;

    -- If no error occurs, commit the transaction
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE NOTICE 'Error: %', SQLERRM;
END $$
