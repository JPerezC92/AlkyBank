import { useAuthStore } from "@/auth/store";
import { formatToken } from "@/auth/utils/parseToken";
import { MyRepo } from "@/shared/repos/MyRepo";
import { EnvVariables } from "@/shared/utils/envVariables";
import { HttpVerb } from "@/shared/utils/httpVerb";
import { UsersRepository } from "@/users/repos/UsersRepository";
import { UserEndpoint } from "@/users/schemas/UserEndpoint.schema";

export const UsersNestJSRepository: MyRepo<UsersRepository> = (mainSignal) => {
	const baseUrl = EnvVariables.api + "/users";
	return {
		async create(user, abortSignal) {
			const headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");

			const response = await fetch(baseUrl, {
				signal: abortSignal || mainSignal,
				method: HttpVerb.POST,
				body: JSON.stringify(user),
				headers,
			});

			const result = await response.json();

			if (!response.ok) throw result;

			return UserEndpoint.parse(result);
		},

		async update(id, userUpdate, abortSignal) {
			const accessToken = useAuthStore.getState().accessToken;

			const headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");
			headers.append("Authorization", formatToken(accessToken));

			const response = await fetch(`${baseUrl}/${id}`, {
				signal: abortSignal || mainSignal,
				method: HttpVerb.PATCH,
				body: JSON.stringify(userUpdate),
				headers,
			});

			const result = await response.json();

			if (!response.ok) throw result;
		},
	};
};
