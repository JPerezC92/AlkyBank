import { useQuery } from "@tanstack/react-query";

import { AuthDetails, AuthQueryKeys } from "@/auth/domain";
import { AuthNestJSRepository, CookieRepository } from "@/auth/repos";
import { useAuthStore } from "@/auth/store";
import { toastUtility } from "@/shared/utils";

export const useRefreshTokenQuery = (
	refreshToken: AuthDetails["refreshToken"],
	config?: { enabled: boolean }
) => {
	const saveAccessToken = useAuthStore((s) => s.saveAccessToken);

	return useQuery(
		[AuthQueryKeys.refreshToken(refreshToken)],
		async ({ signal }) => {
			return await AuthNestJSRepository().refreshToken(refreshToken, signal);
		},
		{
			enabled: config?.enabled,
			refetchOnWindowFocus: false,
			retry: false,
			onSuccess: (accessToken) => {
				saveAccessToken(accessToken);
			},
			onError: () => {
				const refreshToken = CookieRepository.find("AUTH_REFRESH_TOKEN");
				if (!refreshToken) return;

				CookieRepository.remove("AUTH_REFRESH_TOKEN");
				toastUtility.info({ title: `Session expired` });
			},
		}
	);
};
