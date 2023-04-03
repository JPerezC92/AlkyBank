import { Account } from "@/accounts/domain";
import { Tokens } from "@/auth/schemas";
import {
	MovementCreate,
	MovementEndpoint,
	MovementGETResponse,
} from "@/movements/schemas";
import { IPaginationCriteria } from "@/shared/domain";

export interface MovementsRepository {
	create: (
		movement: MovementCreate,
		accessToken: Tokens["accessToken"],
		abortSignal?: AbortSignal
	) => Promise<MovementEndpoint>;

	findAll: (
		accountId: Account["id"],
		accessToken: Tokens["accessToken"],
		paginationCriteria: IPaginationCriteria,
		abortSignal?: AbortSignal
	) => Promise<MovementGETResponse>;
}
