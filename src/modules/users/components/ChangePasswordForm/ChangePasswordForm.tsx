import {
	Button,
	chakra,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AuthNestJSRepository, AuthRepository } from "@/auth/repos";
import { isApiError, toastUtility } from "@/shared/utils";
import { ChangeCredentials, User } from "@/users/domain";
import { userCreate } from "@/users/schemas";

type ChangePasswordFormProps = {
	authRepository?: AuthRepository;
	userId: User["id"];
} & React.ComponentProps<typeof chakra.form>;

const ChangePasswordFormScheme = userCreate
	.pick({
		password: true,
	})
	.and(
		z.object({
			newPassword: z
				.string()
				.min(8, "Password must contain at least 8 character(s)"),
			confirmNewPassword: z
				.string()
				.min(8, "Password must contain at least 8 character(s)"),
		})
	)
	.superRefine((data, ctx) => {
		if (data.newPassword !== data.confirmNewPassword) {
			return ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Passwords do not match",
				path: ["confirmNewPassword"],
			});
		}
	});

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
	authRepository = AuthNestJSRepository(),
	userId,
	...props
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ChangeCredentials>({
		resolver: zodResolver(ChangePasswordFormScheme),
		mode: "all",
		values: {
			password: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	});

	const { mutate: onSubmit } = useMutation(
		async (changePassword: ChangeCredentials) => {
			await authRepository.changePassword(userId, changePassword);
		},
		{
			onSuccess: () => {
				toastUtility.success({ title: "Password changed successfully" });
			},
			onError: (e) => {
				if (!isApiError(e)) return toastUtility.errorDefault();

				toastUtility.error({
					title: "Password update failed",
					description: e.message,
				});
			},
		}
	);

	return (
		<chakra.form
			display="flex"
			flexDirection="column"
			gap={2}
			onSubmit={handleSubmit((data) => onSubmit(data))}
			{...props}
		>
			<FormControl isInvalid={!!errors.password?.message}>
				<FormLabel>Password</FormLabel>
				<Input
					{...register("password")}
					type="password"
					variant="outline"
					focusBorderColor="primary.500"
					isInvalid={!!errors?.password?.message}
					borderColor="primary.100"
				/>
				<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors.newPassword?.message}>
				<FormLabel>New Password</FormLabel>
				<Input
					{...register("newPassword")}
					type="password"
					variant="outline"
					focusBorderColor="primary.500"
					isInvalid={!!errors?.newPassword?.message}
					borderColor="primary.100"
				/>
				<FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors.confirmNewPassword?.message}>
				<FormLabel>Confirm Password</FormLabel>
				<Input
					{...register("confirmNewPassword")}
					type="password"
					variant="outline"
					focusBorderColor="primary.500"
					isInvalid={!!errors?.confirmNewPassword?.message}
					borderColor="primary.100"
				/>
				<FormErrorMessage>
					{errors.confirmNewPassword?.message}
				</FormErrorMessage>
			</FormControl>

			<Button type="submit" colorScheme="primary" isDisabled={!isValid}>
				Submit
			</Button>
		</chakra.form>
	);
};
