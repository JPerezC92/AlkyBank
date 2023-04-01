import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";

import { LoginForm } from "@/auth/components/LoginForm";
import { AuthLayout } from "@/auth/containers/AuthLayout";
import { PublicRoute } from "@/auth/containers/PublicRoute";

const LoginPage: NextPage = () => {
	return (
		<AuthLayout>
			<PublicRoute>
				<Box
					as="main"
					flex="1"
					height="100%"
					display="flex"
					flexDirection="column"
					paddingBlock="8"
					paddingInline="4"
					position="relative"
				>
					<Box
						position="absolute"
						inset="0"
						transform={{ base: "translateY(-25%)", sm: "translateY(-10rem)" }}
						maxWidth="sm"
						marginInline="auto"
						height="100%"
						zIndex="-1"
					>
						<Image src="/sign-in-img.svg" fill alt="login image" priority />
					</Box>

					<LoginForm
						margin="auto"
						w="full"
						maxWidth="sm"
						borderColor="primary.500"
						borderStyle="solid"
						borderWidth="thin"
						borderRadius="base"
						transform={{ base: "translateY(15%)", sm: "translateY(4rem)" }}
						boxShadow="md"
						padding="6"
					/>
				</Box>
			</PublicRoute>
		</AuthLayout>
	);
};

export default LoginPage;
