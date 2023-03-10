import { Tokens } from "@/auth/schemas";
import { formatToken } from "@/auth/utils/parseToken";
import { MovementCreate, MovementEndpoint } from "@/movements/schemas";
import { MyRepo } from "@/shared/repos";
import { EnvVariables, HttpVerb } from "@/shared/utils";

import { MovementsRepository } from "./Movement.repository";

export const MovementsNestJSRepository: MyRepo<MovementsRepository> = (
	mainSignal
) => {
	const baseApiUrl = EnvVariables.api + "/movements";

	return {
		create: async <T extends MovementCreate>(
			movement: T,
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

			return MovementEndpoint.parse(result) as Extract<
				MovementEndpoint,
				{ type: T["type"] }
			>;
		},
	};
};
