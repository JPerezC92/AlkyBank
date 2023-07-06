import {
	Account,
	AccountsRepository,
	AccountTransferReceiver,
} from "@/accounts/domain";
import { errorDefault } from "@/shared/utils/errorDefault";

export const accountStub1 = new Account({
	id: "1",
	balance: 100,
	expense: 0,
	income: 100,
	createdAt: new Date(),
	updatedAt: new Date(),
	currency: "USD",
	userId: "1",
});

export const accountStub2 = new Account({
	id: "2",
	balance: 100,
	expense: 0,
	income: 100,
	createdAt: new Date(),
	updatedAt: new Date(),
	currency: "USD",
	userId: "2",
});

export const accountStub3 = new Account({
	id: "3",
	balance: 100,
	expense: 0,
	income: 100,
	createdAt: new Date(),
	updatedAt: new Date(),
	currency: "USD",
	userId: "3",
});

export const userDetailsStub: AccountTransferReceiver =
	new AccountTransferReceiver({
		id: "1",
		userDetails: {
			firstName: "John",
			lastName: "Doe",
			email: "jhon.doe@gmail.com",
		},
		currency: "USD",
	});

const accountList: Account[] = [accountStub1, accountStub2, accountStub3];

export function AccountsStubRepository(): AccountsRepository {
	return {
		find: async (accountId) => {
			const account = accountList.find((a) => a.id === accountId);

			if (!account) {
				throw errorDefault;
			}

			return account;
		},

		findTransferenceDetails: async (accountId) => {
			const account = accountList.find((a) => a.id === accountId);
			if (!account) {
				throw errorDefault;
			}

			return userDetailsStub;
		},

		create: async (currency) => {
			const account = new Account({
				id: "4",
				balance: 100,
				expense: 0,
				income: 100,
				createdAt: new Date(),
				updatedAt: new Date(),
				currency,
				userId: "4",
			});

			accountList.push(account);

			return account;
		},
	};
}
