import { Account } from "./account.model";

export interface AccountDetails {
	id: Account["id"];
	currency: Account["currency"];
}
