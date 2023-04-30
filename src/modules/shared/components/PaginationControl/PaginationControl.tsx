import { Box, Button, Icon, Select } from "@chakra-ui/react";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { forInRange } from "@/shared/utils";

type PaginationControlProps = {
	onChangePage?: (page: number) => void;
	onChangeLimit?: (limit: number) => void;
	totalPages?: number;
	limit?: number;
	currentPage?: number;
} & Parameters<typeof Box>[0];

const limitOptions = [5, 10, 15];

export const PaginationControl: React.FC<PaginationControlProps> = ({
	totalPages = 1,
	currentPage,
	limit,
	onChangePage,
	onChangeLimit,
	...props
}) => {
	const currentPageRef = React.useRef(1);
	currentPageRef.current = currentPage || currentPageRef.current;

	return (
		<Box
			display="grid"
			gap="1"
			gridTemplateColumns="auto 1fr 1fr auto"
			{...props}
		>
			<Button
				flex="1"
				colorScheme="secondary"
				isDisabled={currentPageRef.current === 1}
				onClick={() => onChangePage?.(1)}
			>
				<Icon as={IoIosArrowBack} />
				<Box as="span" display={{ base: "none", md: "initial" }}>
					Prev
				</Box>
			</Button>

			<Select
				flex="3"
				onChange={(e) => onChangePage?.(Number(e.target.value))}
				value={currentPageRef.current}
				borderColor="secondary.500"
				focusBorderColor="secondary.600"
			>
				{forInRange(totalPages, 1).map((page) => (
					<option key={page} value={page}>
						Page {page}
					</option>
				))}
			</Select>

			<Select
				flex="3"
				onChange={(e) => onChangeLimit?.(Number(e.target.value))}
				value={limit}
				borderColor="secondary.500"
				focusBorderColor="secondary.600"
			>
				{limitOptions.map((limit) => (
					<option key={limit} value={limit}>
						Per page {limit}
					</option>
				))}
			</Select>

			<Button
				flex="1"
				colorScheme="secondary"
				isDisabled={currentPageRef.current === totalPages}
				onClick={() => onChangePage?.(currentPageRef.current + 1)}
			>
				<Box as="span" display={{ base: "none", md: "initial" }}>
					Next
				</Box>
				<Icon as={IoIosArrowForward} />
			</Button>
		</Box>
	);
};
