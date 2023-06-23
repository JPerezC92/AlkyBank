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

import { isApiError, toastUtility } from "@/shared/utils";
import { User, UserUpdate } from "@/users/domain";
import { UsersNestJSRepository, UsersRepository } from "@/users/repos";
import { userCreate } from "@/users/schemas";

type EditFormProps = {
	user: User;
	usersRepository?: UsersRepository;
} & React.ComponentProps<typeof chakra.form>;

const UserEditScheme = userCreate
	.pick({
		firstName: true,
		lastName: true,
		email: true,
	})
	.and(
		z.object({
			confirmEmail: z.string().email(),
		})
	)
	.superRefine((data, ctx) => {
		if (data.email !== data.confirmEmail) {
			return ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Emails do not match",
				path: ["confirmEmail"],
			});
		}
		return true;
	});

export const EditForm: React.FC<EditFormProps> = ({
	user,
	usersRepository = UsersNestJSRepository(),
	...props
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<UserUpdate>({
		resolver: zodResolver(UserEditScheme),
		mode: "all",
		values: {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			confirmEmail: user.email,
		},
	});

	const { mutate: onSubmit } = useMutation({
		mutationFn: async (userCreate: UserUpdate) => {
			await usersRepository.update(user.id, userCreate);
		},
		onSuccess: () => {
			toastUtility.success({ title: "Information updated" });
		},
		onError: (e) => {
			if (!isApiError(e)) return toastUtility.errorDefault();

			toastUtility.error({ title: "Update failed", description: e.message });
		},
	});

	return (
		<chakra.form
			display="flex"
			flexDirection="column"
			gap={2}
			onSubmit={handleSubmit((values) => onSubmit(values))}
			{...props}
		>
			<FormControl isInvalid={!!errors?.firstName?.message}>
				<FormLabel>First name</FormLabel>
				<Input
					{...register("firstName")}
					autoFocus
					variant="outline"
					focusBorderColor="primary.500"
					isInvalid={!!errors?.firstName?.message}
					borderColor="primary.100"
				/>
				<FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors?.lastName?.message}>
				<FormLabel>Last name</FormLabel>
				<Input
					{...register("lastName")}
					variant="outline"
					focusBorderColor="primary.500"
					isInvalid={!!errors?.lastName?.message}
					borderColor="primary.100"
				/>
				<FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors?.email?.message}>
				<FormLabel>Email</FormLabel>
				<Input
					{...register("email")}
					variant="outline"
					focusBorderColor="primary.500"
					isInvalid={!!errors?.email?.message}
					borderColor="primary.100"
				/>
				<FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors?.confirmEmail?.message}>
				<FormLabel>Confirm email</FormLabel>
				<Input
					{...register("confirmEmail")}
					variant="outline"
					focusBorderColor="primary.500"
					isInvalid={!!errors?.confirmEmail?.message}
					borderColor="primary.100"
				/>
				<FormErrorMessage>{errors?.confirmEmail?.message}</FormErrorMessage>
			</FormControl>

			<Button type="submit" isDisabled={!isValid} colorScheme="primary">
				Submit
			</Button>
		</chakra.form>
	);
};
