import { Tokens } from "@/auth/schemas";
import { MovementCreate, MovementEndpoint } from "@/movements/schemas";

export interface MovementsRepository {
	create: <T extends MovementCreate>(
		movement: T,
		accessToken: Tokens["accessToken"],
		abortSignal?: AbortSignal
	) => Promise<Extract<MovementEndpoint, { type: T["type"] }>>;
}
