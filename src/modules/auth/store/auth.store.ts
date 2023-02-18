import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { Tokens } from "@/auth/schemas/Tokens.schema";
import { User } from "@/users/schemas/UserEndpoint.schema";

interface AuthStore {
	isAuthenticated: boolean;
	loadingStatus: "idle" | "loading" | "succeeded" | "failed";
	user: User;
	accessToken: Tokens["accessToken"];
	saveAccessToken: (accessToken: Tokens["accessToken"]) => void;
	saveUser: (user: User) => void;
	loadingStart: () => void;
	loadingSucceeded: () => void;
	loadingFailed: () => void;
	loadingIdle: () => void;
}

export const authStore = create(
	devtools<AuthStore>(
		(set) => ({
			isAuthenticated: false,
			loadingStatus: "idle",
			user: null as unknown as User,
			accessToken: null as unknown as Tokens["accessToken"],
			saveAccessToken: (accessToken) => set({ accessToken }),
			loadingFailed: () => set({ loadingStatus: "failed" }),
			loadingSucceeded: () => set({ loadingStatus: "succeeded" }),
			loadingStart: () => set({ loadingStatus: "loading" }),
			loadingIdle: () => set({ loadingStatus: "idle" }),
			saveUser: (user) => set({ user, isAuthenticated: true }),
		}),

		{ name: "[AUTH]" }
	)
);
