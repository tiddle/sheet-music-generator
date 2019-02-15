import React from 'react';

import './App.css';
import SheetMusic from './SheetMusic/SheetMusic.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			musicAttr: {
				scale: {
					keyName: ''
				}
			}
		};

		this.setMusicAttributes = this.setMusicAttributes.bind(this);
	}

	setMusicAttributes(attrArr) {
		this.setState({ musicAttr: attrArr });
	}

	render() {
		return (
			<div className="App">
				<h1>Sheet Music Generator</h1>
				<p>
					A randomly created song in the key of{' '}
					{this.state.musicAttr.scale.keyName}.{' '}.
				</p>
				<SheetMusic setMusicAttributes={this.setMusicAttributes} />
			</div>
		);
	}
}

export default App;
