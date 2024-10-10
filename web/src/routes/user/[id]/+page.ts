import api from "$lib/api";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { ProfileInfo } from "$lib/models";

export const load: PageLoad = async e => {
	let profile: ProfileInfo;
	try {
		profile = await api(e).user.profile.showProfileInfo.query({
			userId: Number(e.params.id)
		});
	} catch {
		error(404, "Not Found");
	}
	return { profile };
};
