import { render, screen } from '@testing-library/react';

import Home from '@/app/page';
import { AppTestWrapper } from '@/Test/shared/queryClientWrapper.fixture';

describe('Test <Home />', () => {
	test('should contain the string', () => {
		render(<Home />, { wrapper: AppTestWrapper() });

		expect(screen.getByText('Register')).toBeInTheDocument();
	});
});
