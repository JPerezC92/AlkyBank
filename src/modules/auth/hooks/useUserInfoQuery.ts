import { useQuery } from "@tanstack/react-query";

import { useAccountStore } from "@/accounts/store";
import { AuthDetails, AuthQueryKeys } from "@/auth/domain";
import { AuthNestJSRepository } from "@/auth/repos";
import { useAuthStore } from "@/auth/store";
import { toastUtility } from "@/shared/utils";

export function useUserInfoQuery(
	accessToken: AuthDetails["accessToken"],
	config?: { enabled: boolean }
) {
	const saveUser = useAuthStore((s) => s.saveUser);
	const loadAccount = useAccountStore((s) => s.loadAccount);

	return useQuery(
		[AuthQueryKeys.userInfo(accessToken)],
		async ({ signal }) => {
			return await AuthNestJSRepository().userInfo(accessToken, signal);
		},
		{
			enabled: config?.enabled,
			onSuccess: (user) => {
				toastUtility.success({ title: `Welcome again ${user.firstName}` });
				saveUser(user);
				loadAccount(user.accountList);
			},
			refetchOnWindowFocus: false,
			retry: false,
		}
	);
}
