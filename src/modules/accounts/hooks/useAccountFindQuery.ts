import { useQuery } from "@tanstack/react-query";

import {
	Account,
	AccountQueryKeys,
	AccountsRepository,
} from "@/accounts/domain";
import { AccountsNestJSRepository } from "@/accounts/repos";
import { isApiError, toastUtility } from "@/shared/utils";

interface UseAccountFindQueryProps {
	accountRepository?: AccountsRepository;
	accountId?: Account["id"];
	enabled?: boolean;
}

export function useAccountFindQuery({
	accountRepository = AccountsNestJSRepository(),
	accountId,
	enabled = true,
}: UseAccountFindQueryProps) {
	return useQuery(
		AccountQueryKeys.find(accountId),
		async () => {
			if (!accountId) return;

			const account = await accountRepository.find(accountId);
			return account;
		},
		{
			enabled,
			onError: (error) => {
				if (!isApiError(error)) {
					return toastUtility.errorDefault();
				}

				return toastUtility.error({
					title: "Could not find account information",
					description: error.message,
				});
			},
		}
	);
}
