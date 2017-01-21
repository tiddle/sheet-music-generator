import React, { Component } from 'react';
import vextab from 'vextab/releases/vextab-div';
import MusicGenerator from '../MusicGenerator/MusicGenerator';

class SheetMusic extends Component {
    constructor(props) {
        super(props);
        this.MusicGenerator = new MusicGenerator();
        this.element = <div>Meow</div>;
    }

    componentDidMount() {
        this.sheetMusic = this.MusicGenerator.createMusic();
        console.log(this.sheetMusic);

        let VexTab = vextab.VexTab;
        let Artist = vextab.Artist;
        let Renderer = vextab.Flow.Renderer;

        let render = new Renderer(document.getElementById('music'), Renderer.Backends.CANVAS);
        let artist = new Artist(10, 10, 800, { scale: 1 });
        let vextabOutput = new VexTab(artist);
        vextabOutput.parse(this.sheetMusic);
        let output = artist.render(render);

        
    }

    render() {
        console.log(this.element);
        return this.element;
    }
}

export default SheetMusic;