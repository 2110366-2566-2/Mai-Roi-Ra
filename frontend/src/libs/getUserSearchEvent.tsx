import { apiBackUrl } from "../constants";

interface EventQueryParams {
  offset?: number;
  limit?: number;
  search: string;
  user_id: string;
}

export default async function getUserSearchEvent({
    user_id,
	search = "",
	offset = 1,
	limit = 2,}
	: EventQueryParams) {

	const url = new URL(`${apiBackUrl}/users/${user_id}/searchevent`);
	
	offset = (offset-1)*limit;
	url.searchParams.append('search',search);
	url.searchParams.append('offset', offset.toString());
	url.searchParams.append('limit', limit.toString());

	const response = await fetch(url.toString(), {
		method: "GET",
		headers: {
		'Accept': 'application/json', 
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch search event");
	}
	console.log(`success`);
	return await response.json();
}
