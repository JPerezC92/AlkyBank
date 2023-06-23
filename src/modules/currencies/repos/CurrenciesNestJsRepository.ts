import { CurrenciesRepository } from "@/currencies/domain";
import { MyRepo } from "@/shared/repos";
import { EnvVariables, HttpVerb } from "@/shared/utils";

export const CurrenciesNestJsRepository: MyRepo<CurrenciesRepository> = () => {
	const baseUrl = EnvVariables.api + "/currencies";
	return {
		findAll: async (signal?: AbortSignal) => {
			const headers = new Headers();
			headers.append("Accept", "application/json");

			const response = await fetch(baseUrl, {
				signal,
				headers,
				method: HttpVerb.GET,
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message);
			}

			return result;
		},
	};
};
