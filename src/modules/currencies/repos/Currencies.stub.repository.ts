import { CurrenciesRepository } from "@/currencies/domain";
import { MyRepo } from "@/shared/repos";

export const CurrenciesStubRepository: MyRepo<CurrenciesRepository> = () => {
	return {
		findAll: async () => {
			return ["ARS", "USD", "EUR"];
		},
	};
};
