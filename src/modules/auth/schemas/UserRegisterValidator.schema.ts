import { z } from 'zod';

import { userRegisterSchema } from './UserRegister.schema';

export const userRegisterValidatorSchema = userRegisterSchema.superRefine(
	(value, ctx) => {
		if (value.password !== value.confirmPassword) {
			return ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Passwords don't match",
				path: ['confirmPassword'],
			});
		}
	},
);
