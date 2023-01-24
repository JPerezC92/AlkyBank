import clsx from 'clsx';
import React from 'react';

const colorScheme = {
	ghost: 'ghost',
	primary: 'primary',
	secondary: 'secondary',
	accent: 'accent',
	info: 'info',
	success: 'success',
	warning: 'warning',
	error: 'error',
} as const;

type ColorScheme = (typeof colorScheme)[keyof typeof colorScheme];

export type InputProps = {
	isError?: boolean;
	colorScheme?: ColorScheme;
} & React.ComponentProps<'input'>;

export const Input = React.forwardRef(function Input(
	{ className, isError: error, colorScheme: _colorScheme, value, ...props },
	ref,
) {
	return (
		<>
			<input
				className={clsx(
					'input-bordered input input-sm md:input-md',
					'rounded text-base font-medium transition-all duration-150 md:[&]:text-lg',
					{
						'input-primary': _colorScheme === colorScheme.primary,
						'input-secondary': _colorScheme === colorScheme.secondary,
						'input-accent': _colorScheme === colorScheme.accent,
						'input-error': error,
					},
					className,
				)}
				type='text'
				value={value}
				{...props}
				ref={ref}
			/>
		</>
	);
}) as React.FC<InputProps>;
