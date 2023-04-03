import { Box } from "@chakra-ui/react";

import { PrivateLayout } from "@/auth/components/PrivateLayout";
import { MovementPaymentCreateForm } from "@/movements/components";
import { PageHeading, PrivateContainer } from "@/shared/components";
import { PaymentSvg } from "@/shared/SVG";

const PaymentsPage = () => {
	return (
		<PrivateLayout>
			<PrivateContainer
				as="main"
				display="flex"
				flex="1"
				flexDirection="column"
			>
				<PageHeading>Payments</PageHeading>

				<Box
					display="flex"
					flex="1"
					flexDirection={{ base: "column", md: "row" }}
					justifyContent="center"
					alignItems="center"
					gap="4"
				>
					<PaymentSvg display={{ base: "none", md: "block" }} maxH="lg" />

					<MovementPaymentCreateForm />
				</Box>
			</PrivateContainer>
		</PrivateLayout>
	);
};

export default PaymentsPage;
