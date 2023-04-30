import { List, ListItem, Skeleton } from "@chakra-ui/react";
import React from "react";

import { AccountBalanceCard } from "@/accounts/components";
import { AccountsRepository } from "@/accounts/domain";
import { useAccountFindQuery } from "@/accounts/hooks";
import { useAccountStore } from "@/accounts/store";
import { PrivateLayout } from "@/auth/components";
import { PageHeading, PrivateContainer } from "@/shared/components";
import { BalanceSvg, IncomeSvg, PaymentSvg } from "@/shared/SVG";
import { forInRange, NextPageWithLayout } from "@/shared/utils";

interface BalancePageProps {
	accountsRepository?: AccountsRepository;
}

const BalancePage: NextPageWithLayout = ({
	accountsRepository,
}: BalancePageProps) => {
	const accountActive = useAccountStore((s) => s.accountActive);

	const { data: account, isLoading } = useAccountFindQuery({
		accountId: accountActive?.id,
		accountRepository: accountsRepository,
		enabled: !!accountActive,
	});

	const data = [
		{
			title: "Balance",
			image: BalanceSvg,
			amount: account?.formatBalance() || "",
		},
		{
			title: "Income",
			image: IncomeSvg,
			amount: account?.formatIncome() || "",
		},
		{
			title: "Expense",
			image: PaymentSvg,
			amount: account?.formatExpense() || "",
		},
	];

	return (
		<>
			<PrivateContainer
				as="main"
				display="flex"
				flex="1"
				flexDirection="column"
			>
				<PageHeading>Balance</PageHeading>

				<List
					as="ul"
					flex="1"
					display={{ base: "flex", lg: "grid" }}
					gridTemplateColumns={{ lg: "repeat(3, 1fr)" }}
					gap="5"
					flexDirection={{ base: "column", md: "row" }}
					flexWrap="wrap"
					justifyContent="center"
					alignItems="center"
				>
					{!account || isLoading ? (
						<React.Fragment>
							{forInRange(3).map((i) => (
								<Skeleton
									key={i}
									minH={{ base: "2xs", lg: "md" }}
									w={{ base: "full", md: "80", lg: "auto" }}
									maxW={{ base: "full", sm: "md", lg: "auto" }}
								/>
							))}
						</React.Fragment>
					) : (
						<React.Fragment>
							{data.map((v) => (
								<ListItem key={v.title} width={{ base: "full", sm: "auto" }}>
									<AccountBalanceCard
										amount={v.amount}
										title={v.title}
										image={
											<v.image
												height={{ base: "52", lg: "auto" }}
												marginInline="auto"
											/>
										}
									/>
								</ListItem>
							))}
						</React.Fragment>
					)}
				</List>
			</PrivateContainer>
		</>
	);
};

BalancePage.getLayout = function getLayout(page) {
	return <PrivateLayout>{page}</PrivateLayout>;
};

export default BalancePage;
