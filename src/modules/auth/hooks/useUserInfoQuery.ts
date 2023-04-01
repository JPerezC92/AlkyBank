import { useQuery } from "@tanstack/react-query";

import { useAccountStore } from "@/accounts/store";
import { AuthQueryKeys } from "@/auth/domain";
import { AuthNestJSRepository } from "@/auth/repos";
import { useAuthStore } from "@/auth/store";
import { toastUtility } from "@/shared/utils";

export function useUserInfoQuery(config?: { enabled: boolean }) {
	const accessToken = useAuthStore((s) => s.accessToken);
	const authLoadingSucceeded = useAuthStore((s) => s.loadingSucceeded);
	const authLoadingStart = useAuthStore((s) => s.loadingStart);
	const authLoadingFailed = useAuthStore((s) => s.loadingFailed);
	const saveUser = useAuthStore((s) => s.saveUser);
	const loadAccount = useAccountStore((s) => s.loadAccount);

	return useQuery(
		[AuthQueryKeys.userInfo()],
		async ({ signal }) => {
			authLoadingStart();
			return await AuthNestJSRepository().userInfo(accessToken, signal);
		},
		{
			enabled: config?.enabled,
			onSuccess: (user) => {
				toastUtility.success({ title: `Welcome again ${user.firstName}` });
				saveUser(user);
				authLoadingSucceeded();
				loadAccount(user.accountList);
			},
			onError: () => {
				authLoadingFailed();
			},
			refetchOnWindowFocus: false,
			retry: false,
		}
	);
}
