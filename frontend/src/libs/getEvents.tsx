import { apiBackUrl } from "../constants";

interface EventQueryParams {
  organizer_id?: string;
  offset?: number;
  limit?: number;

}

export default async function getEvents({
	organizer_id,
	offset = 1,
	limit = 10}
	: EventQueryParams) {

	const url = new URL(`${apiBackUrl}/events`);

	if (organizer_id) {
		url.searchParams.append('organizer_id', organizer_id);
	}
	
	offset = (offset-1)*limit;
	url.searchParams.append('offset', offset.toString());
	url.searchParams.append('limit', limit.toString());

	const response = await fetch(url.toString(), {
		method: "GET",
		headers: {
		'Accept': 'application/json', 
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch events");
	}
	console.log(`success`);
	return await response.json();
}
