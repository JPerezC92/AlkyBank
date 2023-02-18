import { useQuery } from "@tanstack/react-query";

import { AuthQueryKeys } from "@/auth/domain";
import { AuthNestJSRepository } from "@/auth/repos";
import { authStore } from "@/auth/store";
import { toastUtility } from "@/shared/utils";

export function useUserInfoQuery(config?: { enabled: boolean }) {
	const accessToken = authStore((s) => s.accessToken);
	const authLoadingSucceeded = authStore((s) => s.loadingSucceeded);
	const authLoadingStart = authStore((s) => s.loadingStart);
	const authLoadingFailed = authStore((s) => s.loadingFailed);
	const saveUser = authStore((s) => s.saveUser);

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
			},
			onError: () => {
				authLoadingFailed();
			},
			refetchOnWindowFocus: false,
			// refetchOnMount: false,
			retry: false,
		}
	);
}
