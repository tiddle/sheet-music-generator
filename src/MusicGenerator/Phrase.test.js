import {
    rotates,
    createChord
} from './Phrase';

describe('Phrase', () => {
    it('rotate function should rotate an array', () => {
        expect(rotates([0, 1, 2, 3], 1)).toEqual([1, 2, 3, 0]);
        expect(rotates([0, 1, 2, 3], 2)).toEqual([2, 3, 0, 1]);
    });

    it('createChord should create a chord from an array of notes')
});