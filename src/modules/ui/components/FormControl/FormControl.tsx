import clsx from 'clsx';
import React, { useId } from 'react';

import { Input } from '@/UI/components/Input';
import { InputProps } from '@/UI/components/Input/Input';

type FormControlProps = {
	className?: string;
	label: string;
	fullWidth?: boolean;
	errorMessage?: React.ReactNode;
} & InputProps;

export const FormControl = React.forwardRef(function FormControl(
	{ className, label, isError: error, fullWidth, errorMessage, ...props },
	ref,
) {
	const formControlId = useId();

	return (
		<div className='transition-all duration-150'>
			<label htmlFor={formControlId} className={clsx('label block pb-1')}>
				<span className='label-text font-bold md:text-base'>{label}</span>
			</label>

			<Input
				aria-errormessage={formControlId}
				aria-invalid={error}
				className={clsx(['block', { 'w-full': fullWidth }, className])}
				id={formControlId}
				isError={error}
				ref={ref}
				{...props}
			/>

			<label htmlFor={formControlId} className='label py-1' id={formControlId}>
				<span
					className={clsx(
						'label-text-alt',
						'block text-xs font-semibold italic text-error transition-all duration-150 md:text-sm',
					)}
				>
					{errorMessage}
				</span>
			</label>
		</div>
	);
}) as React.FC<FormControlProps>;
