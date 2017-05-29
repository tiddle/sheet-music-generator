import randomNumber from '../Utilities/RandomNumber';
import {
    createMusicFromArray
} from '../VexflowInterface/VexflowInterface';

/**
 * Rotate an array a certain amount
 * @param {array} arr - array to rotate 
 * @param {number} places - number of places to rotate
 */
export const rotates = (arr, places) => {
    let newArr = arr.map(e => e); // duplicate for modification
    let removedNotes = newArr.splice(0, places);

    let output = newArr.concat(removedNotes);
    return output;
}

/**
 * Apply notes to a duration
 * @param {array} durationArr 
 * @param {array} changeIntervalArr 
 */
export const applyNotesToDuration = (durationArr, changeIntervalArr) => {
    return durationArr.reduce((acc, curr, index) => {
        let currentChord = changeIntervalArr[0];

        if (changeIntervalArr.length !== 1) {
            // TODO: this branch
        }

        if (!curr.isRest) {
            curr.note = currentChord[randomNumber(0, currentChord.length - 1)];
        }

        acc.push(curr);

        return acc;
    }, []);
}

/**
 * Create music from a phrase
 * @param {array} musicArr 
 */
export const createMusicFromPhrase = (musicArr) => {
    let phrase = musicArr.reduce((acc, curr) => {
        acc.push(applyNotesToDuration(curr.duration, curr.changeInterval));
        return acc;
    }, []);

    return createMusicFromArray(phrase);

}

/**
 * Create a chord
 * @param {array} notes 
 * @param {number} chordNum 
 */
export const createChord = (notes, chordNum) => {
    // TODO: Handle different chord types
    // 1-3-5-7 to start with (Major 7th)
    let basicChord = [1, 3, 5, 7];
    let output = notes.reduce((acc, curr, index) => {
        if (basicChord.indexOf(index + 1) !== -1) {
            acc.push(curr);
        }

        return acc;
    }, []);

    return output;
}

/**
 * Randomly select a note duration
 * @param {array} durationArr 
 * @param {number} notLongerThan 
 */
export const selectNoteDuration = (durationArr, notLongerThan) => {
    let validChoices = durationArr.reduce((acc, curr) => {
        if (curr <= notLongerThan) {
            acc.push(curr);
        }

        return acc;
    }, []);

    // Fix for odd counts
    if (validChoices.length === 0) {
        validChoices = [0.25];
    }

    return validChoices[randomNumber(0, validChoices.length - 1)];
}

/**
 * Create notes for a bar
 * @param {number} beats 
 */
export const createBarDuration = (beats) => {
    // Removed 0.25, makes the music too hard
    // Removed 0.75, makes the music generation weird
    const choices = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4];

    let output = [];
    while (beats > 0) {
        let currNote = {};
        let duration = selectNoteDuration(choices, beats);

        currNote.duration = duration;
        currNote.isRest = randomNumber(0, 4) === 0;

        if (duration === 1 && !currNote.isRest) {
            currNote.isTriplet = randomNumber(0, 1) === 0;
        }

        output.push(currNote);

        beats -= duration;
    }

    return output;
}

/**
 * Create a phrase with a set duration
 * @param {number} beatsInBar 
 * @param {number} amountOfBars 
 */
export const createDurationPhrase = (beatsInBar, amountOfBars) => {
    let output = [];

    while (amountOfBars > 0) {
        amountOfBars--;
        output.push(createBarDuration(beatsInBar));
    }

    output = cleanUpMusicArr(output);

    return output;
}

export const calculateChordChangeInterval = (amountOfBars, progressionArr) => {
    // TODO: Handle when amountOfBars > progressionArr
    let extraChords = progressionArr.length % amountOfBars;

    if (amountOfBars / progressionArr.length === 1) {
        amountOfBars *= 2;
    }

    let output = [];
    for (let i = 0; i < amountOfBars; i++) {
        let bar = [];
        if (extraChords > 0 && i === 0) {
            if (randomNumber(0, 1) === 0) {
                bar.push(progressionArr.pop());
                extraChords = 0;
            }
        }

        if (extraChords > 0 && i === amountOfBars - 1) {
            bar.push(progressionArr.pop());
        }

        bar.push(progressionArr.pop());
        output.push(bar);
    }

    return output;
}

export const createPhrase = (beatsInBar, phraseBarDuration, keyNotes, progression) => {
    // Main bit is here
    // TODO: Create a duration so that it's not 1 chord per bar
    // TODO: Turn this into duration base first, then apply the notes afterwards

    let bars = progression.map((curr, index) => {
        let adjustedScale = rotates(keyNotes, curr - 1);
        return createChord(adjustedScale);
    });

    const durationPhrase = createDurationPhrase(beatsInBar, phraseBarDuration);
    const changeInterval = calculateChordChangeInterval(phraseBarDuration, bars);

    return durationPhrase.reduce((acc, curr, index) => {
        acc.push({
            duration: curr,
            changeInterval: changeInterval[index]
        })

        return acc;
    }, []);
}


export const cleanUpMusicArr = (notesArr) => {
    return notesArr.reduce((acc, curr) => {
        if (acc.length > 0) {
            if (acc[acc.length - 1].isRest && curr.isRest) {
                acc[acc.length - 1].duration += curr.duration;
                return acc;
            }
        }

        acc.push(curr);
        return acc;
    }, []);
}