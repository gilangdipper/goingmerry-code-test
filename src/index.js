import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './App.container';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducer from './App.reducer';
import { Provider } from 'react-redux';

const store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
