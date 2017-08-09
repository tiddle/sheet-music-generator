import {
    rotates,
    createChord,
    selectNoteDuration,
    cleanUpMusicArr
} from './Phrase';

describe('Phrase', () => {
    it('rotate function should rotate an array', () => {
        expect(rotates([0, 1, 2, 3], 1)).toEqual([1, 2, 3, 0]);
        expect(rotates([0, 1, 2, 3], 2)).toEqual([2, 3, 0, 1]);
    });

    it('createChord should create a chord from an array of notes', () => {
        const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

        expect(createChord(notes)).toEqual(['C', 'E', 'G', 'B']);
    });

    it('selectDuration should select a duration', () => {
        expect(selectNoteDuration([1, 3], 2)).not.toEqual(3);
        expect(selectNoteDuration([1, 3], 2)).toEqual(1);
        expect(selectNoteDuration([], 2)).toEqual(0.25);
    })

    describe('method `cleanUpMusicArray`', () => {
        it('should not return double rests', () => {
            const positiveResults = [
                [{
                    duration: 1,
                    isRest: true
                }, {
                    duration: 1,
                    isRest: true
                }]
            ];

            positiveResults.forEach((noteArray) => {
                expect(cleanUpMusicArr(noteArray)).toEqual([{
                    duration: 2,
                    isRest: true
                }])
            });
        });
    });
});