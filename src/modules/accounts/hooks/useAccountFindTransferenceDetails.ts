import { useQuery } from "@tanstack/react-query";

import { AccountQueryKeys, AccountsRepository } from "@/accounts/domain";
import { AccountsNestJSRepository } from "@/accounts/repos";
import { isApiError, toastUtility } from "@/shared/utils";

interface AccountFindUserDetailsProps {
	accountId?: string;
	enabled?: boolean;
	accountsRepository?: AccountsRepository;
}

export function useAccountFindTransferReceiver({
	accountId,
	enabled = true,
	accountsRepository = AccountsNestJSRepository(),
}: AccountFindUserDetailsProps) {
	return useQuery(
		AccountQueryKeys.findAccountTransferReceiver(accountId),
		async ({ signal }) => {
			if (!accountId) return;

			const userDetails = await accountsRepository.findTransferenceDetails(
				accountId,
				signal
			);

			return userDetails;
		},
		{
			enabled,
			retry: false,
			onSuccess: () => {
				toastUtility.success({
					title: "Account information found",
				});
			},
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
