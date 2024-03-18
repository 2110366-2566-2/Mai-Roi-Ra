BEGIN TRANSACTION;
BEGIN TRY DROP TABLE IF EXISTS search_histories;
DROP TRIGGER IF EXISTS maintain_search_history_limit_trigger ON search_histories;
DROP FUNCTION IF EXISTS maintain_search_history_limit();
END TRY BEGIN CATCH IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
DECLARE @ErrorMessage NVARCHAR(4000);
DECLARE @ErrorSeverity INT;
DECLARE @ErrorState INT;
SELECT @ErrorMessage = ERROR_MESSAGE(),
    @ErrorSeverity = ERROR_SEVERITY(),
    @ErrorState = ERROR_STATE();
RAISEERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
END CATCH;
IF @@TRANCOUNT > 0 COMMIT TRANSACTION;