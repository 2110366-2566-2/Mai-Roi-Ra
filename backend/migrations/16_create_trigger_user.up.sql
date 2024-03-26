CREATE OR REPLACE FUNCTION verify_user_deletion() RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM users
    WHERE user_id = NEW.user_id AND is_verified = FALSE AND created_at < NOW() - INTERVAL '1 day';
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER verify_user_deletion_trigger
AFTER UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION verify_user_deletion();