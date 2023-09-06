export default function GreetingPage({ params }: { params: { slug: string } }) {
	return <h1>Hello from Greeting page {params.slug}</h1>;
}
