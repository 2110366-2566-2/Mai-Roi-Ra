import createAnnouncement from '@/libs/createAnnouncement';
import fetchMock from 'jest-fetch-mock';
// import { expect } from 'chai';
// This import is not necessary unless you're using additional Jest functionalities not provided by globals
import { describe, it, expect } from '@jest/globals';
import { apiBackUrl } from "../constants";




fetchMock.enableMocks();

describe('createAnnouncement', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should successfully create an announcement when the server responds with 200', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'announcement created' }), { status: 200 });

    const response = await createAnnouncement('1', 'Event Name', 'Announcement Header', 'This is the content.', 'token123');

    // Use toEqual for deep equality checks or toBe for strict equality checks
    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(`${apiBackUrl}/announcements`);
    expect(fetchMock.mock.calls[0][1]).toEqual({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token123",
      },
      body: JSON.stringify({
        content: "This is the content.",
        event_id: "1",
        event_name: "Event Name",
        subject: "Announcement Header"
      }),
    });
    expect(response).toEqual({ data: 'announcement created' });
  });
  it('should throw an error when the server responds with an error', async () => {
    fetchMock.mockRejectOnce(new Error('API failure'));
  
    await expect(createAnnouncement('1', 'Event Name', 'Announcement Header', 'This is the content.', 'token123'))
      .rejects
      .toThrow('API failure');
  
    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(`${apiBackUrl}/announcements`);
  });
  describe('createAnnouncement Error Handling', () => {
    it('should handle non-200 HTTP responses correctly', async () => {
      // Mock a specific non-200 HTTP response
      fetchMock.mockResponseOnce(JSON.stringify({ message: 'Unknown error' }), { status: 404 });
  
      await expect(createAnnouncement('1', 'Event Name', 'Announcement Header', 'This is the content.', 'token123'))
          .rejects
          .toThrow('Failed to create announcement: 404 - Unknown error');  // Match the actual error message
  
      expect(fetchMock.mock.calls.length).toBe(1);
      expect(fetchMock.mock.calls[0][0]).toBe(`${apiBackUrl}/announcements`);
  });
});
describe('createAnnouncement Error Handling', () => {
  it('should handle different error messages when the server responds with non-200 status', async () => {
    const errorMessage = "Specific error message";
    fetchMock.mockResponseOnce(JSON.stringify({ message: errorMessage }), { status: 400 });

    await expect(createAnnouncement('1', 'Event Name', 'Announcement Header', 'This is the content.', 'token123'))
        .rejects
        .toThrow(`Failed to create announcement: 400 - ${errorMessage}`);

    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(`${apiBackUrl}/announcements`);
  });
  it('should handle API errors without an error message', async () => {
    // Mock an API error response with no specific message
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(createAnnouncement('1', 'Event Name', 'Announcement Header', 'This is the content.', 'token123'))
        .rejects
        .toThrow('Failed to create announcement: 500 - Unknown error');

    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(`${apiBackUrl}/announcements`);
});

});

});
