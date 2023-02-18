import { Credentials } from "@/auth/schemas/Credentials.schema";
import { Tokens } from "@/auth/schemas/Tokens.schema";
import { User } from "@/users/schemas/UserEndpoint.schema";

export interface AuthRepository {
	login(
		credentials: Credentials,
		abortSignal?: AbortSignal
	): Promise<Tokens["accessToken"]>;
	userInfo(
		accessToken: Tokens["accessToken"],
		abortSignal?: AbortSignal
	): Promise<User>;
	refreshToken(abortSignal?: AbortSignal): Promise<Tokens["accessToken"]>;
}
