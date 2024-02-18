
CREATE OR REPLACE FUNCTION update_num_participant()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE events
    SET participant_count = participant_count + 1
    WHERE event_id = NEW.event_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger Functions --
CREATE TRIGGER after_insert_participant
AFTER INSERT ON participate
FOR EACH ROW
EXECUTE FUNCTION update_num_participant();