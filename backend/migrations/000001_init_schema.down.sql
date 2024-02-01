-- BEGIN TRANSACTION
-- BEGIN TRY

--     DROP TABLE IF EXISTS hello;

-- END TRY
-- BEGIN CATCH
--     IF @@TRANCOUNT > 0
--         ROLLBACK TRANSACTION;

--     DECLARE @ErrorMessage NVARCHAR(4000);
--     DECLARE @ErrorSeverity INT;
--     DECLARE @ErrorState INT;

--     SELECT
--     @ErrorMessage = ERROR_MESSAGE(),
--     @ErrorSeverity = ERROR_SEVERITY(),
--     @ErrorState = ERROR_STATE();

--     RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
-- END CATCH
-- IF @@TRANCOUNT > 0
--     COMMIT TRANSACTION;