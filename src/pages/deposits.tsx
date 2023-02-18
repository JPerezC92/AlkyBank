import { Button, Heading } from "@chakra-ui/react";

import { PrivateLayout } from "@/auth/components";

const DepositsPage = () => {
	return (
		<PrivateLayout>
			<main>
				<Heading>deposits</Heading>

				<Button>20</Button>
			</main>
		</PrivateLayout>
	);
};

export default DepositsPage;
