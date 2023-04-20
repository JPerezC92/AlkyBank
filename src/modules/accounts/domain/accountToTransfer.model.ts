import { UserDetails } from "@/users/domain";

import { AccountDetails } from "./accountDetails.interface";

interface AccountTransferReceiverProps extends AccountDetails {
	userDetails: UserDetails;
}

export class AccountTransferReceiver implements AccountDetails {
	id: string;
	currency: string;
	userDetails: UserDetails;

	constructor(props: AccountTransferReceiverProps) {
		this.id = props.id;
		this.currency = props.currency;
		this.userDetails = props.userDetails;
	}

	ownerFullName() {
		return `${this.userDetails.firstName} ${this.userDetails.lastName}`;
	}
}
