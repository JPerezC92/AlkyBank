import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { AccountEndpoint } from "@/accounts/schemas";
import { Tokens } from "@/auth/schemas/Tokens.schema";
import { UserEndpoint } from "@/users/schemas";

interface AuthStore {
	isAuthenticated: boolean;
	loadingStatus: "idle" | "loading" | "succeeded" | "failed";
	user: UserEndpoint | null;
	accessToken: Tokens["accessToken"];
	getCurrencyList: Pick<AccountEndpoint, "id" | "currency">[] | undefined;
	saveAccessToken: (accessToken: Tokens["accessToken"]) => void;
	saveUser: (user: UserEndpoint) => void;
	loadingStart: () => void;
	loadingSucceeded: () => void;
	loadingFailed: () => void;
	loadingIdle: () => void;
}

export const useAuthStore = create(
	devtools<AuthStore>(
		(set, get) => ({
			isAuthenticated: false,
			loadingStatus: "idle",
			user: null,
			accessToken: null as unknown as Tokens["accessToken"],
			saveAccessToken: (accessToken) => set({ accessToken }),
			loadingFailed: () => set({ loadingStatus: "failed" }),
			loadingSucceeded: () => set({ loadingStatus: "succeeded" }),
			loadingStart: () => set({ loadingStatus: "loading" }),
			loadingIdle: () => set({ loadingStatus: "idle" }),
			saveUser: (user) => set({ user, isAuthenticated: true }),
			getCurrencyList: get()?.user?.accountList.map((v) => ({
				id: v.id,
				currency: v.currency,
			})),
		}),

		{ name: "[AUTH]" }
	)
);
