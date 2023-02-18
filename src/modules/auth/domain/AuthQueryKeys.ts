export const AuthQueryKeys = {
	all: ["Auth"],
	userInfo: () => [...AuthQueryKeys.all, "UserInfo"] as const,
	refreshToken: () => [...AuthQueryKeys.all, "RefreshToken"] as const,
} as const;
