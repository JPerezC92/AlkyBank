import { Credentials } from "@/auth/schemas/Credentials.schema";
import { Tokens } from "@/auth/schemas/Tokens.schema";
import { formatToken } from "@/auth/utils/parseToken";
import { MyRepo } from "@/shared/repos/MyRepo";
import { EnvVariables, HttpVerb } from "@/shared/utils";
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

			return UserEndpoint.parse(result);
		},

		async refreshToken(abortSignal) {
			const refreshToken = CookieRepository.find(CookieKeys.refreshToken);
			const headers = new Headers();
			headers.append("x-refresh-token", refreshToken || "");
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
	};
};
