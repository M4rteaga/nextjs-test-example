import Home from '../../app/page';
import '@testing-library/jest-dom';
import {
	findByAltText,
	findByText,
	render,
	screen,
} from '@testing-library/react';

describe('Home Page', () => {
	it('Home should have header', async () => {
		render(<Home />);

		await screen.getByRole('heading');
		const element = await screen.getByText('app/page.tsx');

		expect(element).toBeInTheDocument();
		expect(screen.getByRole('heading')).toHaveTextContent(
			'Get started by editing app/page.tsx'
		);
	});

	it('Home should have nexjs logo', async () => {
		render(<Home />);

		const testImage = document.querySelector('img') as HTMLImageElement;

		expect(testImage).toBeVisible();
		expect(testImage.alt).toContain('Vercel Logo');
		expect(testImage.src).toContain('http://localhost/vercel.svg');
	});

	it('Home should have an input with "Hello world" placeholer and "greeting" anchore', async () => {
		render(<Home />);

		const testInput = document.querySelector('input');

		expect(testInput?.placeholder).toContain('Hello World');
		expect(testInput?.type).toContain('text');

		const navigationButton = await screen.getByText('Greet');

		expect(navigationButton).toBeVisible();
		expect(navigationButton).toHaveAttribute('type', 'button');
		expect((navigationButton as HTMLAnchorElement)?.href).toContain(
			'/greeting'
		);
	});
});
