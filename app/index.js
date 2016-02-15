var angular = require('angular');
require('firebase');
require('angularfire');
require('vextabaa');
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