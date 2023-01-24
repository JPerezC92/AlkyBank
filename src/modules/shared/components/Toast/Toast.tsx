import clsx from 'clsx';
import { toast, ToastOptions } from 'react-toastify';

const baseBodyClassName =
	'alert flex-row gap-x-2 !p-4 rounded-[inherit] font-semibold [&>div:first-of-type]:scale-125 [&>div:last-of-type]:!m-0 [&>div:first-of-type]:mix-blend-color-dodge';

const baseConfig: ToastOptions = {
	closeButton: false,
	pauseOnHover: true,
	closeOnClick: false,
	position: 'top-left',
	className: 'toast static !p-0',
	progressClassName: 'mix-blend-color-burn',
	autoClose: 5000,
};

export const Success = (Content: React.ReactNode) =>
	toast.success(<>{Content}</>, {
		...baseConfig,
		bodyClassName: clsx(baseBodyClassName, 'alert-success'),
	});

export const Info = (Content: React.ReactNode) =>
	toast.info(<>{Content}</>, {
		...baseConfig,
		bodyClassName: clsx(baseBodyClassName, 'alert-info'),
	});

export const Warning = (Content: React.ReactNode) =>
	toast.warning(<>{Content}</>, {
		...baseConfig,
		bodyClassName: clsx(baseBodyClassName, 'alert-warning'),
	});

export const Error = (Content: React.ReactNode) =>
	toast.error(<>{Content}</>, {
		...baseConfig,
		bodyClassName: clsx(baseBodyClassName, 'alert-error'),
	});
