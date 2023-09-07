import app from './utils/server';
import { startApp, stopApp } from './utils/utils';

beforeAll(async () => {
	await startApp(app);
});

afterAll(async () => {
	app.close();
	app;
});

test('app should run', async () => {});
