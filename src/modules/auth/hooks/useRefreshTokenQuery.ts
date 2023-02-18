import { useQuery } from "@tanstack/react-query";
import React from "react";

import { AuthQueryKeys } from "@/auth/domain";
import { AuthNestJSRepository, CookieRepository } from "@/auth/repos";
import { authStore } from "@/auth/store";
import { toastUtility } from "@/shared/utils";

export const useRefreshTokenQuery = (config?: { enabled: boolean }) => {
	const [isClient, setIsClient] = React.useState(false);
	const authLoadingStart = authStore((s) => s.loadingStart);

	const authLoadingFailed = authStore((s) => s.loadingFailed);
	const saveAccessToken = authStore((s) => s.saveAccessToken);

	React.useEffect(() => {
		setIsClient(true);
	}, []);

	return useQuery(
		[AuthQueryKeys.refreshToken()],
		async ({ signal }) => {
			authLoadingStart();
			return await AuthNestJSRepository().refreshToken(signal);
		},
		{
			enabled: isClient && config?.enabled,
			refetchOnWindowFocus: false,
			retry: false,
			onSuccess: (accessToken) => {
				saveAccessToken(accessToken);
			},
			onError: () => {
				authLoadingFailed();

				const refreshToken = CookieRepository.find("AUTH_REFRESH_TOKEN");
				if (!refreshToken) return;

				CookieRepository.remove("AUTH_REFRESH_TOKEN");
				toastUtility.info({ title: `Session expired` });
			},
		}
	);
};
