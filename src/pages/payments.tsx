import { PrivateLayout } from "@/auth/components/PrivateLayout";
import { PageHeading, PrivateContainer } from "@/shared/components";

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
			</PrivateContainer>
		</PrivateLayout>
	);
};

export default PaymentsPage;
