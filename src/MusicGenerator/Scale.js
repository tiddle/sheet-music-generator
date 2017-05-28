import {
    notes
} from './Note';

import randomNumber from '../Utilities/RandomNumber';

/**
 * Reorder notes to have base note first
 * @param {string} keyName 
 */
const _reorderNotes = (keyName) => {
    let splitNotes = notes.reduce((acc, curr) => {
        // Split notes into 2 arrays to combine later
        if (curr.name.toUpperCase() === keyName.toUpperCase()) {
            acc.found = true;
        }

        if (acc.found) {
            acc.before.push(curr);
        } else {
            acc.after.push(curr);
        }

        return acc;


    }, {
        before: [],
        after: [],
        found: false
    });

    return splitNotes.before.concat(splitNotes.after);
}

/**
 * Create scale of notes for a key
 * @param {string} keyName 
 */
export const scaleCreator = (keyName) => {
    // Major = R,W,W,H,W,W,W,H
    return _reorderNotes(keyName).reduce((acc, curr, index) => {
        let majorNotes = [0, 2, 4, 5, 7, 9, 11, 12];

        if (majorNotes.indexOf(index) !== -1) {
            acc.push(curr);
        }

        return acc;

    }, []);
};

/**
 * Select a key from an array of keys
 * @param {array} selectedKeys 
 */
export const createKey = (selectedKeys) => {
    const keys = ['C', 'Am', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm',
        'Ab', 'Fm', 'Db', 'Bbm', 'Gb', 'Ebm', 'Cb', 'Abm', 'G',
        'Em', 'D', 'Bm', 'A', 'F#m', 'E', 'C#m', 'B', 'G#m', 'F#',
        'D#m', 'C#', 'A#m'
    ];
    const availableKeys = (selectedKeys || keys);

    return availableKeys[randomNumber(0, availableKeys.length - 1)];
}