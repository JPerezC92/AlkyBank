import { Box } from "@chakra-ui/react";
import { NextPage } from "next";

import { RegisterForm } from "@/auth/components/RegisterForm";

const RegisterPage: NextPage = () => {
	return (
		<Box
			as="main"
			height="100%"
			display="flex"
			flexDirection="column"
			paddingBlock="8"
			paddingInline="4"
		>
			<RegisterForm margin="auto" width="full" />
		</Box>
	);
};

export default RegisterPage;
