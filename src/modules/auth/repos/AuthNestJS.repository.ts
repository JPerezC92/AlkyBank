import { Credentials } from "@/auth/schemas/Credentials.schema";
import { Tokens } from "@/auth/schemas/Tokens.schema";
import { formatToken } from "@/auth/utils/parseToken";
import { MyRepo } from "@/shared/repos/MyRepo";
import { EnvVariables, HttpVerb } from "@/shared/utils";
import { UserEndpointToModel } from "@/users/adapter";
import { UserEndpoint } from "@/users/schemas/UserEndpoint.schema";

import { AuthRepository } from "./auth.repository";
import { CookieKeys, CookieRepository } from "./cookie.repository";

export const AuthNestJSRepository: MyRepo<AuthRepository> = (
	mainAbortSignal
) => {
	const baseUrl = EnvVariables.api + "/auth";

	return {
		async login(
			credentials: Credentials,
			abortSignal: AbortSignal
		): Promise<Tokens["accessToken"]> {
			const headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");

			const response = await fetch(baseUrl, {
				signal: abortSignal || mainAbortSignal,
				method: HttpVerb.POST,
				body: JSON.stringify(credentials),
				headers,
			});

			const result = await response.json();

			if (!response.ok) {
				throw result;
			}

			const { accessToken, refreshToken } = Tokens.parse(result);

			CookieRepository.save(CookieKeys.refreshToken, refreshToken);

			return accessToken;
		},

		async userInfo(accessToken, abortSignal) {
			const headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");
			headers.append("Authorization", formatToken(accessToken));

			const response = await fetch(baseUrl + "/me", {
				method: HttpVerb.GET,
				signal: abortSignal || mainAbortSignal,
				headers,
			});

			const result = await response.json();

			if (!response.ok) throw result;

			const resultValidated = UserEndpoint.parse(result);

			return UserEndpointToModel(resultValidated);
		},

		async refreshToken(refreshToken, abortSignal) {
			const headers = new Headers();
			headers.append("x-refresh-token", refreshToken);
			headers.append("Accept", "application/json");

			const response = await fetch(baseUrl + "/refresh-token", {
				signal: abortSignal || mainAbortSignal,
				method: HttpVerb.GET,
				headers,
			});

			const result = await response.json();

			if (!response.ok) {
				throw result;
			}

			const { accessToken, refreshToken: newRefreshToken } =
				Tokens.parse(result);

			CookieRepository.save(CookieKeys.refreshToken, newRefreshToken);
			return accessToken;
		},

		logout: async (refreshToken, abortSignal) => {
			const headers = new Headers();
			headers.append("x-refresh-token", refreshToken);
			headers.append("Accept", "application/json");

			const response = await fetch(baseUrl + "/logout", {
				signal: abortSignal || mainAbortSignal,
				method: HttpVerb.POST,
				headers,
			});

			if (!response.ok) {
				const result = await response?.json();
				throw result;
			}
		},
	};
};
