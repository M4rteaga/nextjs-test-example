'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

export default function GreetingForm() {
	const [inputText, setInput] = useState<string>('');
	return (
		<div className="flex flex-row space-x-2 mt-4">
			<input
				type="text"
				className="text-black"
				placeholder="Hello World"
				onChange={(e) => {
					setInput(e.target.value);
				}}
			/>
			<Link type="button" href={`/greeting/${inputText.replaceAll(' ', '')}`}>
				Greet
			</Link>
		</div>
	);
}
