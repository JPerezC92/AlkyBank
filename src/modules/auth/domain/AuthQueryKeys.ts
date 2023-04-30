import { AuthDetails } from "@/auth/domain";

export const AuthQueryKeys = {
	all: ["Auth"],
	userInfo: (accessToken: AuthDetails["accessToken"]) =>
		[...AuthQueryKeys.all, "UserInfo", accessToken] as const,
	refreshToken: (refreshToken: AuthDetails["refreshToken"]) =>
		[...AuthQueryKeys.all, "RefreshToken", refreshToken] as const,
} as const;
