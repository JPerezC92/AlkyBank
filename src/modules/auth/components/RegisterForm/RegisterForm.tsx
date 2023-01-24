'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
	AuthNestRepository,
	AuthRepository,
} from '@/Auth/repositories/AuthRepository';
import { UserRegister, userRegisterValidatorSchema } from '@/Auth/schemas';
import { ToastDispatcher } from '@/Shared/components/Toast';
import { getValidationError, isApiError } from '@/Shared/utils';
import { Button } from '@/UI/components/Button';
import { FormControl } from '@/UI/components/FormControl';
import { Heading } from '@/UI/components/Heading';

type RegisterFormProps = {
	className?: string;
	authRepository?: AuthRepository;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
	className,
	authRepository = AuthNestRepository(),
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserRegister>({
		resolver: zodResolver(userRegisterValidatorSchema),
		mode: 'all',
	});

	const userRegisterQuery = useMutation(
		async (values: UserRegister) => authRepository?.register(values),
		{
			onSuccess: () =>
				ToastDispatcher.Success(<span>Account created successfully</span>),
			onError: (error: unknown) => {
				if (!isApiError(error)) return;

				ToastDispatcher.Error(<span>{getValidationError(error)}</span>);
			},
		},
	);

	return (
		<form
			onSubmit={handleSubmit(values => userRegisterQuery.mutate(values))}
			className={clsx(
				'flex flex-col gap-y-2 rounded border border-accent px-4 py-6 shadow-md',
				className,
			)}
		>
			<Heading size='headline3' className='text-center'>
				Register
			</Heading>

			<FormControl
				{...register('firstName')}
				autoFocus
				colorScheme='primary'
				isError={!!errors.firstName?.message}
				fullWidth
				label='First name'
				errorMessage={errors.firstName?.message}
			/>

			<FormControl
				{...register('lastName')}
				colorScheme='primary'
				label='Last name'
				fullWidth
				isError={!!errors.lastName?.message}
				errorMessage={errors.lastName?.message}
			/>

			<FormControl
				{...register('email')}
				colorScheme='primary'
				label='Email'
				fullWidth
				isError={!!errors.email?.message}
				errorMessage={errors.email?.message}
			/>

			<FormControl
				{...register('password')}
				colorScheme='primary'
				fullWidth
				label='Password'
				type='password'
				isError={!!errors.password?.message}
				errorMessage={errors.password?.message}
			/>

			<FormControl
				{...register('confirmPassword')}
				colorScheme='primary'
				fullWidth
				label='Confirm password'
				type='password'
				isError={!!errors.confirmPassword?.message}
				errorMessage={errors.confirmPassword?.message}
			/>

			<Button
				type='submit'
				colorScheme='primary'
				className='mt-6'
				disabled={userRegisterQuery.isLoading}
				isLoading={userRegisterQuery.isLoading}
			>
				Sign up
			</Button>
		</form>
	);
};
