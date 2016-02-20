/**
 * Music Generator
 * @param ngModule
 */
module.exports = function (ngModule) {
    ngModule.factory('Generator', function () {
        var Service = {
            createMusic: createMusic
        };

        var currentAttributes = {};

        function createMusic() {
            var output = 'tabstave notation=true tablature=false';
            output += ' key=' + createKey(['C', 'D']);
            output += ' clef=' + createClef();
            output += ' time=' + createTime()+ '\n';
            // TODO: automate creation of phrases
            output += createPhrase();
            output += '\ntabstave notation=true tablature=false clef=none'
            output += createPhrase();

            console.log(output);
            return output;
        }

        function createKey(selectedKeys) {
            var keys = ['C', 'Am', 'F', 'Dm', 'Bb', 'Gm', 'Eb', 'Cm',
                'Ab', 'Fm', 'Db', 'Bbm', 'Gb', 'Ebm', 'Cb', 'Abm', 'G',
                'Em', 'D', 'Bm', 'A', 'F#m', 'E', 'C#m', 'B', 'G#m', 'F#',
                'D#m', 'C#', 'A#m'];
            var availableKeys = (selectedKeys || keys);

            currentAttributes.key = availableKeys[randomNumber(0, availableKeys.length-1)];
            return currentAttributes.key;
        }

        function createClef() {
            currentAttributes.clef = 'treble';
            return currentAttributes.clef;
        };

        function createTime() {
            currentAttributes.time = '4/4';
            return '4/4';
        }

        function randomNumber(min, max, exclude) {
            var minNum = (min || 0);
            var maxNum = (max || 0);

            result = Math.floor(Math.random() * (maxNum - minNum + 1)) + min;
            if((exclude || []).indexOf(result) !== -1) {
                result = randomNumber(min, max, exclude);
            }

            return result;
        }

        function createPhrase() {
            // TODO: randomise progression selection
            var selectedProgression = progression[0];
            var notes = selectedProgression.map(function(chord) {
                return chords[numberToLetter(chord)];
            });

            var bars = '';
            for(var i = 0, length = notes.length; i < length; i++) {
                bars += createBar(4, notes[i]);
                bars += ' | ';
            }

            return '\n notes '+bars;
        }

        function createBar(beatsInBar, notes) {
            var output = '';
            var beatsLeft = beatsInBar;
            while(beatsLeft > 0) {
                var noteDuration = randomNumber(1, beatsLeft, [3]);
                beatsLeft = beatsLeft - noteDuration;
                if(noteDuration > 1) {
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
            if(duration === 2) {
                output += ':h ';
            }

            if(duration === 3) {
                output += ':h ';
            }

            if(duration === 4) {
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
            output += oneBeatOutput(notesToMake);
            // Create notes based on random notes to make
            for(var i = 0; i < notesToMake; i++) {
                output += notes[randomNumber(0, 2)].toUpperCase();
                output += octave;
            }

            // Triplets
            if(notesToMake === 3) {
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

        var progression = [
            [1, 6, 2, 5], // Pop/rock
            [1, 2, 5, 1],
            [1, 4, 5, 1],
            [1, 6, 4, 5],
            [1, 4, 6, 5],
            [1, 5, 6, 4]
        ];

        var chords = {
            c: ['c', 'e', 'g'],
            d: ['d', 'f', 'a'],
            e: ['e', 'g', 'b'],
            f: ['f', 'a', 'c'],
            g: ['g', 'b', 'd'],
            a: ['a', 'c', 'e'],
            b: ['b', 'd', 'f']
        };

        function numberToLetter(number) {
            return String.fromCharCode(97+number);
        }

        function letterToNumber(letter) {
            return letter.charCodeAt(0)-97;
        }

        return Service;

    });
};
