import randomNumber from '../Utilities/RandomNumber';
import {
    createMusicFromPhrase
} from '../MusicGenerator/Phrase';

const createBar = (notesArr) => {
    return notesArr.reduce((acc, curr) => {
        acc += createBeatNotes(curr);
        return acc;
    }, '');
}

const createBeatNotes = (note) => {
    // For now beatLength is always 1
    var output = '';

    var octave = randomNumber(0, 1) ? '/4 ' : ' /5 ';
    var isRest = randomNumber(1, 5) === 1 ? true : false;
    output += oneBeatOutput(note.duration);

    if (note.isRest) {
        // rests
        output += ' ## ';
    } else {
        output += ` ${note.note.name} ${octave}`;
    }

    // // Triplets
    // if (notesToMake === 3 && !isRest) {
    //     output += ' ^3^ ';
    // }

    return output;
}

const oneBeatOutput = (duration) => {
    let output = '';
    switch (duration) {
        case 0.25:
            output = ':16';
            break;
        case 0.5:
            output = ':8';
            break;
        case 0.75:
            output = ':8d';
            break;
        case 1:
            output = ':4';
            break;
        case 1.5:
            output = ':4d';
            break;
        case 2:
            output = ':2';
            break;
        case 3:
            output = ':2d';
            break;
        case 4:
            output = ':1';
            break;
    }

    return output;
}

export const generateMusicFromObject = (songAttributes) => {
    let output = 'tabstave notation=true tablature=false';
    output += ' key=' + songAttributes.scale.keyName;
    output += ' clef=' + songAttributes.clef;
    output += ' time=' + songAttributes.timeSignature + '\n';
    // TODO: automate creation of phrases
    // output += createPhrase(4, 3, songAttributes.scale.keyName, songAttributes.scale.notes, songAttributes.progression);
    output += createMusicFromPhrase(songAttributes.mainPhrase);
    output += '\ntabstave notation=true tablature=false clef=none';
    output += createMusicFromPhrase(songAttributes.mainPhrase);
    output += '\ntabstave notation=true tablature=false clef=none';
    output += createMusicFromPhrase(songAttributes.mainPhrase);
    output += '\ntabstave notation=true tablature=false clef=none';
    output += createMusicFromPhrase(songAttributes.mainPhrase);
    output += '\ntabstave notation=true tablature=false clef=none';
    output += createMusicFromPhrase(songAttributes.mainPhrase);
    output += '\ntabstave notation=true tablature=false clef=none';
    output += createMusicFromPhrase(songAttributes.mainPhrase);

    return output;
}

export const createMusicFromArray = (musicArr) => {
    let output = musicArr.reduce((acc, curr) => {
        acc += createBar(curr) + ' | ';
        return acc;
    }, '');

    return '\n notes ' + output;
}

export default {
    createMusicFromArray
};