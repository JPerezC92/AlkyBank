import { Tokens } from "@/auth/schemas";
import { Movement } from "@/movements/domain";
import { MovementCreate, MovementEndpoint } from "@/movements/schemas";
import { IMovementCriteria, IPaginationCriteria } from "@/shared/domain";
import { PaginationEndpoint } from "@/shared/schemas";

export interface MovementsRepository {
	create: (
		movement: MovementCreate,
		accessToken: Tokens["accessToken"],
		abortSignal?: AbortSignal
	) => Promise<MovementEndpoint>;

	findAll: (
		accessToken: Tokens["accessToken"],
		paginationCriteria: IPaginationCriteria,
		movementCriteria: IMovementCriteria,
		abortSignal?: AbortSignal
	) => Promise<{
		pagination: PaginationEndpoint;
		movementList: Movement[];
	}>;
}
