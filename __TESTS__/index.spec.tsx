import Home from '@/app/page';
import { prettyDOM, render, screen } from '@testing-library/react';

describe('Test <Home />', () => {
	test('should contain the string', () => {
		render(<Home />);

		expect(screen.getByText('app/page.tsx')).toBeInTheDocument();
	});
});
