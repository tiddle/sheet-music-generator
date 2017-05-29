import {
    oneBeatOutput,
    createBeatNotes
} from './VexflowInterface';

describe('VexflowInterface', () => {
    it('oneBeatOutput should select a note', () => {
        expect(oneBeatOutput(.25)).toEqual(':16');
        expect(oneBeatOutput(.5)).toEqual(':8');
        expect(oneBeatOutput(.75)).toEqual(':8d');
        expect(oneBeatOutput(1)).toEqual(':4');
        expect(oneBeatOutput(1.5)).toEqual(':4d');
        expect(oneBeatOutput(2)).toEqual(':2');
        expect(oneBeatOutput(3)).toEqual(':2d');
        expect(oneBeatOutput(4)).toEqual(':1');
    });

    it('createBeatNotes should generate a note', () => {
        const note = {
            duration: 1,
            note: {
                name: 'A'
            }
        };

        expect([':4 A /4 ', ':4 A /5 ']).toContain(createBeatNotes(note));

        note.isRest = true;
        expect([':4 ## ']).toContain(createBeatNotes(note));
    })
});