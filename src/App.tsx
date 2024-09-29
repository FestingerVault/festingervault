import { routes } from '@generouted/react-router/lazy';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { Providers } from './components/providers';
import './components/store';
export default function App() {
	const router = createHashRouter(routes);
	return (
		<Providers>
			<RouterProvider router={router} />
		</Providers>
	);
}
