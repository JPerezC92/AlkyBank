import { AuthRepository } from '@/Auth/repositories';
import * as AuthSchemas from '@/Auth/schemas';

export const AuthMockRepository = () =>
	({
		register: jest.fn<
			Promise<AuthSchemas.UserEndpoint>,
			[userRegister: AuthSchemas.UserRegister, abortSignal?: AbortSignal]
		>(),
	} satisfies AuthRepository);
