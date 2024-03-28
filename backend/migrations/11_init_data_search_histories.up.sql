DO $$ BEGIN
INSERT INTO search_histories (
        search_id,
        user_id,
        search_name,
        search_timestamp
    )
VALUES (
        'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
        '550e8400-e29b-41d4-a716-446655440100',
        'Search Example 1',
        '2024-03-16 12:00:00'
    ),
    (
        'b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7',
        '550e8400-e29b-41d4-a716-446655440100',
        'Search Example 2',
        '2024-03-17 13:00:00'
    ),
    (
        'c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r8',
        '550e8400-e29b-41d4-a716-446655440100',
        'Search Example 3',
        '2024-03-18 14:00:00'
    ),
    (
        'd4e5f6g7-h8i9-0j1k-2l3m-n4o5p6q7r8s9',
        '550e8400-e29b-41d4-a716-446655440101',
        'Search Example 4',
        '2024-03-19 15:00:00'
    ),
    (
        'e5f6g7h8-i9j0-1k2l-3m4n-o5p6q7r8s9t0',
        '550e8400-e29b-41d4-a716-446655440101',
        'Search Example 5',
        '2024-03-20 16:00:00'
    );
EXCEPTION
WHEN OTHERS THEN RAISE NOTICE 'Error: %',
SQLERRM;
END $$;