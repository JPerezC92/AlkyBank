import { fireEvent, render, screen } from "@testing-library/react";

import { AuthStubRepository } from "@/auth/repos";
import { AppWrapperProvider } from "@/tests/utils";
import { ChangePasswordForm } from "@/users/components";
import { userStub1 } from "@/users/repos";

describe("<ChangePasswordForm />", () => {
	test("should change the password successfully", async () => {
		// GIVEN
		const user = userStub1;
		render(
			<ChangePasswordForm
				userId={user.id}
				authRepository={AuthStubRepository()}
			/>,
			{ wrapper: AppWrapperProvider() }
		);

		const passwordInput = screen.getByTestId("password");
		const newPasswordInput = screen.getByTestId("newPassword");
		const confirmNewPasswordInput = screen.getByTestId("confirmNewPassword");
		const submitButton = screen.getByText(/submit/i);

		// WHEN
		fireEvent.change(passwordInput, { target: { value: "password" } });
		fireEvent.change(newPasswordInput, { target: { value: "newPassword" } });
		fireEvent.change(confirmNewPasswordInput, {
			target: { value: "newPassword" },
		});
		fireEvent.submit(submitButton);

		// THEN
		expect(
			await screen.findByText(/password changed successfully/i)
		).toBeInTheDocument();
	});

	test("should display an error message when the passwords do not match", async () => {
		// GIVEN
		const user = userStub1;
		render(
			<ChangePasswordForm
				userId={user.id}
				authRepository={AuthStubRepository()}
			/>,
			{ wrapper: AppWrapperProvider() }
		);

		const passwordInput = screen.getByTestId("password");
		const newPasswordInput = screen.getByTestId("newPassword");
		const confirmNewPasswordInput = screen.getByTestId("confirmNewPassword");
		const submitButton = screen.getByText(/submit/i);

		// WHEN
		fireEvent.change(passwordInput, { target: { value: "password" } });
		fireEvent.change(newPasswordInput, { target: { value: "newPassword" } });
		fireEvent.change(confirmNewPasswordInput, {
			target: { value: "newPassword1" },
		});
		fireEvent.submit(submitButton);

		// THEN
		expect(
			await screen.findByText(/passwords do not match/i)
		).toBeInTheDocument();
	});

	test("should display an error message when change fail", async () => {
		// GIVEN
		const authStubRepository = AuthStubRepository();
		const user = userStub1;
		jest.spyOn(authStubRepository, "changePassword").mockImplementation(() => {
			// eslint-disable-next-line no-throw-literal
			throw {
				statusCode: 500,
				message: "Failed to update",
				code: "PASSWORD_UPDATE_FAILED",
			};
		});

		render(
			<ChangePasswordForm
				userId={user.id}
				authRepository={authStubRepository}
			/>,
			{ wrapper: AppWrapperProvider() }
		);

		const passwordInput = screen.getByTestId("password");
		const newPasswordInput = screen.getByTestId("newPassword");
		const confirmNewPasswordInput = screen.getByTestId("confirmNewPassword");
		const submitButton = screen.getByText(/submit/i);

		// WHEN
		fireEvent.change(passwordInput, { target: { value: "password" } });
		fireEvent.change(newPasswordInput, { target: { value: "newPassword" } });
		fireEvent.change(confirmNewPasswordInput, {
			target: { value: "newPassword" },
		});
		fireEvent.submit(submitButton);

		// THEN
		expect(await screen.findByText(/update failed/i)).toBeInTheDocument();
	});
});
