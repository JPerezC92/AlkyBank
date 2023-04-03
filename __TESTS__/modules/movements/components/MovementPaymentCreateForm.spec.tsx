import { act, fireEvent, render, screen } from "@testing-library/react";

import { useAuthStore } from "@/auth/store";
import { MovementPaymentCreateForm } from "@/movements/components";
import { ApiKnowError } from "@/shared/schemas";
import { AccountMock } from "@/tests/modules/accounts/fixtures";
import { MovementsMockRepository } from "@/tests/modules/movements/repos";
import { UserMock } from "@/tests/modules/users/fixtures/user.mock";
import { AppWrapperProvider } from "@/tests/utils";
import { UserEndpoint } from "@/users/schemas";

const accountMock = AccountMock();

const user: UserEndpoint = UserMock([accountMock]);

useAuthStore.setState({ user });

describe("<MovementPaymentCreateForm />", () => {
	test("should create a TOPUP Movement successfully", async () => {
		const movementsMockRepo = MovementsMockRepository();

		const topupValues = {
			amount: "7000",
			date: "2023-04-03",
			concept: "Test concept",
			accountId: accountMock.id,
		};

		render(
			<MovementPaymentCreateForm movementsRepository={movementsMockRepo} />,
			{ wrapper: AppWrapperProvider() }
		);

		const currencyInput = screen.getByLabelText(/currency/i);
		const amountInput = screen.getByLabelText(/amount/i);
		const dateInput = screen.getByLabelText(/date/i);
		const conceptInput = screen.getByLabelText(/concept/i);
		const submitButton = screen.getByRole("button");

		fireEvent.change(currencyInput, {
			target: { value: topupValues.accountId },
		});
		fireEvent.change(amountInput, { target: { value: topupValues.amount } });
		fireEvent.change(dateInput, { target: { value: topupValues.date } });
		fireEvent.change(conceptInput, { target: { value: topupValues.concept } });

		act(() => fireEvent.click(submitButton));

		const successToast = await screen.findByRole("status");

		expect(successToast).toBeInTheDocument();
		expect(successToast).toHaveTextContent(topupValues.amount.toString());
		expect(successToast).toHaveTextContent(/payment/i);
	});

	test("should show a Error message when the creation fails", async () => {
		const apiErrorMock: ApiKnowError = {
			code: "TEST_API_ERROR",
			message: "There was a problem with the transaction",
			statusCode: 500,
		};

		const movementsMockRepo = MovementsMockRepository();

		movementsMockRepo.create.mockImplementation(() => {
			throw apiErrorMock;
		});

		const topupValues = {
			amount: "7000",
			date: "2023-04-03",
			concept: "Test concept",
			accountId: accountMock.id,
		};

		render(
			<MovementPaymentCreateForm movementsRepository={movementsMockRepo} />,
			{ wrapper: AppWrapperProvider() }
		);

		const currencyInput = screen.getByLabelText(/currency/i);
		const amountInput = screen.getByLabelText(/amount/i);
		const dateInput = screen.getByLabelText(/date/i);
		const conceptInput = screen.getByLabelText(/concept/i);
		const submitButton = screen.getByRole("button");

		fireEvent.change(currencyInput, {
			target: { value: topupValues.accountId },
		});
		fireEvent.change(amountInput, { target: { value: topupValues.amount } });
		fireEvent.change(dateInput, { target: { value: topupValues.date } });
		fireEvent.change(conceptInput, { target: { value: topupValues.concept } });

		act(() => fireEvent.click(submitButton));

		const successToast = await screen.findByRole("status");

		expect(successToast).toBeInTheDocument();
		expect(successToast).toHaveTextContent(apiErrorMock.message);
	});
});
