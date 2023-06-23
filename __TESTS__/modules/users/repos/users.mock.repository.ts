import { UsersRepository } from "@/users/repos";

export const UsersMockRepository = () =>
	({
		create: jest.fn(),
		update: jest.fn(),
	} satisfies UsersRepository);
