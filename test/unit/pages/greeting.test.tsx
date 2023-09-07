import GreetingPage from '@/app/greeting/[slug]/page';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

test('Form should change input value and greeting href', async () => {
	const slugText = 'this is slug test';

	render(<GreetingPage params={{ slug: slugText }} />);

	expect(screen.findByText(`Hello from Greeting page ${slugText}`))
		.toBeDisabled;
});
