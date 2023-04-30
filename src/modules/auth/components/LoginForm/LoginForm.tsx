import {
	Button,
	chakra,
	ChakraProps,
	FormControl,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

import { AuthNestJSRepository, AuthRepository } from "@/auth/repos";
import { Credentials } from "@/auth/schemas";
import { useAuthStore } from "@/auth/store";
import { FormButtonDivider } from "@/shared/components";
import { useForm } from "@/shared/hooks";
import { isApiError, toastUtility, webRoutes } from "@/shared/utils";

type LoginFormProps = {
	authRepository?: AuthRepository;
} & ChakraProps;

export const LoginForm: React.FC<LoginFormProps> = ({
	authRepository = AuthNestJSRepository(),
	...props
}) => {
	const saveAccessToken = useAuthStore((s) => s.saveAccessToken);

	const submit = useMutation({
		mutationFn: async (credentials: Credentials) => {
			const accessToken = await authRepository.login(credentials);
			saveAccessToken(accessToken);
		},

		onError: (e) => {
			if (!isApiError(e)) return toastUtility.errorDefault();

			toastUtility.error({
				title: "Authentication failed",
				description: e.message,
			});
		},
	});

	const { onChange, onSubmit, values } = useForm<Credentials>({
		values: { email: "jperez.c92@gmail.com", password: "123456aA-" },
		onSubmit: (credentials) => submit.mutate(credentials),
	});

	return (
		<chakra.form
			display="flex"
			flexDirection="column"
			bg="bg1"
			gap="2"
			{...props}
			onSubmit={onSubmit}
		>
			<Heading as="h1" textAlign="center">
				Login
			</Heading>

			<FormControl>
				<FormLabel>Email</FormLabel>
				<Input
					autoFocus
					variant="outline"
					focusBorderColor="primary.500"
					onChange={onChange}
					value={values.email}
					name="email"
				/>
			</FormControl>

			<FormControl>
				<FormLabel>Password</FormLabel>
				<Input
					type="password"
					variant="outline"
					focusBorderColor="primary.500"
					onChange={onChange}
					value={values.password}
					name="password"
				/>
			</FormControl>

			<Button colorScheme="primary" type="submit" marginBlockStart="3">
				Enter
			</Button>

			<FormButtonDivider />

			<Link href={webRoutes.auth.register()} legacyBehavior passHref>
				<Button as="a" colorScheme="secondary" type="submit">
					Register
				</Button>
			</Link>
		</chakra.form>
	);
};
