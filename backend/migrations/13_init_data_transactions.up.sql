DO $$ BEGIN
INSERT INTO transactions (
        transaction_id,
        user_id,
        event_id,
        transaction_amount,
        transaction_date,
        status,
        transaction_way,
        created_at,
        updated_at
    )
VALUES (
        'pi_3OxU2ABdLeDLHWhq1CwC6LCP',
        '550e8400-e29b-41d4-a716-446655440100',
        '550e8400-e29b-41d4-a716-446655440400',
        100.50,
        '2024-03-16 12:00:00',
        'Completed',
        'Transferred',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP + interval '1 day'
    ),
    (
        'pi_1GszsK2eZvKYlo2CfhZyoZLp',
        '550e8400-e29b-41d4-a716-446655440100',
        '550e8400-e29b-41d4-a716-446655440400',
        50.25,
        '2024-03-17 13:00:00',
        'Pending',
        'Transferred',
        CURRENT_TIMESTAMP,
        NULL
    ),
    (
        'pi_3OxUT2BdLeDLHWhq0zCWRq2J',
        '550e8400-e29b-41d4-a716-446655440101',
        '550e8400-e29b-41d4-a716-446655440400',
        75.75,
        '2024-03-18 14:00:00',
        'Completed',
        'Transferred',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP + interval '1 day'
    ),
    (
        'pi_3OxOCnBdLeDLHWhq1GzTnwXE',
        '550e8400-e29b-41d4-a716-446655440101',
        '550e8400-e29b-41d4-a716-446655440400',
        30.00,
        '2024-03-19 15:00:00',
        'Cancelled',
        'Received',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP + interval '1 day'
    );
-- Mock data for refunds
INSERT INTO refunds (
        refund_id,
        transaction_id,
        user_id,
        refund_amount,
        refund_reason,
        refund_date,
        created_at,
        updated_at
    )
VALUES (
        're_1Nispe2eZvKYlo2Cd31jOCgZ',
        'pi_1GszsK2eZvKYlo2CfhZyoZLp',
        '550e8400-e29b-41d4-a716-446655440100',
        100.50,
        'Product issue',
        '2024-03-20 12:00:00',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP + interval '1 day'
    );
EXCEPTION
WHEN OTHERS THEN RAISE NOTICE 'Error: %',
SQLERRM;
END $$;