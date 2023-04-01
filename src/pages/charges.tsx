import { Box, Divider } from "@chakra-ui/react";

import { PrivateLayout } from "@/auth/components";
import { MovementFormCreateTopup, QuickCharge } from "@/movements/components";
import { PageHeading, PrivateContainer } from "@/shared/components";
import { ChargeMoney } from "@/shared/SVG/ChargeMoney";

const ChargesPage = () => {
	return (
		<PrivateLayout>
			<PrivateContainer
				as="main"
				display="flex"
				flex="1"
				flexDirection="column"
			>
				<PageHeading>Charges</PageHeading>

				<Box
					display="flex"
					flexDirection={{ base: "column", md: "row" }}
					flex="1"
					gap="5"
				>
					<Box flex="1" display="flex" flexDirection="column">
						<QuickCharge
							quickChargeList={[100, 200, 300, 400, 500, 1000, 1500, 2000]}
						/>

						<Box display={{ base: "none", md: "block" }} mt="28">
							<ChargeMoney maxH={{ md: "72", xl: "80" }} />
						</Box>
					</Box>

					<Box>
						<Divider
							my={{ base: "4", md: 0 }}
							borderColor="primary.100"
							height={{ md: "100%" }}
							borderInlineStartWidth={{ md: "1px" }}
						/>
					</Box>

					<Box flex="1" marginBlock="auto">
						<MovementFormCreateTopup marginInline="auto" />
					</Box>
				</Box>
			</PrivateContainer>
		</PrivateLayout>
	);
};

export default ChargesPage;
