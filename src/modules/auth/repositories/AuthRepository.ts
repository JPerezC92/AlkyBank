import * as AuthSchemas from '@/Auth/schemas';
import { EnvVariables } from '@/modules/shared/utils/environmentVarialbles';

export interface AuthRepository {
	register: (
		userRegister: AuthSchemas.UserRegister,
		abortSignal?: AbortSignal,
	) => Promise<AuthSchemas.UserEndpoint>;
}

interface Repository<T> {
	(abortSignal?: AbortSignal): T;
}

export const AuthNestRepository: Repository<AuthRepository> = (
	abortSignal?: AbortSignal,
) => {
	const baseUrl = EnvVariables.API_URL + '/auth';
	return {
		register: async (userRegister, _abortSignal) => {
			const response = await fetch(baseUrl, {
				method: 'POST',
				signal: abortSignal || _abortSignal,
				body: JSON.stringify(userRegister),
				headers: {
					accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});

			const result = await response.json();

			const validated = AuthSchemas.UserEndpoint.safeParse(result);

			if (!validated.success) {
				throw result;
			}

			return validated.data;
		},
	};
};
