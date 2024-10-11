import api from "$lib/api";
import type { PageLoad } from "./$types";

export const load: PageLoad = async e => {
	let posts = await api(e).post.getPosts.query({});
	return { posts };
};
