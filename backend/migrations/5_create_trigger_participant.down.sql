BEGIN TRANSACTION;
BEGIN TRY

    DROP TRIGGER IF EXISTS after_insert_participant ON participants;
    DROP FUNCTION IF EXISTS update_num_participant();

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