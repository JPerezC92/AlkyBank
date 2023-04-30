import {
	Box,
	Button,
	Divider,
	IconButton,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightAddon,
	List,
	ListItem,
	Text,
} from "@chakra-ui/react";
import React from "react";
import { FaClipboard } from "react-icons/fa";

import { PrivateLayout } from "@/auth/components";
import { useAuthenticatedStore } from "@/auth/store";
import { MovementFilterControl } from "@/movements/components";
import { MovementType } from "@/movements/domain";
import { useMovementsFindQuery } from "@/movements/hooks";
import { MovementsNestJSRepository } from "@/movements/repos";
import {
	PageHeading,
	PaginationControl,
	PrivateContainer,
} from "@/shared/components";
import { MovementFilter, PaginationCriteria } from "@/shared/domain";
import { NextPageWithLayout, timeAgo } from "@/shared/utils";

const movementsRepository = MovementsNestJSRepository();

const MovementsPage: NextPageWithLayout = () => {
	const { user } = useAuthenticatedStore();
	const accountList = user.accountList;

	const [pagination, setPagination] = React.useState(
		PaginationCriteria.default()
	);

	const [movementFilter, setMovementFilter] = React.useState(
		MovementFilter.default(user.getDefaultAccount().id)
	);

	const movementListQuery = useMovementsFindQuery(
		movementsRepository,
		pagination.page,
		pagination.limit,
		movementFilter.accountId,
		movementFilter.operationType,
		movementFilter.concept
	);

	const { data } = movementListQuery;

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
						totalPages={data?.pagination.totalPages}
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
						{data?.movementList.map((m) => (
							<ListItem key={m.id}>
								<Box
									borderColor={
										m.operationType === MovementType.values.TOPUP
											? "green.500"
											: "red.500"
									}
									borderWidth="1px"
									bg="bg1"
									borderRadius="base"
									textAlign="center"
									boxShadow="md"
								>
									<Box
										borderTopRadius="inherit"
										borderBottom="inherit"
										bg={
											m.operationType === MovementType.values.TOPUP
												? "green.100"
												: "red.100"
										}
										paddingBlock="2"
										position="relative"
									>
										<Text fontWeight="semibold">{m.operationType}</Text>
										<Box
											display={
												m.operationType === MovementType.values.TRANSFERENCE
													? "none"
													: "flex"
											}
											position="absolute"
											insetBlock="0"
											right="2"
											justifyContent="center"
											alignItems="center"
										>
											<Button
												inset="0"
												variant="ghost"
												size="xs"
												colorScheme="secondary"
											>
												Edit
											</Button>
										</Box>
									</Box>

									<Box p="4">
										<InputGroup size="xs">
											<InputLeftAddon>Code</InputLeftAddon>
											<Input
												placeholder="mysite"
												defaultValue={m.id}
												isReadOnly
											/>
											<InputRightAddon p="0" m="0">
												<IconButton
													size="xs"
													icon={<FaClipboard />}
													aria-label="copy"
													onClick={() => navigator.clipboard.writeText(m.id)}
												/>
											</InputRightAddon>
										</InputGroup>

										<Text
											fontSize="3xl"
											color="primary.400"
											fontWeight="bold"
											marginBlockStart="4"
											marginBlockEnd="2"
										>
											{m.formatAmount()}
										</Text>

										<Text fontSize="sm">{timeAgo.format(m.createdAt)}</Text>
									</Box>

									<Divider />

									<Text paddingBlock="2">{m.concept}</Text>
								</Box>
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
