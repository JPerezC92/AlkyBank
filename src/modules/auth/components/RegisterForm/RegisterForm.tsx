import {
	Button,
	chakra,
	ChakraProps,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const UserRegister = z
	.object({
		firstName: z.string().min(1, "Required"),
		lastName: z.string().min(1, "Required"),
		email: z.string().min(1, "Required").email(),
		password: z
			.string()
			.min(8, "Password must contain at least 8 character(s)"),
		confirmPassword: z
			.string()
			.min(8, "Password must contain at least 8 character(s)"),
	})
	.superRefine((values, ctx) => {
		if (values.confirmPassword !== values.password) {
			return ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Passwords doesn't match",
				path: ["confirmPassword"],
			});
		}
	});

type UserRegisterV = z.infer<typeof UserRegister>;

type RegisterFormProps = {
	className?: string;
} & ChakraProps;

export const RegisterForm: React.FC<RegisterFormProps> = ({ ...props }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserRegisterV>({
		resolver: zodResolver(UserRegister),
		mode: "all",
	});
	// const onSubmit = (data) => console.log(data);
	return (
		<>
			<chakra.form
				maxWidth={{ base: "xs", sm: "sm" }}
				display="flex"
				flexDirection="column"
				gap="5"
				{...props}
				onSubmit={handleSubmit(console.log)}
			>
				<Heading textAlign="center">Register</Heading>

				<FormControl>
					<FormLabel>First name</FormLabel>
					<Input
						{...register("firstName")}
						variant="outline"
						focusBorderColor="primary.500"
						isInvalid={!!errors?.firstName?.message}
					/>
					<FormHelperText>
						<>{errors?.firstName?.message}</>
					</FormHelperText>
				</FormControl>

				<FormControl>
					<FormLabel>Last name</FormLabel>
					<Input
						{...register("lastName")}
						variant="outline"
						focusBorderColor="primary.500"
						isInvalid={!!errors?.lastName?.message}
					/>
					<FormHelperText>{errors.lastName?.message}</FormHelperText>
				</FormControl>

				<FormControl>
					<FormLabel>Email</FormLabel>
					<Input
						{...register("email")}
						variant="outline"
						focusBorderColor="primary.500"
						isInvalid={!!errors?.email?.message}
					/>
					<FormHelperText>{errors.email?.message}</FormHelperText>
				</FormControl>

				<FormControl>
					<FormLabel>Password</FormLabel>
					<Input
						{...register("password")}
						type="password"
						variant="outline"
						focusBorderColor="primary.500"
						isInvalid={!!errors?.password?.message}
					/>
					<FormHelperText>{errors.password?.message}</FormHelperText>
				</FormControl>

				<FormControl>
					<FormLabel>Confirm password</FormLabel>
					<Input
						{...register("confirmPassword")}
						type="password"
						variant="outline"
						focusBorderColor="primary.500"
						isInvalid={!!errors?.confirmPassword?.message}
					/>
					<FormHelperText>{errors.confirmPassword?.message}</FormHelperText>
				</FormControl>

				<Button
					variant="solid"
					type="submit"
					colorScheme="primary"
					width="full"
				>
					Register
				</Button>
			</chakra.form>
		</>
	);
};
