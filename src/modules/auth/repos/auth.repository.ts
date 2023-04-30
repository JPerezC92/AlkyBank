import { AuthDetails } from "@/auth/domain";
import { Credentials, Tokens } from "@/auth/schemas";
import { User } from "@/users/domain";

export interface AuthRepository {
	login(
		credentials: Credentials,
		abortSignal?: AbortSignal
	): Promise<Tokens["accessToken"]>;
	userInfo(
		accessToken: Tokens["accessToken"],
		abortSignal?: AbortSignal
	): Promise<User>;
	refreshToken(
		refreshToken: AuthDetails["refreshToken"],
		abortSignal?: AbortSignal
	): Promise<Tokens["accessToken"]>;
	logout(
		refreshToken: AuthDetails["refreshToken"],
		abortSignal?: AbortSignal
	): Promise<void>;
}
