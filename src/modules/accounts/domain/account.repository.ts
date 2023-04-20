import { AccountTransferReceiver } from "@/accounts/domain";
import { Account } from "@/accounts/domain/account.model";
import { AccountEndpoint } from "@/accounts/schemas";

export interface AccountsRepository {
	find(
		accountId: AccountEndpoint["id"],
		signal?: AbortSignal
	): Promise<Account>;
	findTransferenceDetails(
		accountId: Account["id"],
		signal?: AbortSignal
	): Promise<AccountTransferReceiver>;
}
