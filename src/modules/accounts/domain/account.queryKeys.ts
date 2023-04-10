import { Account } from "./account.model";

export const AccountQueryKeys = {
	all: ["accounts"],
	find: (accountId?: Account["id"]) => [
		...AccountQueryKeys.all,
		"find",
		accountId,
	],
};
