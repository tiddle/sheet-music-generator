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

        function randomNumber(min, max) {
            var minNum = (min || 0);
            var maxNum = (max || 0);

            return Math.floor(Math.random() * (maxNum - minNum + 1)) + min;
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
            for(var i = 0; i < beatsInBar; i++) {
                output += createBeatNotes(1, notes);
            }

            return output;
        }

        function createBeatNotes(beatLength, notes) {
            // For now beatLength is always 1
            var output = '';

            var notesToMake = randomNumber(1, 4);
            output += durationOutput(notesToMake);
            // Create notes based on random notes to make
            for(var i = 0; i < notesToMake; i++) {
                output += notes[randomNumber(0, 2)].toUpperCase();

                if(i !== notesToMake-1) {
                    output += '-';
                }
            }
            output += randomNumber(0, 1) ? '/5 ' : ' /4 ';

            if(notesToMake === 3) {
                output += ' ^3^ ';
            }

            return output;
        }

        function durationOutput(notesToMake) {
            var durations = {
                1: ':q ',
                2: ':8 ',
                3: ':8 ',
                4: ':16 '
            };

            return durations[notesToMake];
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
