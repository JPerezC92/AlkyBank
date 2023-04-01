import React from "react";

import { useRefreshTokenQuery, useUserInfoQuery } from "@/auth/hooks";
import { AuthRepository, CookieRepository } from "@/auth/repos";
import { useAuthStore } from "@/auth/store";
import { SpinnerHide, SpinnerShow } from "@/shared/components";
import { MyRepo } from "@/shared/repos";

type AuthLayoutProps = {
	children: React.ReactNode;
	authRepository?: MyRepo<AuthRepository>;
	cookieRepository?: CookieRepository;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
	const authLoadingStatus = useAuthStore((s) => s.loadingStatus);
	const accessToken = useAuthStore((s) => s.accessToken);

	const refreshTokenQuery = useRefreshTokenQuery({
		enabled: authLoadingStatus === "idle" && !isAuthenticated && !accessToken,
	});

	const userInfoQuery = useUserInfoQuery({
		enabled:
			!!accessToken &&
			!refreshTokenQuery.isLoading &&
			(authLoadingStatus === "idle" || authLoadingStatus === "loading"),
	});

	const isActiveSpinner =
		userInfoQuery.fetchStatus !== "idle" ||
		refreshTokenQuery.fetchStatus !== "idle";

	return (
		<>
			{isActiveSpinner ? <SpinnerShow /> : <SpinnerHide />}

			{children}
		</>
	);
};
