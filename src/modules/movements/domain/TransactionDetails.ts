import { AccountDetails } from "@/accounts/domain/";
import { UserDetails } from "@/users/domain";

export interface TransferenceDetails {
	accountDetails: AccountDetails;
	userDetails: UserDetails;
}
