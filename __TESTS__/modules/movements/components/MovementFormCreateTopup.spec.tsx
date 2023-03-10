import { act, fireEvent, render, screen } from "@testing-library/react";

import { currencyDefault } from "@/currencies/domain";
import { MovementFormCreateTopup } from "@/movements/components";
import { ApiError } from "@/shared/schemas";
import { MovementsMockRepository } from "@/tests/modules/movements/repos";
import { AppWrapperProvider } from "@/tests/utils";

describe("<MovementFormCreateTopup />", () => {
	test("should create a TOPUP Movement successfully", async () => {
		const movementsMockRepo = MovementsMockRepository();
		const topupValues = {
			amount: 7000,
			date: new Date(),
			concept: "Test concept",
			currency: currencyDefault,
		};

		render(
			<MovementFormCreateTopup movementsRepository={movementsMockRepo} />,
			{ wrapper: AppWrapperProvider() }
		);

		const currencyInput = screen.getByLabelText(/currency/i);
		const amountInput = screen.getByLabelText(/amount/i);
		const dateInput = screen.getByLabelText(/date/i);
		const conceptInput = screen.getByLabelText(/concept/i);
		const submitButton = screen.getByRole("button");

		fireEvent.change(currencyInput, {
			target: { value: topupValues.currency },
		});
		fireEvent.change(amountInput, { target: { value: topupValues.amount } });
		fireEvent.change(dateInput, { target: { value: topupValues.date } });
		fireEvent.change(conceptInput, { target: { value: topupValues.concept } });

		act(() => fireEvent.click(submitButton));

		const successToast = await screen.findByRole("status");

		expect(successToast).toBeInTheDocument();
		expect(successToast).toHaveTextContent(topupValues.amount.toString());
	});

	test("should show a Error message when the creation fails", async () => {
		const apiErrorMock: ApiError = {
			code: "TEST_API_ERROR",
			message: "There was a problem with the transaction",
			statusCode: 500,
		};

		const movementsMockRepo = MovementsMockRepository();
		movementsMockRepo.create.mockImplementation(() => {
			throw apiErrorMock;
		});
		const topupValues = {
			amount: 7000,
			date: new Date(),
			concept: "Test concept",
			currency: currencyDefault,
		};

		render(
			<MovementFormCreateTopup movementsRepository={movementsMockRepo} />,
			{ wrapper: AppWrapperProvider() }
		);

		const currencyInput = screen.getByLabelText(/currency/i);
		const amountInput = screen.getByLabelText(/amount/i);
		const dateInput = screen.getByLabelText(/date/i);
		const conceptInput = screen.getByLabelText(/concept/i);
		const submitButton = screen.getByRole("button");

		fireEvent.change(currencyInput, {
			target: { value: topupValues.currency },
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
