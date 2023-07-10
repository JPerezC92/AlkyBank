import { act, fireEvent, render, screen } from "@testing-library/react";

import { AccountTransferReceiver } from "@/accounts/domain";
import { accountTransferenceReceiver$ } from "@/accounts/observables";
import { useAccountStore } from "@/accounts/store";
import { useAuthStore } from "@/auth/store";
import { MovementTransferCreateForm } from "@/movements/components";
import { MovementsStubRepository } from "@/movements/repos";
import { AppWrapperProvider } from "@/tests/utils";
import { userStub1 } from "@/users/repos/UsersStub.repository";

describe("<MovementTransferCreateForm />", () => {
	beforeEach(() => {
		useAccountStore.setState({ accountActive: null });
	});

	test("should create a new transference successfully", async () => {
		// GIVEN
		useAuthStore.setState({ user: userStub1 });
		useAccountStore.setState({
			accountActive: {
				balance: 1000,
				currency: "USD",
				id: "1",
				userId: "1",
				income: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
				expense: 0,
			},
		});

		render(
			<MovementTransferCreateForm
				accountTransferReceiverSubject={accountTransferenceReceiver$}
				movementsRepository={MovementsStubRepository()}
			/>,
			{ wrapper: AppWrapperProvider() }
		);

		act(() => {
			accountTransferenceReceiver$.setSubject(
				new AccountTransferReceiver({
					currency: "USD",
					id: "1",
					userDetails: {
						email: "test@gmail.com",
						firstName: "test name",
						lastName: "test last name",
					},
				})
			);
		});

		const ammonutInput = screen.getByLabelText(/amount/i);
		const conceptInput = screen.getByLabelText(/concept/i);
		const submitButton = screen.getByRole("button", { name: /create/i });

		// WHEN
		fireEvent.change(conceptInput, { target: { value: "test concept" } });
		fireEvent.change(ammonutInput, { target: { value: "100" } });
		fireEvent.submit(submitButton);

		// THEN
		expect(await screen.findByText(/ARS 100/i)).toBeInTheDocument();
	});

	test("should contain an error message when the transference fails", async () => {
		// GIVEN
		const movementsStubRepository = MovementsStubRepository();
		jest.spyOn(movementsStubRepository, "create").mockImplementation(() => {
			// eslint-disable-next-line no-throw-literal
			throw {
				statusCode: 500,
				message: "Can not create movement",
				code: "CAN_NOT_CREATE_MOVEMENT",
			};
		});

		useAuthStore.setState({ user: userStub1 });
		useAccountStore.setState({
			accountActive: {
				balance: 1000,
				currency: "USD",
				id: "1",
				userId: "1",
				income: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
				expense: 0,
			},
		});

		render(
			<MovementTransferCreateForm
				accountTransferReceiverSubject={accountTransferenceReceiver$}
				movementsRepository={movementsStubRepository}
			/>,
			{ wrapper: AppWrapperProvider() }
		);

		act(() => {
			accountTransferenceReceiver$.setSubject(
				new AccountTransferReceiver({
					currency: "USD",
					id: "1",
					userDetails: {
						email: "test@gmail.com",
						firstName: "test name",
						lastName: "test last name",
					},
				})
			);
		});

		const ammonutInput = screen.getByLabelText(/amount/i);
		const conceptInput = screen.getByLabelText(/concept/i);
		const submitButton = screen.getByRole("button", { name: /create/i });

		// WHEN
		fireEvent.change(conceptInput, { target: { value: "test concept" } });
		fireEvent.change(ammonutInput, { target: { value: "100" } });
		fireEvent.submit(submitButton);

		// THEN
		expect(
			await screen.findByText(/Can not create movement/i)
		).toBeInTheDocument();
	});
});
