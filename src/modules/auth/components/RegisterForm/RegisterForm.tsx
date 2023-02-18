import {
	Button,
	chakra,
	ChakraProps,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

import { UserRegisterScheme } from "@/auth/schemas";
import { FormButtonDivider } from "@/shared/components";
import { isApiError } from "@/shared/utils/isApiError";
import { toastUtility } from "@/shared/utils/toastUtil";
import { webRoutes } from "@/shared/utils/web.routes";
import { UsersNestJSRepository } from "@/users/repos";
import { UsersRepository } from "@/users/repos/UsersRepository";
import { UserCreate } from "@/users/schemas/UserCreate.schema";

type RegisterFormProps = {
	usersRepository?: UsersRepository;
} & ChakraProps;

export const RegisterForm: React.FC<RegisterFormProps> = ({
	usersRepository = UsersNestJSRepository(),
	...props
}) => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserRegisterScheme>({
		resolver: zodResolver(UserRegisterScheme),
		mode: "all",
	});

	const { mutate: onSubmit } = useMutation({
		mutationFn: async (userCreate: UserCreate) => {
			await usersRepository.create(userCreate);
		},
		onSuccess: () => {
			toastUtility.success({ title: "Register Successfully" });
			router.push({ pathname: webRoutes.auth.login() });
		},
		onError: (e) => {
			if (!isApiError(e)) return;

			toastUtility.error({ title: "Register failed", description: e.message });
		},
	});

	return (
		<chakra.form
			display="flex"
			flexDirection="column"
			bg="bg1"
			gap="2"
			{...props}
			onSubmit={handleSubmit((values) => onSubmit(values))}
		>
			<Heading textAlign="center">Sign up</Heading>

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

			<FormControl isInvalid={!!errors.lastName?.message}>
				<FormLabel>Last name</FormLabel>
				<Input
					{...register("lastName")}
					variant="outline"
					focusBorderColor="primary.500"
					isInvalid={!!errors?.lastName?.message}
					borderColor="primary.100"
				/>
				<FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors.email?.message}>
				<FormLabel>Email</FormLabel>
				<Input
					{...register("email")}
					variant="outline"
					focusBorderColor="primary.500"
					isInvalid={!!errors?.email?.message}
					borderColor="primary.100"
				/>
				<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
			</FormControl>

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

			<FormControl isInvalid={!!errors.confirmPassword?.message}>
				<FormLabel>Confirm password</FormLabel>
				<Input
					{...register("confirmPassword")}
					type="password"
					variant="outline"
					focusBorderColor="primary.500"
					isInvalid={!!errors?.confirmPassword?.message}
					borderColor="primary.100"
				/>
				<FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
			</FormControl>

			<Button
				variant="solid"
				type="submit"
				colorScheme="primary"
				marginBlockStart="3"
			>
				Register
			</Button>

			<FormButtonDivider />

			<Link href={webRoutes.auth.login()} legacyBehavior passHref>
				<Button as="a" colorScheme="secondary" type="submit">
					Log in
				</Button>
			</Link>
		</chakra.form>
	);
};
