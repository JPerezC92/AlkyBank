import { Tokens } from "@/auth/schemas";
import { formatToken } from "@/auth/utils/parseToken";
import { MovementEndpointToModel } from "@/movements/adapters/MovementEndpointToModel.adapter";
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

		async findAll(
			accessToken,
			paginationCriteria,
			movementFilter,
			localSignal
		) {
			const query = new URLSearchParams();
			query.append("page", paginationCriteria.page.toString());
			query.append("limit", paginationCriteria.limit.toString());
			query.append("accountId", movementFilter.accountId);
			query.append("operation", movementFilter.operationType);
			query.append("concept", movementFilter?.concept || "");

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

			const resultValidated = MovementGETResponse.parse(result);
			return {
				movementList: resultValidated.movementList.map(MovementEndpointToModel),
				pagination: resultValidated.pagination,
			};
		},

		update: async (accessToken, movement, abortSignal) => {
			const headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");
			headers.append("Authorization", formatToken(accessToken));

			const response = await fetch(`${baseApiUrl}/${movement.id}`, {
				method: HttpVerb.PUT,
				signal: abortSignal || mainSignal,
				body: JSON.stringify(movement),
				headers,
			});

			if (!response.ok) throw await response.json();

			const result = await response.json();

			return MovementEndpointToModel(result);
		},
	};
};
