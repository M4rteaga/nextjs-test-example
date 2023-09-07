import { promisify } from 'node:util';
import http from 'node:http';
import { NextServer } from 'next/dist/server/next';

export interface NextDevOptions {
	cwd?: string;
	env?: NodeJS.Dict<string>;
	nodeArgs?: string[];
	nextBin?: string;

	bootupMarker?: RegExp;
	nextStart?: boolean;
	turbo?: boolean;

	stderr?: false;
	stdout?: false;

	onStdout?: (data: any) => void;
	onStderr?: (data: any) => void;
}

export async function startApp(app: NextServer) {
	// force require usage instead of dynamic import in jest
	// x-ref: https://github.com/nodejs/node/issues/35889
	process.env.__NEXT_TEST_MODE = 'jest';

	// TODO: tests that use this should be migrated to use
	// the nextStart test function instead as it tests outside
	// of jest's context
	await app.prepare();
	const handler = app.getRequestHandler();
	const server = http.createServer(handler);
	server['__app'] = app;

	await promisify(server.listen).apply(server);

	return server;
}

// Launch the app in dev mode.
// export function launchApp(
// 	dir: string,
// 	port: string | number,
// 	opts?: NextDevOptions
// ) {
// 	const options = opts ?? {};
// 	const useTurbo = shouldRunTurboDevTest();

// 	return runNextCommandDev(
// 		[
// 			useTurbo ? getTurbopackFlag() : undefined,
// 			dir,
// 			'-p',
// 			port as string,
// 		].filter(Boolean),
// 		undefined,
// 		{
// 			...options,
// 			turbo: useTurbo,
// 		}
// 	);
// }

export const stopApp = async (server: http.Server) => {
	if (server['__app']) {
		await server['__app'].close();
	}
	await promisify(server.close).apply(server);
};
