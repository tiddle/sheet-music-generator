import VexflowInterface from '../VexflowInterface/VexflowInterface';
import randomNumber from '../Utilities/RandomNumber';

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

    function selectNoteDuration(durationArr, notLongerThan) {
        let validChoices = durationArr.reduce((acc, curr) => {
            if(curr <= notLongerThan) {
                acc.push(curr);
            }

            return acc;
        }, []);

        // Fix for odd counts
        if(validChoices.length === 0) {
            validChoices = [0.25];
        }

        return validChoices[randomNumber(0, validChoices.length-1)];
    }

    function createBarDuration(beats) {
        // Removed 0.25, makes the music too hard
        // Removed 0.75, makes the music generation weird
        const choices = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4];

        let output = [];
        while(beats > 0) {
            let currNote = {};
            let duration = selectNoteDuration(choices, beats);

            currNote.duration = duration;
            currNote.isRest = randomNumber(0, 4) === 0;

            if(duration === 1 && !currNote.isRest) {
                currNote.isTriplet = randomNumber(0, 1) === 0;
            }
            
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

        output = cleanUpMusicArr(output);

        return output;
    }

    function calculateChordChangeInterval(amountOfBars, progressionArr) {
        // TODO: Handle when amountOfBars > progressionArr
        let extraChords = progressionArr.length%amountOfBars;

        if(amountOfBars/progressionArr.length === 1) {
            amountOfBars *= 2;
        }

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
                bar.push(progressionArr.pop());
            }

            bar.push(progressionArr.pop());
            output.push(bar);
        }

        return output;
    }



    function createPhrase(beatsInBar, phraseBarDuration, keyNotes, progression) {
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


    function cleanUpMusicArr(notesArr) {
        return notesArr.reduce((acc, curr) => {
            if(acc.length > 0) {
                if(acc[acc.length-1].isRest && curr.isRest) {
                    acc[acc.length-1].duration += curr.duration;
                    return acc;
                }
            }

            acc.push(curr);
            return acc;
        }, []);
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

    const applyNotesToDuration = (durationArr, changeIntervalArr) => {
        return durationArr.reduce((acc, curr, index) => {
            let currentChord = changeIntervalArr[0];
            
            if(changeIntervalArr.length !== 1) {
                // TODO: this branch
            }

            if(!curr.isRest) {
                curr.note = currentChord[randomNumber(0, currentChord.length-1)];
            }

            acc.push(curr);

            return acc;
        }, []);
    } 

    const createMusicFromPhrase = (musicArr) => {
        let phrase = musicArr.reduce((acc, curr) => {
            acc.push(applyNotesToDuration(curr.duration, curr.changeInterval));
            return acc;
        }, []);

        return VexflowInterface.createMusicFromArray(phrase);
        
    }

    const createSong = (songAttributes) => {
        var output = 'tabstave notation=true tablature=false';
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
        // output += '\n text|#coda'
        // output += '\n text :w,.1,#coda, | ';

        return output;
    };

    // function letterToNumber(letter) {
    //     return letter.charCodeAt(0)-97;
    // }

    const createMusicAttr = (musicAttributes) => {
        const key = createKey();
        currentAttributes = {
            scale: {
                keyName: key,
                notes: scaleCreator(key)
            },
            timeSignature: createTime(),
            progression: selectProgression(),
            clef: createClef()
        };

        currentAttributes.mainPhrase = createPhrase(4, 4, currentAttributes.scale.notes, currentAttributes.progression);

        return currentAttributes;
    }

    return {
        createMusicAttr,
        createSong
    };
};

export default MusicGenerator;