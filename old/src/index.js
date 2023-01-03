import 'animate.css/animate.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

/*React Redux config*/
import reduxStore from './app/store';
import { Router } from './Router';

const root = ReactDOM.createRoot(/** @type {HTMLElement} */ (document.getElementById('root')));

export const queryClient = new QueryClient();

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={reduxStore}>
				<Router />
			</Provider>
		</QueryClientProvider>
		<ToastContainer position="bottom-right" />
	</React.StrictMode>,
);
