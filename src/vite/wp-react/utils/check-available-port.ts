import { createServer } from 'node:net';

export type CheckAvailablePortOptions = {
	host?: string;
	port?: number;
};

/**
 * The next available port number.
 *
 * Taken from vite
 *
 * @see https://github.com/vitejs/vite/blob/56ae92c33cba6c86ab5819877c19b9ea39f7121b/packages/vite/src/node/http.ts#L141-L175
 */
export async function checkAvailablePort(
	options: CheckAvailablePortOptions = {}
): Promise<number> {
	const server = createServer();

	return new Promise((resolve, reject) => {
		// eslint-disable-next-line prefer-const
		let { host = 'localhost', port = 5173 } = options;

		const handle_error = (error: { code?: string }) => {
			if (error.code === 'EADDRINUSE') {
				server.listen(++port, host);
			} else {
				server.removeListener('error', handle_error);
				reject(error);
			}
		};

		server.on('error', handle_error);

		server.listen(port, host, () => {
			server.removeListener('error', handle_error);
			server.close();
			resolve(port);
		});
	});
}
