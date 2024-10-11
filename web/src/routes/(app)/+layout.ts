import api from "$lib/api";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async e => {
	let tags = await api(e).post.getTags.query();
	try {
		let user = await api(e).user.profile.showProfileInfo.query({});
		return { tags, user };
	} catch (e) {
		return { tags, user: null };
	}
};
