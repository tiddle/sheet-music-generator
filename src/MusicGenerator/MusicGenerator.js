/**
 * Music Generator
 * @param 
 */
const MusicGenerator = () => {

    let currentAttributes = {};
    // 1, 4, 5 Major
    // 2, 3, 6 minor
    // 7 Diminished
    let progression = [
        [1, 6, 2, 5], // Pop/rock
        [1, 2, 5, 1],
        [1, 4, 5, 1],
        [1, 6, 4, 5],
        [1, 4, 6, 5],
        [1, 5, 6, 4]
    ];

    const notes = [{
            name: 'A'
        },
        {
            name: 'A#',
            flat: 'Bb'
        },
        {
            name: 'B',
        },
        {
            name: 'C'
        },
        {
            name: 'C#',
            flat: 'Db'
        },
        {
            name: 'D',
        },
        {
            name: 'D#',
            flat: 'Eb'
        },
        {
            name: 'E'
        },
        {
            name: 'F'
        },
        {
            name: 'F#',
            flat: 'Gb'
        },
        {
            name: 'G'
        },
        {
            name: 'G#',
            flat: 'Ab'
        }
    ];

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

    const scaleCreator = (keyName) => {
        // Major = R,W,W,H,W,W,W,H
        return _reorderNotes(keyName).reduce((acc, curr, index) => {
            let majorNotes = [0, 2, 4, 5, 7, 9, 11, 12];

            if (majorNotes.indexOf(index) !== -1) {
                acc.push(curr);
            }

            return acc;

        }, []);
    };

    const selectProgression = (num = false) => {
        if (!num) {
            return progression[randomNumber(0, progression.length - 1)];
        }

        return progression[num];
    }



    function createKey(selectedKeys) {
        const keys = ['C', 'Am', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm',
            'Ab', 'Fm', 'Db', 'Bbm', 'Gb', 'Ebm', 'Cb', 'Abm', 'G',
            'Em', 'D', 'Bm', 'A', 'F#m', 'E', 'C#m', 'B', 'G#m', 'F#',
            'D#m', 'C#', 'A#m'
        ];
        const availableKeys = (selectedKeys || keys);

        return availableKeys[randomNumber(0, availableKeys.length - 1)];
    }

    function createClef() {
        return 'treble';
    };

    function createTime() {
        return '4/4';
    }

    function randomNumber(min, max, exclude) {
        var minNum = (min || 0);
        var maxNum = (max || 0);

        let result = Math.floor(Math.random() * (maxNum - minNum + 1)) + min;
        if ((exclude || []).indexOf(result) !== -1) {
            result = randomNumber(min, max, exclude);
        }

        return result;
    }


    function selectNoteDuration(durationArr, notLongerThan) {
        const validChoices = durationArr.reduce((acc, curr) => {
            if(curr <= notLongerThan) {
                acc.push(curr);
            }

            return acc;
        }, []);

        return validChoices[randomNumber(0, validChoices.length-1)];
    }

    function createBarDuration(beats) {
        const choices = [0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4];

        let output = [];
        while(beats > 0) {
            let currNote = {};
            let duration = selectNoteDuration(choices, beats);

            if(duration === 1) {
                currNote.isTriplet = randomNumber(0, 1) === 0;
            }

            currNote.duration = duration;
            currNote.isRest = randomNumber(0, 4) === 0;
            
            output.push(currNote);
            
            beats -= duration;
        }

        return output;
    }

    function createDurationPhrase(beatsInBar, amountOfBars) {
        let output = [];

        while(amountOfBars > 0) {
            amountOfBars--;
            output.push(createBarDuration(beatsInBar));
        }

        return output;
    }

    function calculateChordChangeInterval(amountOfBars, progressionArr) {
        // TODO: Handle when amountOfBars > progressionArr
        let extraChords = progressionArr.length%amountOfBars;

        let output = [];
        for(let i = 0; i < amountOfBars; i++) {
            let bar = [];
            if(extraChords > 0 && i === 0) {
                if(randomNumber(0, 1) === 0) {
                    bar.push(progressionArr.pop());
                    extraChords = 0;
                }
            }

            if(extraChords > 0 && i === amountOfBars-1) {
                console.log('in here');
                bar.push(progressionArr.pop());
            }

            bar.push(progressionArr.pop());
            output.push(bar);
        }

        return output;
    }

    function createPhrase(beatsInBar, phraseBarDuration, keyName, keyNotes, progression) {
        // Main bit is here
        // TODO: Create a duration so that it's not 1 chord per bar
        // TODO: Turn this into duration base first, then apply the notes afterwards
        
        const durationPhrase = createDurationPhrase(beatsInBar, phraseBarDuration);

        let phrase = durationPhrase.reduce((acc, curr) => {

        }, []);

        
        let bars = progression.map((curr, index) => {
            let adjustedScale = rotates(keyNotes, curr - 1);
            return createChord(adjustedScale);
        });

        console.log(calculateChordChangeInterval(3, bars));

        let output = bars.reduce((acc, curr) => {
            acc += createBar(4, curr);
            return `${acc} | `;
        }, "");

        console.log(output);
        return '\n notes ' + output;
    }

    function createChord(notes, chordNum) {
        // TODO: Handle different chord types
        // 1-3-5-6 to start with (Major 7th)
        let basicChord = [1, 3, 5, 6];
        let output = notes.reduce((acc, curr, index) => {
            if (basicChord.indexOf(index + 1) !== -1) {
                acc.push(curr);
            }

            return acc;
        }, []);

        return output;
    }

    function rotates(arr, places) {
        let newArr = arr.map(e => e); // duplicate for modification
        let removedNotes = newArr.splice(0, places);

        let output = newArr.concat(removedNotes);
        return output;
    }

    function createBar(beatsInBar, notesArr) {
        var output = '';
        var beatsLeft = beatsInBar;
        while (beatsLeft > 0) {
            let noteDuration = 1;
            // var noteDuration = randomNumber(1, beatsLeft, [3]);
            beatsLeft -= noteDuration;
            // if (noteDuration > 1) {
            // output += createMultiBeatNote(noteDuration, notesArr);
            // } else {
            output += createBeatNotes(notesArr);
            // }
        }
        return output;
    }

    function createMultiBeatNote(duration, notes) {
        var output = '';
        var octave = randomNumber(0, 1) ? '/4 ' : '/5 ';
        if (duration === 2) {
            output += ':h ';
        }

        if (duration === 3) {
            output += ':h ';
        }

        if (duration === 4) {
            output += ':w ';
        }

        return output + notes[randomNumber(0, notes.length - 1)].name + octave;
    }

    function createBeatNotes(notes) {
        // For now beatLength is always 1
        var output = '';

        // Avoiding 16th notes for now, too hard
        var notesToMake = randomNumber(1, 3);
        var octave = randomNumber(0, 1) ? '/4 ' : ' /5 ';
        var isRest = randomNumber(1, 5) === 1 ? true : false;
        output += oneBeatOutput(notesToMake);

        if (isRest) {
            // rests
            output += ':q ## ';
        } else {
            // Create notes based on random notes to make
            for (var i = 0; i < notesToMake; i++) {
                output += notes[randomNumber(0, notes.length - 1)].name;
                output += octave;
            }
        }

        // Triplets
        if (notesToMake === 3 && !isRest) {
            output += ' ^3^ ';
        }

        return output;
    }

    function oneBeatOutput(notesToMake) {
        var beat = {
            1: ':q ',
            2: ':8 ',
            3: ':8 ',
            4: ':16 '
        };

        return beat[notesToMake];
    }

    const createSong = (songAttributes) => {
        var output = 'tabstave notation=true tablature=false';
        output += ' key=' + songAttributes.key;
        output += ' clef=' + songAttributes.clef;
        output += ' time=' + songAttributes.timeSignature + '\n';
        // TODO: automate creation of phrases
        output += createPhrase(4, 3, songAttributes.scale.keyName, songAttributes.scale.notes, songAttributes.progression);
        // output += '\n text|#coda'
        // output += '\n text :w,.1,#coda, | ';

        return output;
    };

    // function letterToNumber(letter) {
    //     return letter.charCodeAt(0)-97;
    // }

    const createMusic = (musicAttributes) => {
        currentAttributes = {
            scale: {
                keyName: 'C',
                notes: scaleCreator('C')
            },
            timeSignature: createTime(),
            key: createKey(['C']),
            progression: selectProgression(0),
            clef: createClef()
        };

        console.log(currentAttributes);
        let song = createSong(currentAttributes);
        return song;
    }

    return {
        createMusic: createMusic
    };
};

export default MusicGenerator;