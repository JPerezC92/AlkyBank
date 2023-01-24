import clsx from 'clsx';
import React from 'react';

type InputErrorMessageProps = React.ComponentProps<'p'>;

export const InputErrorMessage: React.FC<InputErrorMessageProps> = ({
	className,
	...props
}) => {
	return <p className={clsx('text-sm', className)} {...props} />;
};
