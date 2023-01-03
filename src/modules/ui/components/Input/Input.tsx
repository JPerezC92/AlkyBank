import clsx from 'clsx';
import React from 'react';

type InputProps = React.ComponentProps<'input'>;

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
	return (
		<>
			<input
				className={clsx(
					'rounded border-2 border-primary px-2 py-1 text-base font-medium md:text-lg',
					className,
				)}
				type='text'
				{...props}
			/>
		</>
	);
};
