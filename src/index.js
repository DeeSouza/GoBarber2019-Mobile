import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import Routes from './routes';

import { store, persistor } from './store';
import './config/ReactotronConfig';

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<StatusBar barStyle="light-content" backgroundColor="#7159c1" />
				<Routes />
			</PersistGate>
		</Provider>
	);
}
