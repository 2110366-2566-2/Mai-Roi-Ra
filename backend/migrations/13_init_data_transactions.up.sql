DO $$ BEGIN
INSERT INTO transactions (
        transaction_id,
        user_id,
        transaction_amount,
        transaction_date,
        status
    )
VALUES (
        'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p0',
        '550e8400-e29b-41d4-a716-446655440100',
        100.50,
        '2024-03-16 12:00:00',
        'Completed'
    ),
    (
        'b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q1',
        '550e8400-e29b-41d4-a716-446655440100',
        50.25,
        '2024-03-17 13:00:00',
        'Pending'
    ),
    (
        'c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r2',
        '550e8400-e29b-41d4-a716-446655440101',
        75.75,
        '2024-03-18 14:00:00',
        'Completed'
    ),
    (
        'd4e5f6g7-h8i9-0j1k-2l3m-n4o5p6q7r8s3',
        '550e8400-e29b-41d4-a716-446655440101',
        30.00,
        '2024-03-19 15:00:00',
        'Canceled'
    );
-- Mock data for refunds
INSERT INTO refunds (
        refund_id,
        transaction_id,
        user_id,
        refund_amount,
        refund_reason,
        refund_date
    )
VALUES (
        'r1d2c3b4-a5f6-7g8h-9i0j-k1l2m3n4o5p6',
        'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p0',
        '550e8400-e29b-41d4-a716-446655440100',
        100.50,
        'Product issue',
        '2024-03-20 12:00:00'
    ),
    (
        'r2d3c4b5-a6f7-8g9h-0i1j-k2l3m4n5o6p7',
        'c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r2',
        '550e8400-e29b-41d4-a716-446655440101',
        75.75,
        'Service cancellation',
        '2024-03-21 13:00:00'
    );
EXCEPTION
WHEN OTHERS THEN RAISE NOTICE 'Error: %',
SQLERRM;
END $$;