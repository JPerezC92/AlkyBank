import { Credentials } from "@/auth/schemas/Credentials.schema";
import { Tokens } from "@/auth/schemas/Tokens.schema";
import { formatToken } from "@/auth/utils/parseToken";
import { MyRepo } from "@/shared/repos/MyRepo";
import { EnvVariables, HttpVerb } from "@/shared/utils";
import { User } from "@/users/schemas/UserEndpoint.schema";

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
			const response = await fetch(baseUrl, {
				signal: abortSignal || mainAbortSignal,
				method: HttpVerb.POST,
				body: JSON.stringify(credentials),
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
				},
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
			const response = await fetch(baseUrl + "/me", {
				method: HttpVerb.GET,
				signal: abortSignal || mainAbortSignal,
				headers: {
					Authorization: formatToken(accessToken),
					accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			const result = await response.json();

			if (!response.ok) throw result;

			return User.parse(result);
		},

		async refreshToken(abortSignal) {
			const refreshToken = CookieRepository.find(CookieKeys.refreshToken);

			const response = await fetch(baseUrl + "/refresh-token", {
				signal: abortSignal || mainAbortSignal,
				method: HttpVerb.GET,
				headers: {
					"x-refresh-token": refreshToken || "",
					accept: "application/json",
				},
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
