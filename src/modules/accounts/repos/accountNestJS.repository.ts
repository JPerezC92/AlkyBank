import { Account, AccountsRepository } from "@/accounts/domain";
import { AccountEndpoint } from "@/accounts/schemas";
import { useAuthStore } from "@/auth/store";
import { formatToken } from "@/auth/utils/parseToken";
import { AccountTransferenceDetailsEndpoint } from "@/movements/schemas/AccountTransferenceDetails.schema";
import { MyRepo } from "@/shared/repos";
import { EnvVariables, HttpVerb } from "@/shared/utils";

export const AccountsNestJSRepository: MyRepo<AccountsRepository> = () => {
	const baseUrl = EnvVariables.api + "/accounts";

	return {
		find: async (accountId, signal) => {
			const accessToken = useAuthStore.getState().accessToken;

			const headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");
			headers.append("Authorization", formatToken(accessToken));

			const response = await fetch(`${baseUrl}/${accountId}`, {
				method: HttpVerb.GET,
				headers,
				signal,
			});

			const result = await response.json();

			if (!response.ok) throw result;

			const validatedRedsult = AccountEndpoint.parse(result);

			return new Account(validatedRedsult);
		},

		findTransferenceDetails: async (accountId, signal) => {
			const accessToken = useAuthStore.getState().accessToken;

			const headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");
			headers.append("Authorization", formatToken(accessToken));

			const response = await fetch(
				`${baseUrl}/${accountId}/transference-details`,
				{
					method: HttpVerb.GET,
					headers,
					signal,
				}
			);

			const result = await response.json();

			if (!response.ok) throw result;

			return AccountTransferenceDetailsEndpoint.parse(result);
		},
	};
};
