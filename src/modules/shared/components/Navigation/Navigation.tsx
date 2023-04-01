import {
	Box,
	Divider,
	IconButton,
	Link,
	List,
	ListItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaHamburger } from "react-icons/fa";

import { AlkybankLogo } from "@/shared/SVG/AlkybankLogo";
import { webRoutes } from "@/shared/utils";

const navList = [
	{ name: "Charges", route: webRoutes.charges() },
	{ name: "Payments", route: webRoutes.payments() },
	{ name: "Balance", route: webRoutes.balance() },
	{ name: "Movements", route: webRoutes.movements() },
	{ name: "Transfer", route: webRoutes.transfers() },
];
type NavState = "active" | "collapsed";

export const Navigation: React.FC = () => {
	const asPath = useRouter().asPath.slice(1) || " ";

	const [navState, onToggleNavState] = React.useState<NavState>("collapsed");

	function _onToggleNavState() {
		onToggleNavState((s) => (s === "collapsed" ? "active" : "collapsed"));
	}

	return (
		<Box bg="primary.500">
			<Box
				as="header"
				margin="auto"
				maxW="container.xl"
				display="flex"
				flexDirection={{ base: "column", md: "row" }}
				p="4"
				paddingInline={{ xl: "0" }}
			>
				<Box display="flex">
					<Link as={NextLink} href={webRoutes.baseRoute}>
						<Box position="relative" maxW="52" color="primary.50">
							<AlkybankLogo />
						</Box>
					</Link>

					<IconButton
						display={{ base: "block", md: "none" }}
						marginInlineStart="auto"
						aria-label="menu button"
						icon={<FaHamburger size={30} />}
						onClick={_onToggleNavState}
						variant="link"
						colorScheme="secondary"
					/>
				</Box>

				<Box
					as={motion.div}
					animate={navState}
					display={{ base: "none", md: "contents !important" }}
					initial={{ display: "none" }}
					variants={{
						active: {
							display: "block",
							opacity: 1,
							height: "auto",
						},
						collapsed: {
							overflow: "hidden",
							opacity: 0,
							height: 0,
							transitionEnd: { display: "none" },
						},
					}}
				>
					<Divider
						borderColor="secondary.500"
						marginBlock="2"
						display={{ base: "block", md: "none" }}
					/>

					<Box
						as="nav"
						marginInlineStart={{ base: "0", md: "auto" }}
						marginBlock="auto"
					>
						<List
							display={{ base: "grid", md: "flex" }}
							gap={{ base: "5", md: "2" }}
							gridTemplateColumns="repeat(auto-fit, minmax(min(100%,15rem),1fr))"
						>
							{navList.map((link) => (
								<ListItem
									data-active={link.route.includes(asPath)}
									key={link.name}
									textAlign="center"
									py="1"
									borderRadius="base"
									transition="all 0.2s ease-in-out"
									px="4"
									color="primary.50"
									sx={{ "&:hover,&[data-active=true] ": { bg: "primary.600" } }}
								>
									<Link as={NextLink} href={link.route} display="block">
										{link.name}
									</Link>
								</ListItem>
							))}
						</List>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
