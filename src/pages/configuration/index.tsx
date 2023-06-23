import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	chakra,
	Divider,
	Heading,
} from "@chakra-ui/react";

import { AccountCreate } from "@/accounts/components";
import { PrivateLayout } from "@/auth/components";
import { useAuthenticatedStore } from "@/auth/store";
import { PageHeading, PrivateContainer } from "@/shared/components";
import { NextPageWithLayout } from "@/shared/utils";
import { ChangePasswordForm, EditForm } from "@/users/components";

const ConfigurationPage: NextPageWithLayout = () => {
	const { user } = useAuthenticatedStore();

	return (
		<PrivateContainer flex="1">
			<PageHeading>Settings</PageHeading>

			<Accordion allowMultiple>
				<AccordionItem mb={6} borderColor="primary.400">
					<Heading as="h2" size="xl">
						<AccordionButton fontSize="inherit">
							<Box as="span" flex="1" textAlign="left">
								Perfil
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</Heading>
					<AccordionPanel px={1}>
						<Divider mb={4} borderColor="primary.400" />

						<EditForm user={user} maxW="xs" />
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem mb={6} borderColor="primary.400">
					<Heading as="h2" size="xl">
						<AccordionButton fontSize="inherit">
							<Box as="span" flex="1" textAlign="left">
								Change Password
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</Heading>
					<AccordionPanel px={1}>
						<chakra.section pb={4}>
							<Divider mb={4} borderColor="primary.400" />

							<ChangePasswordForm maxW="xs" userId={user?.id} />
						</chakra.section>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem mb={6} borderColor="primary.400">
					<Heading as="h2" size="xl">
						<AccordionButton fontSize="inherit">
							<Box as="span" flex="1" textAlign="left">
								Create Wallet
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</Heading>
					<AccordionPanel pb={4}>
						<Divider mb={4} borderColor="primary.400" />

						<AccountCreate maxW="xs" />
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</PrivateContainer>
	);
};

ConfigurationPage.getLayout = function getLayout(page) {
	return <PrivateLayout>{page}</PrivateLayout>;
};

export default ConfigurationPage;
