import { apiBackUrl } from "../constants";

interface EventQueryParams {
  organizer_id?: string;
  offset?: number;
  limit?: number;
  search?: string;
  filter?: string;
}

export default async function getEvents({
  organizer_id,
  search = "",
  offset = 1,
  limit = 5,
  filter,
}: EventQueryParams) {
  const url = new URL(`${apiBackUrl}/events`);

  if (organizer_id) {
    url.searchParams.append("organizer_id", organizer_id);
  }

  offset = (offset - 1) * limit;
  if (search) {
    url.searchParams.append("search", search);
  }
  url.searchParams.append("offset", offset.toString());
  url.searchParams.append("limit", limit.toString());
  if (filter) {
    url.searchParams.append("filter", filter);
  }

  console.log(url.toString());
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  console.log(`success`);
  return await response.json();
}
