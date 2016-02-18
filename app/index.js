var angular = require('angular');
require('script!../node_modules/vextab/releases/vextab-div.js');

var ngModule = angular
    .module('smg', []);

require('./notes')(ngModule);
require('./vextab')(ngModule);
require('./generator')(ngModule);
require('./sheets')(ngModule);