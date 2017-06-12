import React from 'react';
import ReactDOM from 'react-dom';
import {
  OSMD
} from 'opensheetmusicdisplay';
import music from 'musicjson';

import App from './App.jsx';
import './index.css';

ReactDOM.render( < App / > ,
  document.getElementById('root')
);
var musicjson = {
  "score-partwise": {
    "work": {
      "work-title": "test2"
    },
    "identification": {
      "encoding": {
        "software": "MuseScore 2.1.0",
        "encoding-date": "2017-06-12",
        "supports": [{
            "$": {
              "element": "accidental",
              "type": "yes"
            },
            "%": 3
          },
          {
            "$": {
              "element": "beam",
              "type": "yes"
            },
            "%": 4
          },
          {
            "$": {
              "element": "print",
              "attribute": "new-page",
              "type": "yes",
              "value": "yes"
            },
            "%": 5
          },
          {
            "$": {
              "element": "print",
              "attribute": "new-system",
              "type": "yes",
              "value": "yes"
            },
            "%": 6
          },
          {
            "$": {
              "element": "stem",
              "type": "yes"
            },
            "%": 7
          }
        ]
      }
    },
    "defaults": {
      "scaling": {
        "millimeters": "7.05556",
        "tenths": "40"
      },
      "page-layout": {
        "page-height": "1683.36",
        "page-width": "1190.88",
        "page-margins": [{
            "$": {
              "type": "even"
            },
            "left-margin": "56.6929",
            "right-margin": "56.6929",
            "top-margin": "56.6929",
            "bottom-margin": "113.386",
            "%": 3
          },
          {
            "$": {
              "type": "odd"
            },
            "left-margin": "56.6929",
            "right-margin": "56.6929",
            "top-margin": "56.6929",
            "bottom-margin": "113.386",
            "%": 4
          }
        ]
      },
      "word-font": {
        "$": {
          "font-family": "FreeSerif",
          "font-size": "10"
        }
      },
      "lyric-font": {
        "$": {
          "font-family": "FreeSerif",
          "font-size": "11"
        }
      }
    },
    "credit": {
      "$": {
        "page": "1"
      },
      "credit-words": {
        "_": "test2",
        "$": {
          "default-x": "595.44",
          "default-y": "1626.67",
          "justify": "center",
          "valign": "top",
          "font-size": "24"
        }
      }
    },
    "part-list": {
      "score-part": {
        "$": {
          "id": "P1"
        },
        "part-name": "Piano",
        "part-abbreviation": "Pno.",
        "score-instrument": {
          "$": {
            "id": "P1-I1"
          },
          "instrument-name": "Piano"
        },
        "midi-device": {
          "$": {
            "id": "P1-I1",
            "port": "1"
          }
        },
        "midi-instrument": {
          "$": {
            "id": "P1-I1"
          },
          "midi-channel": "1",
          "midi-program": "1",
          "volume": "78.7402",
          "pan": "0"
        }
      }
    },
    "part": {
      "$": {
        "id": "P1"
      },
      "measure": {
        "$": {
          "number": "1",
          "width": "1077.49"
        },
        "print": {
          "system-layout": {
            "system-margins": {
              "left-margin": "0.00",
              "right-margin": "-0.00"
            },
            "top-system-distance": "170.00"
          }
        },
        "attributes": {
          "divisions": "1",
          "key": {
            "fifths": "0"
          },
          "time": {
            "beats": "4",
            "beat-type": "4"
          },
          "clef": {
            "sign": "G",
            "line": "2"
          }
        },
        "note": {
          "$": {
            "default-x": "75.17",
            "default-y": "-15.00"
          },
          "pitch": {
            "step": "C",
            "octave": "5"
          },
          "duration": "4",
          "voice": "1",
          "type": "whole"
        },
        "barline": {
          "$": {
            "location": "right"
          },
          "bar-style": "light-heavy"
        }
      }
    }
  }
};

function getMusicXmlFromMusicJson(musicJson) {
  return new Promise((resolve, reject) => {
    music.musicXML(musicJson, function (err, xml) {
      if (err) {
        reject(err);
        return;
      }

      resolve(xml);
    })
  });
}

music.musicXML(musicjson, (err, xml) => {
  console.log('in here');

  let osmd = new OSMD(document.getElementById('musicxml'));

  osmd.load('xml.xml')
    .then(
      () => {
        return osmd.render()
      },
      (err) => {
        console.log('in here');
        console.log(err)
      }
    )
    .then(
      () => console.log("Sheet music displayed."),
      (err) => console.log(err)
    )
    .catch((err) => {
      console.log(err);
    });
});