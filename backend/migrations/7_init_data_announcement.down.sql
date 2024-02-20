DO $$

BEGIN
    -- Attempt to truncate the tables
    TRUNCATE TABLE announcements;

    -- If no error occurs, commit the transaction
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE NOTICE 'Error: %', SQLERRM;
END $$
