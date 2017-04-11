/**
 * Music Generator
 * @param 
 */
const MusicGenerator = () => {

    let currentAttributes = {};
    // 1, 4, 5 Major
    // 2, 3, 5 minor
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

    let chords = {
        c: ['c', 'e', 'g'],
        d: ['d', 'f', 'a'],
        e: ['e', 'g', 'b'],
        f: ['f', 'a', 'c'],
        g: ['g', 'b', 'd'],
        a: ['a', 'c', 'e'],
        b: ['b', 'd', 'f']
    };

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
    const createPattern = (barAmount = 2) => {
        return [
            [{
                    duration: 1
                },
                {
                    duration: 1
                },
                {
                    duration: 1
                },
                {
                    duration: 1,
                    rest: true
                }
            ],
            [{
                    duration: 1
                },
                {
                    duration: 1
                },
                {
                    duration: 1,
                    rest: true
                },
                {
                    duration: 1
                }
            ]
        ];
    };

    function createPhrase(beatsInBar, phraseBarLength, keyName, keyNotes, progression) {
        // TODO: randomise progression selection
        // TODO: Rewrite this. This is not right.

        console.log(keyNotes, keyName);

        let bars = progression.map((curr) => {
            rotates(keyNotes, curr);
        });


        return '\n notes ';
    }

    function createChord(notes, chordNum, type = '7') {

    }

    function rotates(arr, places) {
        // TODO: Rotate chord to the right place
        return arr;
    }

    function createBar(beatsInBar, notes) {
        var output = '';
        var beatsLeft = beatsInBar;
        while (beatsLeft > 0) {
            var noteDuration = randomNumber(1, beatsLeft, [3]);
            beatsLeft -= noteDuration;
            if (noteDuration > 1) {
                output += createMultiBeatNote(noteDuration, notes);
            } else {
                output += createBeatNotes(notes);
            }
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

        return output + notes[randomNumber(0, 2)].toUpperCase() + octave;
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
                output += notes[randomNumber(0, 2)].toUpperCase();
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


    function numberToLetter(number) {
        return String.fromCharCode(97 + number);
    }

    const createSong = (songAttributes) => {
        var output = 'tabstave notation=true tablature=false';
        output += ' key=' + songAttributes.key;
        output += ' clef=' + songAttributes.clef;
        output += ' time=' + songAttributes.timeSignature + '\n';
        // TODO: automate creation of phrases
        output += createPhrase(4, 4, songAttributes.scale.keyName, songAttributes.scale.notes, songAttributes.progression);
        // output += '\n text|#coda'
        // output += '\ntabstave notation=true tablature=false clef=none'
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
            progression: selectProgression(),
            clef: createClef(),
            mainPattern: createPattern(),
            bridgePattern: createPattern()
        };

        let song = createSong(currentAttributes);

        console.log(song);

        return song;
    }

    return {
        createMusic: createMusic
    };
};

export default MusicGenerator;