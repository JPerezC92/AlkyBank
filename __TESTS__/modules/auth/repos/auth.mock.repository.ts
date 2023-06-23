import { AuthRepository } from "@/auth/repos";

export const AuthMockRepository = () =>
	({
		login: jest.fn(),
		userInfo: jest.fn(),
		refreshToken: jest.fn(),
		logout: jest.fn(),
		changePassword: jest.fn(),
	} satisfies AuthRepository);
