import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

// eslint-disable-next-line camelcase
import { Montserrat_Alternates } from '@next/font/google';
import clsx from 'clsx';

import ReactQueryWrapper from '@/app/ReactQueryWrapper';
import { ToastContainer } from '@/Shared/components/ToastContainer';

const montserratAlternates = Montserrat_Alternates({
	subsets: ['latin'],
	variable: '--font-montserrat-alternates',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	display: 'block',
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className={clsx(
				montserratAlternates.variable,
				'grid min-h-full scroll-smooth font-comfortaa',
			)}
		>
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />

			<body className='flex min-h-full flex-col scroll-smooth'>
				<ReactQueryWrapper>{children}</ReactQueryWrapper>

				<ToastContainer />
			</body>
		</html>
	);
}
