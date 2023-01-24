import clsx from 'clsx';
import React from 'react';

const buttonColor = {
	primary: 'primary',
	secondary: 'secondary',
	accent: 'accent',
} as const;

type ColorScheme = (typeof buttonColor)[keyof typeof buttonColor];

type ButtonProps = {
	className?: string;
	colorScheme?: ColorScheme;
	outline?: boolean;
	isLoading?: boolean;
} & React.ComponentProps<'button'>;

export const Button: React.FC<ButtonProps> = ({
	className,
	colorScheme,
	outline,
	isLoading,
	...props
}) => {
	return (
		<button
			className={clsx(
				'btn',
				{
					'btn-primary': colorScheme === buttonColor.primary,
					'btn-secondary': colorScheme === buttonColor.secondary,
					'btn-accent': colorScheme === buttonColor.accent,
					'btn-outline': outline,
					loading: isLoading,
				},
				className,
			)}
			type='button'
			{...props}
		/>
	);
};
