import { hot } from 'react-hot-loader/root';
import React from 'react';



class App extends React.PureComponent {
	render() {
		return (
			<div>
				<h1>Hello World!</h1>
			</div>
		);
	}
}

export default hot(App);