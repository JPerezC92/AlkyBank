import { useQuery } from "@tanstack/react-query";

import { CurrenciesRepository, currencyQueryKeys } from "@/currencies/domain";

export function useCurrenciesFindQuery(
	currenciesRepository: CurrenciesRepository
) {
	return useQuery(currencyQueryKeys().all, async ({ signal }) => {
		return await currenciesRepository.findAll(signal);
	});
}
