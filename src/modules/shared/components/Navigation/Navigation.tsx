import {
	Box,
	chakra,
	Divider,
	IconButton,
	Link,
	List,
	ListItem,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Select,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaHamburger, FaUser } from "react-icons/fa";
import { IoMdLogOut, IoMdSettings } from "react-icons/io";

import { useAccountStore } from "@/accounts/store";
import { AuthDetails } from "@/auth/domain";
import {
	AuthNestJSRepository,
	CookieKeys,
	CookieRepository,
} from "@/auth/repos";
import { useAuthStore } from "@/auth/store";
import { EnumType, EnumTypeInfer } from "@/shared/domain";
import { AlkybankLogo } from "@/shared/SVG/AlkybankLogo";
import { webRoutes } from "@/shared/utils";

const navList = [
	{ name: "Home", route: webRoutes.baseRoute },
	{ name: "Charges", route: webRoutes.charges() },
	{ name: "Payments", route: webRoutes.payments() },
	{ name: "Balance", route: webRoutes.balance() },
	{ name: "Movements", route: webRoutes.movements() },
	{ name: "Transfer", route: webRoutes.transfers() },
];

const NavState = EnumType("active", "collapsed");
type NavState = EnumTypeInfer<typeof NavState>;

export const Navigation = () => {
	const authStoreLogout = useAuthStore((s) => s.logout);
	const user = useAuthStore((s) => s.user);
	const asPath = useRouter().asPath.slice(1) || " ";
	const accountActive = useAccountStore((s) => s.accountActive);
	const changeAccount = useAccountStore((s) => s.changeAccount);
	const [navState, onToggleNavState] = React.useState<NavState>(
		NavState.values.collapsed
	);

	function _onToggleNavState() {
		onToggleNavState((s) =>
			s === NavState.values.collapsed
				? NavState.values.active
				: NavState.values.collapsed
		);
	}

	function onSelectLink() {
		onToggleNavState(NavState.values.collapsed);
	}

	async function handleLogout() {
		await AuthNestJSRepository().logout(
			CookieRepository.find(
				CookieKeys.refreshToken
			) as AuthDetails["refreshToken"]
		);
		CookieRepository.remove(CookieKeys.refreshToken);
		authStoreLogout();
	}

	function handleChangeAccount(e: React.ChangeEvent<HTMLSelectElement>) {
		const account = user?.accountList.find(
			(account) => account.id === e.target.value
		);

		if (!account) return;
		changeAccount(account);
	}

	return (
		<Box bg="primary.500">
			<Box
				as="header"
				margin="auto"
				maxW="container.xl"
				display="flex"
				flexDirection="row"
				flexWrap="wrap"
				p="4"
				alignItems="center"
				paddingInline={{ xl: "0" }}
			>
				<IconButton
					display={{ base: "block", md: "none" }}
					aria-label="menu button"
					icon={<FaHamburger size={30} />}
					onClick={_onToggleNavState}
					variant="link"
					colorScheme="secondary"
				/>

				<Link as={NextLink} href={webRoutes.baseRoute} marginInlineEnd="auto">
					<Box
						position="relative"
						maxW={{ base: "36", lg: "52" }}
						color="primary.50"
					>
						<AlkybankLogo />
					</Box>
				</Link>

				<Box
					display="flex"
					order={{ base: "4", md: "4" }}
					marginInlineStart="4"
				>
					<Menu>
						<MenuButton
							as={IconButton}
							borderRadius="full"
							variant="link"
							borderColor="secondary.300"
							borderWidth="2px"
							colorScheme="accent"
							_active={{ color: "secondary.500" }}
							color="secondary.300"
							aria-label="user options"
							verticalAlign="middle"
							w="2.5rem"
							h="2.5rem"
							icon={<FaUser size={15} />}
						>
							Actions
						</MenuButton>
						<MenuList>
							<MenuItem
								icon={<IoMdSettings />}
								color="secondary.800"
								fontWeight="semibold"
								as={NextLink}
								href={"/configuration"}
							>
								Configuration
							</MenuItem>
							<MenuItem
								icon={<IoMdLogOut />}
								color="danger.400"
								fontWeight="semibold"
								onClick={handleLogout}
							>
								Logout
							</MenuItem>
						</MenuList>
					</Menu>
				</Box>

				<Box order="2">
					<Select
						colorScheme="accent"
						variant="filled"
						bg="accent.100"
						_focus={{ bg: "accent.100" }}
						onChange={handleChangeAccount}
						value={accountActive?.id}
					>
						{user?.accountList?.map((account) => (
							<chakra.option key={account.id} value={account.id} color="black">
								{account.currency}
							</chakra.option>
						))}
					</Select>
				</Box>
				<Box
					width="100%"
					order="5"
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

					<Box as="nav" marginBlock="auto">
						<List
							display={{ base: "grid", md: "flex" }}
							gap={{ base: "5", md: "1" }}
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
									px={{ base: "2", lg: "4" }}
									color="primary.50"
									sx={{ "&:hover,&[data-active=true] ": { bg: "primary.600" } }}
								>
									<Link
										as={NextLink}
										onClick={onSelectLink}
										href={link.route}
										display="block"
										fontSize="smaller"
										fontWeight="semibold"
									>
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
