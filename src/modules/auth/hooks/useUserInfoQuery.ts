import { useQuery } from "@tanstack/react-query";

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
