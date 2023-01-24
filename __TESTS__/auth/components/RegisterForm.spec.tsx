import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { RegisterForm } from '@/Auth/components/RegisterForm';
import { userEndpointMock, userRegisterMock } from '@/Test/auth/fixtures';
import { AuthMockRepository } from '@/Test/auth/fixtures/AuthMockRepository';
import { AppTestWrapper } from '@/Test/shared/queryClientWrapper.fixture';

function inputSelectorHelper(s: typeof screen) {
	const firstName = s.getByLabelText(/First name/i);
	const lastName = s.getByLabelText(/Last name/i);
	const email = s.getByLabelText(/Email/i);
	const password = s.getByLabelText('Password');
	const confirmPassword = s.getByLabelText(/Confirm password/i);

	return { firstName, lastName, email, password, confirmPassword };
}

describe('Test <RegisterForm />', () => {
	beforeAll(() => {
		jest.restoreAllMocks();
	});

	test('should register an user successfully', async () => {
		const authRepository = AuthMockRepository();
		authRepository.register.mockResolvedValue(userEndpointMock);

		render(<RegisterForm authRepository={authRepository} />, {
			wrapper: AppTestWrapper(),
		});

		const submitButton = screen.getByText(/sign up/i);

		const { firstName, lastName, email, password, confirmPassword } =
			inputSelectorHelper(screen);

		fireEvent.change(firstName, {
			target: { value: userRegisterMock.firstName },
		});
		fireEvent.change(lastName, {
			target: { value: userRegisterMock.lastName },
		});
		fireEvent.change(email, { target: { value: userRegisterMock.email } });
		fireEvent.change(password, {
			target: { value: userRegisterMock.password },
		});
		fireEvent.change(confirmPassword, {
			target: { value: userRegisterMock.confirmPassword },
		});

		fireEvent.click(submitButton);

		const successAlert = screen.findByRole('alert');

		expect(screen.getByText(/register/i)).toBeInTheDocument();
		await waitFor(async () => {
			expect(authRepository.register).toHaveBeenCalledTimes(1);
			expect(authRepository.register).toBeCalledWith(userRegisterMock);
			expect(authRepository.register).toHaveReturnedTimes(1);
			expect(await successAlert).toBeInTheDocument();
			expect(await successAlert).toHaveTextContent(/successfully/i);
		});
	});

	test('fields should be invalid if doesnt match the validator schema', async () => {
		render(<RegisterForm authRepository={AuthMockRepository()} />, {
			wrapper: AppTestWrapper(),
		});

		const submitButton = screen.getByText(/sign up/i);

		const { firstName, lastName, email, password, confirmPassword } =
			inputSelectorHelper(screen);

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(firstName).toHaveAttribute('aria-invalid', 'true');
			expect(firstName).toHaveAttribute('aria-invalid', 'true');
			expect(lastName).toHaveAttribute('aria-invalid', 'true');
			expect(email).toHaveAttribute('aria-invalid', 'true');
			expect(password).toHaveAttribute('aria-invalid', 'true');
			expect(confirmPassword).toHaveAttribute('aria-invalid', 'true');
		});
	});

	test('confirm password should be invalid if miassmatch with the password', async () => {
		render(<RegisterForm authRepository={AuthMockRepository()} />, {
			wrapper: AppTestWrapper(),
		});

		const submitButton = screen.getByText(/sign up/i);
		const { firstName, lastName, email, password, confirmPassword } =
			inputSelectorHelper(screen);

		fireEvent.change(firstName, {
			target: { value: userRegisterMock.firstName },
		});
		fireEvent.change(lastName, {
			target: { value: userRegisterMock.lastName },
		});
		fireEvent.change(email, { target: { value: userRegisterMock.email } });
		fireEvent.change(password, {
			target: { value: userRegisterMock.password },
		});
		fireEvent.change(confirmPassword, {
			target: { value: 'invalid confirm password' },
		});

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(confirmPassword).toHaveAttribute('aria-invalid', 'true');
		});
	});
});
