import { AuthRepository } from "@/auth/repos";

export const AuthMockRepository = () =>
	({
		login: jest.fn(),
		userInfo: jest.fn(),
		refreshToken: jest.fn(),
	} satisfies AuthRepository);
