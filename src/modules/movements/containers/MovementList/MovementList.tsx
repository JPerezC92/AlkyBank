import React from "react";

import { useAccountStore } from "@/accounts/store";
import { Movement, MovementFilterTypeEnum } from "@/movements/domain";
import { useMovementsFindQuery } from "@/movements/hooks";
import {
	MovementsNestJSRepository,
	MovementsRepository,
} from "@/movements/repos";
import { PaginationEndpoint } from "@/shared/schemas";

interface MovementListRenderProps {
	loading: boolean;
	movementList: Movement[];
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
	const accountActive = useAccountStore((s) => s.accountActive);
	const movementListQuery = useMovementsFindQuery(
		movementsRepository,
		page,
		limit,
		accountActive?.id || "",
		MovementFilterTypeEnum.values.ALL
	);

	const { data, isLoading } = movementListQuery;

	return (
		<>
			{children &&
				children({
					loading: isLoading,
					movementList: data?.movementList || [],
					pagination: data?.pagination,
				})}
		</>
	);
};
