import { Box } from "@chakra-ui/react";

import {
	AccountFindTransferenceDetailsForm,
	AccountTransferenceInfo,
} from "@/accounts/components";
import { accountTransferenceReceiver$ } from "@/accounts/observables";
import { PrivateLayout } from "@/auth/components";
import { MovementTransferCreateForm } from "@/movements/components";
import { PageHeading, PrivateContainer } from "@/shared/components";
import { TransferenceSvg } from "@/shared/SVG/TransferenceSvg";

const TransfersPage = () => {
	return (
		<PrivateLayout>
			<PrivateContainer
				as="main"
				display="flex"
				flex="1"
				flexDirection="column"
			>
				<PageHeading>Transfers</PageHeading>

				<Box
					display="flex"
					flex="1"
					justifyContent="space-evenly"
					flexDirection={{ base: "column", md: "row" }}
					gap="4"
				>
					<TransferenceSvg
						display={{ base: "none", xl: "block" }}
						maxH="sm"
						my="auto"
					/>

					<Box
						alignSelf="center"
						display="flex"
						flexDirection="column"
						gap="10"
						width="full"
						maxW={{ md: "sm" }}
					>
						<AccountFindTransferenceDetailsForm
							accountTransferReceiverSubject={accountTransferenceReceiver$}
						/>

						<AccountTransferenceInfo
							accountTransferReceiverSubject={accountTransferenceReceiver$}
							padding="4"
							bg="accent.50"
							borderRadius="base"
							borderColor="accent.300"
							borderWidth="1px"
							display="flex"
							flexDirection="column"
							gap="2"
						/>
					</Box>

					<MovementTransferCreateForm
						accountTransferReceiverSubject={accountTransferenceReceiver$}
						alignSelf="center"
					/>
				</Box>
			</PrivateContainer>
		</PrivateLayout>
	);
};

export default TransfersPage;
