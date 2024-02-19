-- Create or replace the function
CREATE OR REPLACE FUNCTION update_num_participant()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Update on insert
        UPDATE events
        SET participant_count = participant_count + NEW.num_participant
        WHERE event_id = NEW.event_id;
    ELSIF TG_OP = 'DELETE' THEN
        -- Update on delete
        UPDATE events
        SET participant_count = participant_count - OLD.num_participant
        WHERE event_id = OLD.event_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger for AFTER INSERT
CREATE TRIGGER after_insert_participant
AFTER INSERT ON participate
FOR EACH ROW
EXECUTE FUNCTION update_num_participant();

-- Create the trigger for AFTER DELETE
CREATE TRIGGER after_delete_participant
AFTER DELETE ON participate
FOR EACH ROW
EXECUTE FUNCTION update_num_participant();
