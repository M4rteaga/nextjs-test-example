import Home from '../app/page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Home Page', () => {
	it('renders Home page server', async () => {
		render(<Home />);

		const element = await screen.getByText('app/page.tsx');

		expect(element).toBeInTheDocument();
	});
});
