import api from "$lib/api";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async e => {
	try {
		let user = await api(e).user.profile.showProfileInfo.query({});
		return { user };
	} catch (e) {
		return { user: null };
	}
};
