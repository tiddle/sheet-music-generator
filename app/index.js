var angular = require('angular');
require('firebase');
require('angularfire');
var ngModule = angular
    .module('smg', [
        'smg.datasource',
    ]);

require('./notes')(ngModule);
require('./datasource')(ngModule);
