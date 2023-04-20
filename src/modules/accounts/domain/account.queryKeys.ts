import { Account } from "./account.model";

export const AccountQueryKeys = {
	all: ["accounts"] as const,
	find: (accountId?: Account["id"]) =>
		[...AccountQueryKeys.all, "find", accountId] as const,
	findAccountTransferReceiver: (accountId?: Account["id"]) =>
		[
			...AccountQueryKeys.all,
			"findAccountTransferReceiver",
			accountId,
		] as const,
};
