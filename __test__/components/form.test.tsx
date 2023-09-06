import GreetingForm from '@/app/components/form';
import '@testing-library/jest-dom';
import {
	act,
	findByAltText,
	findByText,
	fireEvent,
	render,
	screen,
} from '@testing-library/react';

test('Form should change input value and greeting href', async () => {
	render(<GreetingForm />);

	let testInput = await screen.getByRole<HTMLInputElement>('textbox');

	expect(testInput?.placeholder).toContain('Hello World');
	expect(testInput?.type).toContain('text');
	expect(testInput?.value).toContain('');

	await fireEvent.change(testInput, { target: { value: 'this is test' } });

	expect(testInput?.value).toContain('this is test');

	const navigationButton = await screen.getByText('Greet');

	expect(navigationButton).toBeVisible();
	expect(navigationButton).toHaveAttribute('type', 'button');
	expect(navigationButton).toBeEnabled();
	expect((navigationButton as HTMLAnchorElement)?.href).toContain(
		'http://localhost/greeting/thisistest'
	);
});
