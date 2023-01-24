import { z } from 'zod';

import { userRegisterSchema } from './UserRegister.schema';

export const UserEndpoint = z
	.object({
		id: z.string().min(1),
		updatedAt: z
			.string()
			.datetime()
			.transform(value => new Date(value)),
		createdAt: z
			.string()
			.datetime()
			.transform(value => new Date(value)),
	})
	.merge(userRegisterSchema.omit({ confirmPassword: true, password: true }));

export type UserEndpoint = z.infer<typeof UserEndpoint>;
