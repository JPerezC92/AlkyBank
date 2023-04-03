import { Tokens } from "@/auth/schemas";
import { formatToken } from "@/auth/utils/parseToken";
import {
	MovementCreate,
	MovementEndpoint,
	MovementGETResponse,
} from "@/movements/schemas";
import { MyRepo } from "@/shared/repos";
import { EnvVariables, HttpVerb } from "@/shared/utils";

import { MovementsRepository } from "./Movement.repository";

export const MovementsNestJSRepository: MyRepo<MovementsRepository> = (
	mainSignal
) => {
	const baseApiUrl = EnvVariables.api + "/movements";

	return {
		create: async (
			movement: MovementCreate,
			accessToken: Tokens["accessToken"],
			localSignal?: AbortSignal
		) => {
			const headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");
			headers.append("Authorization", formatToken(accessToken));

			const response = await fetch(baseApiUrl, {
				method: HttpVerb.POST,
				signal: localSignal || mainSignal,
				body: JSON.stringify(MovementCreate.parse(movement)),
				headers,
			});

			const result = await response.json();

			if (!response.ok) throw result;

			return MovementEndpoint.parse(result);
		},

		async findAll(accountId, accessToken, paginationCriteria, localSignal) {
			const query = new URLSearchParams();
			query.append("accountId", accountId);
			query.append("page", paginationCriteria.page.toString());
			query.append("limit", paginationCriteria.limit.toString());

			const headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");
			headers.append("Authorization", formatToken(accessToken));

			const response = await fetch(`${baseApiUrl}?${query}`, {
				signal: localSignal || mainSignal,
				method: HttpVerb.GET,
				headers,
			});

			const result = await response.json();

			if (!response.ok) throw result;

			return MovementGETResponse.parse(result);
		},
	};
};