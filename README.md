# sheet-music-generator

https://github.com/tiddle/sheet-music-generator

For people who want to practice their sight reading ability. Generates sheet music on the fly so that you can practice sight reading.

## Proposal Object Notation for Music

### Single Note
```
{
    note: 'C',
    duration: '1',
    chord: 'C7',
    isStaccato: true,
    isTenuto: true,
    isMarcato: true,
    isAccent: true,
    isSlurStart: true
}
```

### Music Phrase
Each array item represents a bar
```
[
    [
        {
            note: 'C',
            duration: '1',
            chord: 'C7',
            isSlurStart: true
        }, 
        {
            note: 'E',
            chord: 'C7',
            duration: '1'
        }, 
        {
            note: 'G',
            chord: 'C7',
            duration: '1'
        }, 
        {
            note: 'B',
            chord: 'C7',
            duration: '1',
            isSlurEnd: true
        }
    ],
    [
        {
            note: 'C',
            chord: 'C7',
            duration: '1',
            isSlurStart: true
        }, 
        {
            note: 'E',
            chord: 'C7',
            duration: '1'
        }, 
        {
            note: 'G',
            chord: 'C7',
            duration: '1'
        }, 
        {
            note: 'B',
            chord: 'C7',
            duration: '1',
            isSlurEnd: true
        }
    ]
]
```

## Roadmap

* Better phrasing algorithm
* Ties
* Syncapation
* Form for adjusting settings for generation, eg Change clef, bar counts, no triplets
* Generate full 32 bar song with repeats and bridge
* Seeding, for saving a sheet


## Built with

* ReactJS
* Vexflow
* Webpack
