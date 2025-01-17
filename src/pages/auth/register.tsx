import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";

import { PublicLayout, RegisterForm } from "@/auth/components";

const RegisterPage: NextPage = () => {
	return (
		<PublicLayout>
			<Box
				as="main"
				height="100%"
				display="flex"
				flex="1"
				flexDirection="column"
				paddingBlock="8"
				paddingInline="4"
				justifyContent="center"
				alignItems="center"
			>
				<Box
					position="absolute"
					inset="0"
					visibility={{ base: "hidden", md: "visible" }}
					transform={{ md: "translateX(-13rem)" }}
					maxWidth="lg"
					marginInline="auto"
					height="100%"
					zIndex="-1"
				>
					<Image src="/sign-up-img.svg" alt="sign in image" fill priority />
				</Box>

				<RegisterForm
					margin="auto"
					w="full"
					maxWidth="sm"
					borderColor="primary.500"
					borderStyle="solid"
					borderWidth="thin"
					borderRadius="base"
					transform={{ md: "translateX(11rem)" }}
					boxShadow="md"
					padding="6"
				/>
			</Box>
		</PublicLayout>
	);
};

export default RegisterPage;
