import { act, render, screen, waitFor } from "@testing-library/react";

import { AccountTransferenceInfo } from "@/accounts/components";
import { AccountTransferReceiver } from "@/accounts/domain";
import { accountTransferenceReceiver$ } from "@/accounts/observables";
import { AppWrapperProvider } from "@/tests/utils";

describe("<AccountTransferenceInfo />", () => {
	test("should show the account transfer receiver info", async () => {
		// GIVEN
		render(
			<AccountTransferenceInfo
				accountTransferReceiverSubject={accountTransferenceReceiver$}
			/>,
			{ wrapper: AppWrapperProvider() }
		);

		// WHEN
		act(() => {
			accountTransferenceReceiver$.setSubject(
				new AccountTransferReceiver({
					id: "1",
					currency: "USD",
					userDetails: {
						firstName: "John",
						lastName: "Doe",
						email: "jhon@gmail.com",
					},
				})
			);
		});

		// THEN
		await waitFor(() => {
			expect(screen.getByLabelText(/account code/i)).toHaveValue("1");
			expect(screen.getByLabelText(/owner/i)).toHaveValue("John Doe");
			expect(screen.getByLabelText(/currency/i)).toHaveValue("USD");
		});
	});
});
