import { Box, List, ListItem } from "@chakra-ui/react";
import React from "react";

import { useAccountStore } from "@/accounts/store";
import { PrivateLayout } from "@/auth/components";
import { useAuthenticatedStore } from "@/auth/store";
import { MovementCard, MovementFilterControl } from "@/movements/components";
import { useMovementsFindQuery } from "@/movements/hooks";
import { MovementsNestJSRepository } from "@/movements/repos";
import {
	PageHeading,
	PaginationControl,
	PrivateContainer,
} from "@/shared/components";
import { MovementFilter, PaginationCriteria } from "@/shared/domain";
import { NextPageWithLayout } from "@/shared/utils";

const movementsRepository = MovementsNestJSRepository();

const MovementsPage: NextPageWithLayout = () => {
	const { user } = useAuthenticatedStore();
	const accountActive = useAccountStore((s) => s.accountActive);
	const accountList = user.accountList;

	const [pagination, setPagination] = React.useState(
		PaginationCriteria.default()
	);

	const [movementFilter, setMovementFilter] = React.useState(
		MovementFilter.default(accountActive?.id)
	);

	const movementListQuery = useMovementsFindQuery(
		movementsRepository,
		pagination.page,
		pagination.limit,
		movementFilter.accountId,
		movementFilter.operationType,
		movementFilter.concept
	);

	const { data: MovementListQueryData } = movementListQuery;

	return (
		<>
			<PrivateContainer flex="1">
				<PageHeading>Movements</PageHeading>

				<Box
					as="main"
					flex="1"
					gap="4"
					display={{ base: "flex", lg: "grid" }}
					gridTemplateColumns={{ lg: "repeat(24, 1fr)" }}
					gridTemplateRows={{ lg: "repeat(24)" }}
					flexDirection="column"
				>
					<MovementFilterControl
						defaultValues={{
							accountId: movementFilter.accountId,
						}}
						accountList={accountList}
						onSubmit={(values) =>
							setMovementFilter((s) => s.changeValues(values))
						}
						onClear={(v) => setMovementFilter((s) => s.changeValues(v))}
						maxW={{ lg: "sm" }}
						flexDir={{ lg: "column" }}
						gridColumn={{ lg: "1/8" }}
						gridRow={{ lg: "1/25" }}
						marginBlockEnd={{ lg: "auto" }}
						top="4"
						position={{ lg: "sticky" }}
					/>

					<PaginationControl
						totalPages={MovementListQueryData?.pagination.totalPages}
						currentPage={pagination.page}
						limit={pagination.limit}
						onChangePage={(page) => setPagination((s) => s.changePage(page))}
						onChangeLimit={(limit) =>
							setPagination((s) => s.changeLimit(limit))
						}
						gridColumn={{ lg: "8/25" }}
					/>

					<List
						display="grid"
						gridTemplateColumns="repeat(auto-fill, minmax(min(100%,20rem),1fr))"
						gap="5"
						gridColumn={{ lg: "8/25" }}
						gridRow={{ lg: "2/25" }}
						marginBlockEnd={{ lg: "auto" }}
					>
						{MovementListQueryData?.movementList.map((m) => (
							<ListItem key={m.id}>
								<MovementCard movement={m} />
							</ListItem>
						))}
					</List>
				</Box>
			</PrivateContainer>
		</>
	);
};

MovementsPage.getLayout = function getLayout(page) {
	return <PrivateLayout>{page}</PrivateLayout>;
};

export default MovementsPage;
