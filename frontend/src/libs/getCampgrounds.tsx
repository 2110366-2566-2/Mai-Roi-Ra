import { apiBackUrl } from "../constants";

export default async function getCampgrounds() {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    const response = await fetch(`${apiBackUrl}/campgrounds`, {next: {tags: ['campgrounds']}})

    if (!response.ok) {
        throw new Error("Failed to fetch campgrounds' data from backend");
    }

    return await response.json();
}