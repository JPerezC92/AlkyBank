import React from "react";

import { useMovementsFindQuery } from "@/movements/hooks";
import {
	MovementsNestJSRepository,
	MovementsRepository,
} from "@/movements/repos";
import { MovementEndpoint } from "@/movements/schemas";
import { PaginationEndpoint } from "@/shared/schemas";

interface MovementListRenderProps {
	loading: boolean;
	movementList: MovementEndpoint[];
	pagination?: PaginationEndpoint;
}

type MovementListProps = {
	page?: number;
	limit?: number;
	movementsRepository?: MovementsRepository;
	children?: (p: MovementListRenderProps) => React.ReactNode;
};

export const MovementList: React.FC<MovementListProps> = ({
	movementsRepository = MovementsNestJSRepository(),
	page,
	limit,
	children,
}) => {
	const movementListQuery = useMovementsFindQuery(
		movementsRepository,
		page,
		limit
	);

	return (
		<>
			{children &&
				children({
					loading: movementListQuery.isLoading,
					movementList: movementListQuery.data?.movementList || [],
					pagination: movementListQuery.data?.pagination,
				})}
		</>
	);
};
