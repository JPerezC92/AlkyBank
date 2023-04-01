import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { AccountEndpoint } from "@/accounts/schemas";
import { currencyDefault } from "@/currencies/domain";

interface AccountStore {
	accountActive: AccountEndpoint | null;
	loadAccount: (accountList?: AccountEndpoint[]) => void;
}

export const useAccountStore = create(
	devtools<AccountStore>((set) => ({
		accountActive: null,
		loadAccount: (accountList) =>
			set({
				accountActive: accountList?.find(
					(ac) => ac.currency === currencyDefault
				),
			}),
	}))
);
