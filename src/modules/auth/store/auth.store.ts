import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { AccountEndpoint } from "@/accounts/schemas";
import { Tokens } from "@/auth/schemas/Tokens.schema";
import { User } from "@/users/domain";
import { UserEndpoint } from "@/users/schemas";

interface AuthStoreState {
	isAuthenticated: boolean;

	user: UserEndpoint | null;
	accessToken: Tokens["accessToken"];
}

interface AuthStoreActions {
	saveAccessToken: (accessToken: Tokens["accessToken"]) => void;
	saveUser: (user: UserEndpoint) => void;
	getCurrencyList: () => Pick<AccountEndpoint, "id" | "currency">[] | undefined;
	logout: () => void;
}

const initialState: AuthStoreState = {
	isAuthenticated: false,
	user: null,
	accessToken: null as unknown as Tokens["accessToken"],
};

export const useAuthStore = create(
	devtools<AuthStoreState & AuthStoreActions>(
		(set, get) => ({
			isAuthenticated: false,
			user: null,
			accessToken: null as unknown as Tokens["accessToken"],
			saveAccessToken: (accessToken) => set({ accessToken }),
			saveUser: (user) => set({ user, isAuthenticated: true }),
			getCurrencyList: () =>
				get()?.user?.accountList.map((v) => ({
					id: v.id,
					currency: v.currency,
				})),
			logout: () => set(initialState),
		}),

		{ name: "[AUTH]" }
	)
);

/**
 * @description This hook is used where you are sure that the user is authenticated
 */
export function useAuthenticatedStore() {
	return useAuthStore((s) => ({
		user: s.user as User,
	}));
}
