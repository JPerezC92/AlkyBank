jest.mock("next/router", () => require("next-router-mock"));
import { render, screen, within } from "@testing-library/react";

import { AccountsStubRepository, accountStub1 } from "@/accounts/repos";
import { useAccountStore } from "@/accounts/store";
import { useAuthStore } from "@/auth/store";
import { errorDefault } from "@/shared/utils";
import BalancePage from "@/src/pages/balance";
import { AppWrapperProvider } from "@/tests/utils";

describe("<BalancePage />", () => {
	test("should contain de account balance information", async () => {
		// GIVEN
		const account = accountStub1;
		useAuthStore.setState({ accessToken: "123" });
		useAccountStore.setState({ accountActive: account });

		// WHEN
		render(<BalancePage accountsRepository={AccountsStubRepository()} />, {
			wrapper: AppWrapperProvider(),
		});

		// THEN
		const cardList = await within(screen.getByRole("main")).findAllByRole(
			"listitem"
		);

		const balance = await within(cardList[0]).findByText(
			`${account.formatBalance()}`
		);
		const income = await within(cardList[1]).findByText(
			`${account.formatIncome()}`
		);
		const expense = await within(cardList[2]).findByText(
			`${account.formatExpense()}`
		);

		expect(balance).toHaveTextContent(account.balance.toString());
		expect(income).toHaveTextContent(account.income.toString());
		expect(expense).toHaveTextContent(account.expense.toString());
	});

	test("should contain a error toast when can't find the account", async () => {
		// GIVEN
		const fakeAccount = { ...accountStub1, id: "fake" };
		useAccountStore.setState({ accountActive: fakeAccount });

		// WHEN
		render(<BalancePage accountsRepository={AccountsStubRepository()} />, {
			wrapper: AppWrapperProvider(),
		});
		const toast = await screen.findByRole("status");

		// THEN
		expect(toast).toHaveTextContent(errorDefault.description);
	});
});
