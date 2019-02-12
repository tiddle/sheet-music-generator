import React from 'react';
import PropTypes from 'prop-types';
import vextab from 'vextab/releases/vextab-div';
import MusicGenerator from '../MusicGenerator/MusicGenerator';

class SheetMusic extends React.Component {
	constructor(props) {
		super(props);
		this.MusicGenerator = MusicGenerator();
	}

	componentDidMount() {
		let musicAttr = this.MusicGenerator.createMusicAttr({
			key: 'C'
		});
		this.props.setMusicAttributes(musicAttr);
		this.sheetMusic = this.MusicGenerator.createSong(musicAttr);

		let VexTab = vextab.VexTab;
		let Artist = vextab.Artist;
		let Renderer = vextab.Flow.Renderer;

		let render = new Renderer(
			document.getElementById('music'),
			Renderer.Backends.CANVAS
		);
		let artist = new Artist(10, 10, 800, {
			scale: 1
		});
		let vextabOutput = new VexTab(artist);
		vextabOutput.parse(this.sheetMusic);
		let output = artist.render(render);

		return output;
	}

	render() {
		return null;
	}
}

SheetMusic.propTypes = {
	setMusicAttributes: PropTypes.func.isRequired
};

export default SheetMusic;
