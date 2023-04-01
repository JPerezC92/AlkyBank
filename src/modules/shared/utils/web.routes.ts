import { EnvVariables } from "@/shared/utils";

const baseRoute = EnvVariables.web;

const auth = {
	base() {
		return baseRoute + "auth/";
	},
	login() {
		return this.base() + "login";
	},
	register() {
		return this.base() + "register";
	},
};

export const webRoutes = {
	baseRoute,
	auth,
	charges: () => baseRoute + "charges",
	payments: () => baseRoute + "payments",
	balance: () => baseRoute + "balance",
	movements: () => baseRoute + "movements",
	transfers: () => baseRoute + "transfers",
};
