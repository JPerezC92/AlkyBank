import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { LoginForm } from "@/auth/components";
import { Credentials } from "@/auth/schemas";
import { useAuthStore } from "@/auth/store";
import { AuthMockRepository } from "@/tests/modules/auth/repos";
import { ApiErrorMock } from "@/tests/modules/shared/domain";
import { AppWrapperProvider } from "@/tests/utils";

const credentials: Credentials = {
	email: "email@example.com",
	password: "123456aA-",
};

const initialStoreState = useAuthStore.getState();
describe("<LoginForm />", () => {
	beforeEach(() => {
		useAuthStore.setState(initialStoreState, true);
	});

	test("should login successfully ", async () => {
		render(<LoginForm authRepository={AuthMockRepository()} />, {
			wrapper: AppWrapperProvider(),
		});

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button", { name: "Enter" });

		fireEvent.change(emailInput, { target: { value: credentials.email } });
		fireEvent.change(passwordInput, {
			target: { value: credentials.password },
		});

		fireEvent.click(submitButton);

		await waitFor(() =>
			expect(useAuthStore.getState().loadingStatus).toBe("loading")
		);
	});

	test("should contain an error message when the aunthentication fails", async () => {
		const authRepo = AuthMockRepository();

		authRepo.login.mockImplementation(() => {
			throw ApiErrorMock();
		});

		render(<LoginForm authRepository={authRepo} />, {
			wrapper: AppWrapperProvider(),
		});

		const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button", { name: "Enter" });

		fireEvent.change(emailInput, { target: { value: credentials.email } });
		fireEvent.change(passwordInput, {
			target: { value: credentials.password },
		});

		fireEvent.click(submitButton);

		expect(
			await screen.findByText(/Authentication failed/i)
		).toBeInTheDocument();

		await waitFor(() =>
			expect(useAuthStore.getState().loadingStatus).toBe("idle")
		);
	});
});
