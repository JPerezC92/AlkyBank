import { fireEvent, render, screen } from "@testing-library/react";

import { AccountCreateForm } from "@/accounts/components";
import { AccountsStubRepository } from "@/accounts/repos";
import { CurrenciesStubRepository } from "@/currencies/repos";
import { AppWrapperProvider } from "@/tests/utils";

describe("<AccountCreateForm />", () => {
	test("should be create an account successfully", async () => {
		// GIVEN
		const currency = (await CurrenciesStubRepository().findAll()).find(
			(v) => v === "USD"
		);

		render(
			<AccountCreateForm
				currenciesRepository={CurrenciesStubRepository()}
				accountsRepository={AccountsStubRepository()}
			/>,
			{ wrapper: AppWrapperProvider() }
		);

		// WHEN
		const select = screen.getByLabelText("Select an account");
		fireEvent.change(select, { target: { value: currency } });

		const submit = screen.getByRole("button", { name: "Create" });

		fireEvent.click(submit);

		// THEN
		expect(await screen.findByText(/created/i)).toBeInTheDocument();
	});

	test("should show an error message when account creation fails", async () => {
		// GIVEN
		const accountsRepository = AccountsStubRepository();
		jest.spyOn(accountsRepository, "create").mockImplementation(() => {
			// eslint-disable-next-line no-throw-literal
			throw {
				code: "CANT_CREATE_ACCOUNT",
				message: "Account creation error",
				statusCode: 500,
			};
		});

		const currency = (await CurrenciesStubRepository().findAll()).find(
			(v) => v === "USD"
		);

		render(
			<AccountCreateForm
				currenciesRepository={CurrenciesStubRepository()}
				accountsRepository={accountsRepository}
			/>,
			{ wrapper: AppWrapperProvider() }
		);

		// WHEN
		const select = screen.getByLabelText("Select an account");
		fireEvent.change(select, { target: { value: currency } });

		const submit = screen.getByRole("button", { name: "Create" });

		fireEvent.click(submit);

		// THEN
		expect(
			await screen.findByText(/account creation error/i)
		).toBeInTheDocument();
	});
});
