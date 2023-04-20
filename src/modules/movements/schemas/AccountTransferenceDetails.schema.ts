import { z } from "zod";

import { AccountTransferReceiver } from "@/accounts/domain";
import { AccountEndpoint } from "@/accounts/schemas";
import { UserDetailsEndpoint } from "@/users/schemas";

export const AccountTransferenceDetailsEndpoint = z
	.object({
		userDetails: UserDetailsEndpoint,
		accountDetails: AccountEndpoint.pick({ id: true, currency: true }),
	})
	.transform(
		(v) =>
			new AccountTransferReceiver({
				id: v.accountDetails.id,
				currency: v.accountDetails.currency,
				userDetails: v.userDetails,
			})
	);
