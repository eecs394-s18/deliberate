import React, { Component } from 'react';
import './App.css';
import Grid from './Grid.js'
import Main from './routes.js'
import { Provider } from 'react-redux';
import configureStore from './reducers/configureStore.js';

class App extends Component {
  render() {
  	const store = configureStore();
    return (
  		<Provider store={store}>
        	<Main />
		</Provider>
    );
  }
}

export default App;
