import { UsersRepository } from "@/users/repos";

export const UsersMockRepository = () =>
	({
		create: jest.fn(),
	} satisfies UsersRepository);
