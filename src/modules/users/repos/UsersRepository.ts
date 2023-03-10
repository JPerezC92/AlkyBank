import { UserCreate, UserEndpoint } from "@/users/schemas";

export interface UsersRepository {
	create(user: UserCreate, abortSignal?: AbortSignal): Promise<UserEndpoint>;
}
