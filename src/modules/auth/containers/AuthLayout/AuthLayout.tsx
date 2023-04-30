import React from "react";

import { AuthDetails } from "@/auth/domain";
import { useRefreshTokenQuery, useUserInfoQuery } from "@/auth/hooks";
import { AuthRepository, CookieKeys, CookieRepository } from "@/auth/repos";
import { useAuthStore } from "@/auth/store";
import { useIsClient } from "@/shared/hooks";
import { MyRepo } from "@/shared/repos";

interface ChildrenProps {
	isLoading: boolean;
	isAuthenticated: boolean;
}

type AuthLayoutProps = {
	children: (props: ChildrenProps) => React.ReactNode;
	authRepository?: MyRepo<AuthRepository>;
	cookieRepository?: CookieRepository;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
	const isClient = useIsClient();

	const accessToken = useAuthStore((s) => s.accessToken);
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

	const refreshTokenCookie = CookieRepository.find(CookieKeys.refreshToken);
	const refreshTokenQuery = useRefreshTokenQuery(
		refreshTokenCookie as AuthDetails["refreshToken"],
		{ enabled: isClient && !accessToken && !!refreshTokenCookie }
	);

	const isAccessTokenDefined = !!accessToken || !!refreshTokenQuery.data;
	const _accessToken = accessToken || refreshTokenQuery.data;

	const userInfoQuery = useUserInfoQuery(
		_accessToken as AuthDetails["accessToken"],
		{ enabled: isAccessTokenDefined && !isAuthenticated }
	);

	return (
		<>
			{children({
				isAuthenticated,
				isLoading:
					!isClient || refreshTokenQuery.isFetching || userInfoQuery.isFetching,
			})}
		</>
	);
};
