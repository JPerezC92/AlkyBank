import { AuthDetails } from "@/auth/domain";
import { Credentials, Tokens } from "@/auth/schemas";
import { ChangeCredentials, User } from "@/users/domain";

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
	changePassword(
		userId: User["id"],
		changeCredentials: ChangeCredentials,
		abortSignal?: AbortSignal
	): Promise<void>;
}
