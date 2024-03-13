import { apiBackUrl } from "../constants";

export default async function getEventParticipants(eventId: string) {
    const response = await fetch(`${apiBackUrl}/events/participant/?event_id=${eventId}`, {
        method: 'GET',
        next: { tags: ['participants'] }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch event participant list');
    }

    console.log('Success');
    return await response.json();
}