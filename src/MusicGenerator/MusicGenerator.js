import randomNumber from '../Utilities/RandomNumber';
import { dumper } from 'dumper';
import { scaleCreator, createKey } from '../MusicGenerator/Scale';
import { generateMusicFromObject } from '../VexflowInterface/VexflowInterface';
import { createPhrase } from '../MusicGenerator/Phrase';

/**
 * Music Generator
 * @param
 */
const MusicGenerator = () => {
	let currentAttributes = {};
	// 1, 4, 5 Major
	// 2, 3, 6 minor
	// 7 Diminished
	const progression = [
		[1, 6, 2, 5], // Pop/rock
		[1, 2, 5, 1],
		[1, 4, 5, 1],
		[1, 6, 4, 5],
		[1, 4, 6, 5],
		[1, 5, 6, 4]
	];

	const selectProgression = (num = false) => {
		if (!num) {
			return progression[randomNumber(0, progression.length - 1)];
		}

		return progression[num];
	};

	function createClef() {
		return 'treble';
	}

	function createTime() {
		return '4/4';
	}

	const createSong = (songAttributes, createMusicFromPhrase) => {
		const output = generateMusicFromObject(
			songAttributes,
			createMusicFromPhrase
		);
		return output;
	};

	const createMusicAttr = musicAttributes => {
		const attributes = Object.assign(
			{},
			{
				key: false,
				timeSignature: false,
				progression: false
			},
			musicAttributes
		);

		const key = createKey(attributes.key);
		currentAttributes = {
			scale: {
				keyName: key,
				notes: scaleCreator(key)
			},
			timeSignature: createTime(attributes.timeSignature),
			progression: selectProgression(attributes.progression),
			clef: createClef()
		};

		currentAttributes.mainPhrase = createPhrase(
			4,
			4,
			currentAttributes.scale.notes,
			currentAttributes.progression
		);

		currentAttributes.bridgePhrase = createPhrase(
			4,
			4,
			currentAttributes.scale.notes,
			currentAttributes.progression
        );

		currentAttributes.endingPhrase = createPhrase(
			4,
			4,
			currentAttributes.scale.notes,
			currentAttributes.progression
		);


		return currentAttributes;
	};

	return {
		createMusicAttr,
		createSong
	};
};

export default MusicGenerator;
