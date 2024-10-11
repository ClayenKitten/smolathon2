import api from "$lib/api";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { PostPreview, ProfileInfo } from "$lib/models";

export const load: PageLoad = async e => {
	let profile: ProfileInfo;
	let posts: PostPreview[];
	let subscribers: number;
	let subscribtions: number;
	try {
		profile = await api(e).user.profile.showProfileInfo.query({
			userId: Number(e.params.id)
		});
		posts = await api(e).post.getUserPosts.query({
			userId: profile.id
		});
		subscribers = (
			await api(e).user.subscription.getUserSubscribers.query({
				userId: profile.id
			})
		).length;
		subscribtions = (
			await api(e).user.subscription.getUserSubscriptions.query({
				userId: profile.id
			})
		).length;
	} catch {
		error(404, "Not Found");
	}
	return { profile, posts, subscribers, subscribtions };
};
