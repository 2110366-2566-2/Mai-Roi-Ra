BEGIN TRANSACTION;
BEGIN TRY
    DROP TABLE IF EXISTS Responses;
    DROP TABLE IF EXISTS Reviews;
    DROP TABLE IF EXISTS Moderates;
    DROP TABLE IF EXISTS Posts;
    DROP TABLE IF EXISTS Events;
    DROP TABLE IF EXISTS Locations;
    DROP TABLE IF EXISTS Organizers;
    DROP TABLE IF EXISTS Users;
    DROP TABLE IF EXISTS Admins;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;
    
    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

    RAISEERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
END CATCH;

IF @@TRANCOUNT > 0
    COMMIT TRANSACTION;