var angular = require('angular');
require('firebase');
require('angularfire');
require('script!../node_modules/vextab/releases/vextab-div.js');

var ngModule = angular
    .module('smg', [
        'smg.authentication'
    ]);

require('./notes')(ngModule);
require('./datasource')(ngModule);
require('./authentication')(ngModule);
require('./users')(ngModule);
require('./vextab')(ngModule);
require('./sheets')(ngModule);