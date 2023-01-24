import { z } from 'zod';

export const userRegisterSchema = z.object({
	firstName: z
		.string()
		.min(1, { message: 'First name cannot be empty' })
		.max(50),
	lastName: z.string().min(1, { message: 'Last name cannot be empty' }).max(50),
	email: z
		.string()
		.email({ message: 'Looks like this is not an email' })
		.max(50),
	password: z.string().min(1, { message: 'Password cannot be empty' }).max(50),
	confirmPassword: z
		.string()
		.min(1, { message: 'Confirm password cannot be empty' }),
});

export type UserRegister = z.infer<typeof userRegisterSchema>;
