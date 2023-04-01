import { Box, Divider } from "@chakra-ui/react";

import { PrivateLayout } from "@/auth/components";
import { MovementFormCreateTopup, QuickCharge } from "@/movements/components";
import { PageHeading, PrivateContainer } from "@/shared/components";
import { ChargeMoney } from "@/shared/SVG/ChargeMoney";

const ChargesPage = () => {
	return (
		<PrivateLayout>
			<PrivateContainer paddingX={{ base: "4", xl: 0 }} as="main">
				<PageHeading>Charges</PageHeading>

				<Box
					display="grid"
					gridTemplateColumns={{ base: "1fr", md: "1fr auto 1fr" }}
					gap="5"
				>
					<Box>
						<QuickCharge
							quickChargeList={[100, 200, 300, 400, 500, 1000, 1500, 2000]}
						/>

						<Box display={{ base: "none", md: "block" }} mt="16">
							<ChargeMoney maxH={{ md: "72", xl: "80" }} />
						</Box>
					</Box>

					<Divider
						my={{ base: "4", md: 0 }}
						borderColor="primary.100"
						height={{ md: "100%" }}
						borderInlineStartWidth={{ md: "1px" }}
					/>

					<MovementFormCreateTopup />
				</Box>
			</PrivateContainer>
		</PrivateLayout>
	);
};

export default ChargesPage;
