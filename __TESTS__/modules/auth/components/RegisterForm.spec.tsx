import {
	fireEvent,
	render,
	Screen,
	screen,
	within,
} from "@testing-library/react";
import * as Router from "next/router";

import { RegisterForm } from "@/auth/components";
import { UserRegisterScheme } from "@/auth/schemas";
import { webRoutes } from "@/shared/utils";
import { ApiErrorMock } from "@/tests/modules/shared/domain";
import { RouterMock } from "@/tests/modules/shared/utils";
import { UsersMockRepository } from "@/tests/modules/users/repos";
import { AppWrapperProvider } from "@/tests/utils";

const userRegister = {
	email: "jhon@gmail.com",
	firstName: "Jhon",
	lastName: "Doe",
	password: "123456aA-",
	confirmPassword: "123456aA-",
} satisfies UserRegisterScheme;

function selectFormInputElementsHelper(screen: Screen) {
	return {
		firstNameInput: screen.getByLabelText(/first Name/i),
		lastNameInput: screen.getByLabelText(/last Name/i),
		emailInput: screen.getByLabelText(/email/i),
		passwordInput: screen.getByLabelText("Password", { exact: true }),
		confirmPasswordInput: screen.getByLabelText("Confirm password", {
			exact: true,
		}),
		submitButton: screen.getByRole("button", { name: /Register/i }),
	};
}
function selectFormControlElementsHelper(screen: Screen) {
	return {
		firstNameControl: screen.getByLabelText(/first Name/i).closest("div"),
		lastNameControl: screen.getByLabelText(/last Name/i).closest("div"),
		emailControl: screen.getByLabelText(/email/i).closest("div"),
		passwordControl: screen
			.getByLabelText("Password", { exact: true })
			.closest("div"),
		confirmPasswordControl: screen
			.getByLabelText("Confirm password", {
				exact: true,
			})
			.closest("div"),
		submitButton: screen.getByRole("button", { name: /Register/i }),
	};
}

describe("<RegisterForm />", () => {
	test("should register an user successfully", async () => {
		const routerMock = RouterMock();
		jest.spyOn(Router, "useRouter").mockReturnValue(routerMock);
		const usersRepo = UsersMockRepository();

		render(<RegisterForm usersRepository={usersRepo} />, {
			wrapper: AppWrapperProvider(),
		});

		const {
			firstNameInput,
			lastNameInput,
			emailInput,
			passwordInput,
			confirmPasswordInput,
			submitButton,
		} = selectFormInputElementsHelper(screen);

		fireEvent.change(firstNameInput, {
			target: { value: userRegister.firstName },
		});
		fireEvent.change(lastNameInput, {
			target: { value: userRegister.lastName },
		});
		fireEvent.change(emailInput, {
			target: { value: userRegister.email },
		});
		fireEvent.change(passwordInput, {
			target: { value: userRegister.password },
		});
		fireEvent.change(confirmPasswordInput, {
			target: { value: userRegister.confirmPassword },
		});

		fireEvent.click(submitButton);

		expect(
			await screen.findByText(/Register Successfully/i)
		).toBeInTheDocument();
		expect(routerMock.push).toHaveBeenCalledWith({
			pathname: webRoutes.auth.login(),
		});
	});

	test("should contain a message when the registration failed", async () => {
		const usersRepo = UsersMockRepository();
		usersRepo.create.mockImplementation(() => {
			throw ApiErrorMock();
		});

		render(<RegisterForm usersRepository={usersRepo} />, {
			wrapper: AppWrapperProvider(),
		});

		const {
			firstNameInput,
			lastNameInput,
			emailInput,
			passwordInput,
			confirmPasswordInput,
			submitButton,
		} = selectFormInputElementsHelper(screen);

		fireEvent.change(firstNameInput, {
			target: { value: userRegister.firstName },
		});
		fireEvent.change(lastNameInput, {
			target: { value: userRegister.lastName },
		});
		fireEvent.change(emailInput, {
			target: { value: userRegister.email },
		});
		fireEvent.change(passwordInput, {
			target: { value: userRegister.password },
		});
		fireEvent.change(confirmPasswordInput, {
			target: { value: userRegister.confirmPassword },
		});

		fireEvent.click(submitButton);

		expect(await screen.findByText(/Register failed/i)).toBeInTheDocument();
	});

	test("should contain an error message when the firstName is empty", async () => {
		const routerMock = RouterMock();
		jest.spyOn(Router, "useRouter").mockReturnValue(routerMock);
		const usersRepo = UsersMockRepository();

		render(<RegisterForm usersRepository={usersRepo} />, {
			wrapper: AppWrapperProvider(),
		});

		const {
			firstNameControl,
			lastNameControl,
			emailControl,
			passwordControl,
			confirmPasswordControl,
			submitButton,
		} = selectFormControlElementsHelper(screen);

		if (
			!firstNameControl ||
			!lastNameControl ||
			!emailControl ||
			!passwordControl ||
			!confirmPasswordControl
		) {
			throw new Error("Fields are missing");
		}

		fireEvent.click(submitButton);

		const firstNameErrorMessage = await within(firstNameControl).findByText(
			/required/i
		);
		expect(firstNameErrorMessage).toBeInTheDocument();

		const lastNameErrorMessage = await within(lastNameControl).findByText(
			/required/i
		);
		expect(lastNameErrorMessage).toBeInTheDocument();

		const emailErrorMessage = await within(emailControl).findByText(
			/required/i
		);
		expect(emailErrorMessage).toBeInTheDocument();

		const passwordErrorMessage = await within(passwordControl).findByText(
			/must contain/i
		);
		expect(passwordErrorMessage).toBeInTheDocument();

		const confirmPasswordErrorMessage = await within(
			confirmPasswordControl
		).findByText(/required/i);
		expect(confirmPasswordErrorMessage).toBeInTheDocument();
	});

	test("should contain an error message when the password and confirmPassword doesnt match", async () => {
		const routerMock = RouterMock();
		jest.spyOn(Router, "useRouter").mockReturnValue(routerMock);
		const usersRepo = UsersMockRepository();

		render(<RegisterForm usersRepository={usersRepo} />, {
			wrapper: AppWrapperProvider(),
		});

		const { passwordInput, confirmPasswordInput } =
			selectFormInputElementsHelper(screen);
		const { passwordControl, confirmPasswordControl, submitButton } =
			selectFormControlElementsHelper(screen);

		fireEvent.change(passwordInput, {
			target: { value: userRegister.password },
		});
		fireEvent.change(confirmPasswordInput, {
			target: { value: userRegister.password + "123" },
		});

		if (!passwordControl || !confirmPasswordControl) {
			throw new Error("Fields are missing");
		}

		fireEvent.click(submitButton);

		const confirmPasswordErrorMessage = await within(
			confirmPasswordControl
		).findByText(/match/i);
		expect(confirmPasswordErrorMessage).toBeInTheDocument();
	});
});
