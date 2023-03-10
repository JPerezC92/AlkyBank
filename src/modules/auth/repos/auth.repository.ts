import { Credentials } from "@/auth/schemas/Credentials.schema";
import { Tokens } from "@/auth/schemas/Tokens.schema";
import { UserEndpoint } from "@/users/schemas";

export interface AuthRepository {
	login(
		credentials: Credentials,
		abortSignal?: AbortSignal
	): Promise<Tokens["accessToken"]>;
	userInfo(
		accessToken: Tokens["accessToken"],
		abortSignal?: AbortSignal
	): Promise<UserEndpoint>;
	refreshToken(abortSignal?: AbortSignal): Promise<Tokens["accessToken"]>;
}
