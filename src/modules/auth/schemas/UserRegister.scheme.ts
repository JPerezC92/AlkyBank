import z from "zod";

import { userCreate } from "@/users/schemas/UserCreate.schema";

export const UserRegisterScheme = userCreate
	.merge(
		z.object({
			confirmPassword: z.string().min(8, "Required"),
		})
	)
	.superRefine((values, ctx) => {
		if (values.confirmPassword !== values.password) {
			return ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Passwords doesn't match",
				path: ["confirmPassword"],
			});
		}
	});

export type UserRegisterScheme = z.infer<typeof UserRegisterScheme>;
