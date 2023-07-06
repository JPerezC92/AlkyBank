import { fireEvent, render, screen } from "@testing-library/react";

import { AccountFindTransferenceDetailsForm } from "@/accounts/components";
import { accountTransferenceReceiver$ } from "@/accounts/observables";
import { AccountsStubRepository, accountStub1 } from "@/accounts/repos";
import { IdSchema } from "@/shared/schemas/id.schema";
import { AppWrapperProvider } from "@/tests/utils";

describe("<AccountFindTransferenceDetailsForm />", () => {
	test("should show a success message when the account is found", async () => {
		// GIVEN
		const user = accountStub1;
		jest
			.spyOn(IdSchema, "safeParse")
			.mockReturnValue({ success: true, data: user.id });

		render(
			<AccountFindTransferenceDetailsForm
				accountTransferReceiverSubject={accountTransferenceReceiver$}
				accountsRepository={AccountsStubRepository()}
			/>,
			{ wrapper: AppWrapperProvider() }
		);
		const accountCodeInput = screen.getByLabelText(/account code/i);
		const submitButton = screen.getByRole("button", { name: /check/i });

		// WHEN

		fireEvent.change(accountCodeInput, { target: { value: user.id } });
		fireEvent.submit(submitButton);

		// THEN
		expect(await screen.findByText(/information found/i)).toBeInTheDocument();
	});

	test("should show an error message when the account is not found", async () => {
		// GIVEN
		const user = accountStub1;
		const accountsRepository = AccountsStubRepository();
		jest
			.spyOn(IdSchema, "safeParse")
			.mockReturnValue({ success: true, data: user.id });
		jest
			.spyOn(accountsRepository, "findTransferenceDetails")
			.mockImplementation(() => {
				// eslint-disable-next-line no-throw-literal
				throw {
					message: "account not found",
					code: "ACCOUNT_NOT_FOUND",
					statusCode: 404,
				};
			});

		render(
			<AccountFindTransferenceDetailsForm
				accountTransferReceiverSubject={accountTransferenceReceiver$}
				accountsRepository={accountsRepository}
			/>,
			{ wrapper: AppWrapperProvider() }
		);
		const accountCodeInput = screen.getByLabelText(/account code/i);
		const submitButton = screen.getByRole("button", { name: /check/i });

		// WHEN
		fireEvent.change(accountCodeInput, { target: { value: "invalid-id" } });
		fireEvent.submit(submitButton);

		// THEN
		expect(await screen.findByText(/account not found/i)).toBeInTheDocument();
	});
});
