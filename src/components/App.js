import React from 'react';
import '../styles/App.css';
import Login from './Login';
import Home from './Home';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="App">
				<Route path="/" exact component={Login} />
				<Route path="/home" component={Home} />
			</div>
		</Router>
	);
}

export default App;
