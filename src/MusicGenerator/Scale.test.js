import {
    createKey,
    scaleCreator
} from './Scale';

describe('Scale', () => {
    it('createKey should select a key', () => {
        expect(createKey(['A'])).toEqual('A');
        expect(createKey(['B'])).toEqual('B');
        expect(createKey(['Am'])).toEqual('Am');
        expect(['C', 'Am', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm',
            'Ab', 'Fm', 'Db', 'Bbm', 'Gb', 'Ebm', 'Cb', 'Abm', 'G',
            'Em', 'D', 'Bm', 'A', 'F#m', 'E', 'C#m', 'B', 'G#m', 'F#',
            'D#m', 'C#', 'A#m'
        ]).toContain(createKey());
    });

    it('scaleCreator should create a scale according to they key passed in', () => {
        expect(scaleCreator('C')[0].name).toEqual('C');
        expect(scaleCreator('C')[3].name).toEqual('F');

        expect(scaleCreator('F')[0].name).toEqual('F');
        expect(scaleCreator('F')[3].name).toEqual('A#');
    })
});