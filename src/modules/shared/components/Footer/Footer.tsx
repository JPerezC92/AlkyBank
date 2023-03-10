import { Box, Heading, Link, List, ListItem, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";

export const Footer: React.FC = () => {
	return (
		<Box bg="primary.500">
			<Box
				as="footer"
				display="flex"
				maxW="container.xl"
				color="primary.50"
				flexDirection={{ base: "column", md: "row" }}
				justifyContent="space-between"
				padding={{ base: "4" }}
				paddingInline={{ xl: "0" }}
				margin="auto"
				gap="10"
			>
				<Box as="section">
					<Heading as="h5" size="sm">
						Contacto:
					</Heading>

					<List className="space-y-1">
						{[
							"324 567 89 90",
							"Cl. Manuela Del Valle # 5694",
							"Horacio Sur, Perú",
						].map((value) => (
							<ListItem key={value}>
								<Text>{value}</Text>
							</ListItem>
						))}
					</List>
				</Box>

				<Box as="section">
					<Heading as="h5" size="sm">
						Resource:
					</Heading>
					<List>
						{["Términos de Servicio", "Privacidad", "PQRS"].map((v) => (
							<ListItem key={v}>
								<NextLink href="#" legacyBehavior passHref>
									<Link>{v}</Link>
								</NextLink>
							</ListItem>
						))}
					</List>
				</Box>

				<Box as="section">
					<Box position="relative" h="14" w="56">
						<Image src="/alkybank_logo2.svg" alt="logo" fill />
					</Box>
					<Text>&copy; {new Date().getFullYear()} All rights reserved</Text>
				</Box>
			</Box>
		</Box>
	);
};
