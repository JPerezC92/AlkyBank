import { Account } from "@/accounts/domain/account.model";
import { AccountEndpoint } from "@/accounts/schemas";

export interface AccountsRepository {
	find(accountId: AccountEndpoint["id"]): Promise<Account>;
}
