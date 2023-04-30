import { Account } from "@/accounts/domain";
import { AccountEndpoint } from "@/accounts/schemas";

export function AccountEndpointToModel(aE: AccountEndpoint) {
	return new Account({
		balance: aE.balance,
		createdAt: aE.createdAt,
		currency: aE.currency,
		expense: aE.expense,
		id: aE.id,
		income: aE.income,
		updatedAt: aE.updatedAt,
		userId: aE.userId,
	});
}
