var angular = require('angular');
require('firebase');
require('angularfire');
var ngModule = angular
    .module('smg', [
        'smg.authentication'
    ]);

require('./notes')(ngModule);
require('./datasource')(ngModule);
require('./authentication')(ngModule);
