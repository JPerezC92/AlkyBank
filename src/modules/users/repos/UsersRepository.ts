import { UserUpdate } from "@/users/domain";
import { UserCreate, UserEndpoint } from "@/users/schemas";

export interface UsersRepository {
	create(user: UserCreate, abortSignal?: AbortSignal): Promise<UserEndpoint>;
	update(
		id: string,
		user: UserUpdate,
		abortSignal?: AbortSignal
	): Promise<void>;
}
