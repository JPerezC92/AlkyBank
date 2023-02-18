import { UserCreate } from "@/users/schemas/UserCreate.schema";
import { User } from "@/users/schemas/UserEndpoint.schema";

export interface UsersRepository {
	create(user: UserCreate, abortSignal?: AbortSignal): Promise<User>;
}
