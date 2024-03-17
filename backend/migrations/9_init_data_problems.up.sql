DO $$ BEGIN
INSERT INTO problems (
        problem_id,
        admin_username,
        problem,
        description,
        reply,
        status,
        created_at,
        updated_at
    )
VALUES (
        'f187c146-59f4-420e-b13d-b170fc0e8c8a',
        'admin1',
        'Event',
        'Issue with event registration',
        'We are looking into it',
        'Pending',
        '2023-01-10 14:30:00',
        NULL
    ),
    (
        '963dd434-efc2-4435-80c9-aa431769fce3',
        'admin2',
        'Payment',
        'Payment not processed',
        'Refund initiated',
        'Replied',
        '2023-01-11 15:45:00',
        '2023-01-12 09:25:00'
    ),
    (
        'f71ff5df-cbe8-4ad2-ad78-1c7fd66109d3',
        'admin3',
        'Others',
        'Query about service',
        'Your query has been resolved',
        'Replied',
        '2023-01-15 10:00:00',
        '2023-01-16 11:00:00'
    ),
    (
        'b654a144-554d-4146-9f01-b3f0871fab2e',
        'admin1',
        'Payment',
        'Double charge issue',
        'Adjustment will be made in next bill',
        'Pending',
        '2023-02-01 16:00:00',
        NULL
    ),
    (
        '3bfef83b-c4b4-4739-962c-cf968c043899',
        'admin2',
        'Event',
        'Feedback on recent event',
        'Thank you for your feedback',
        'Replied',
        '2023-02-05 17:20:00',
        '2023-02-06 08:30:00'
    );
EXCEPTION
WHEN OTHERS THEN RAISE NOTICE 'Error: %',
SQLERRM;
END $$;