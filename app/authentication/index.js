/**
 * Created by Carlo on 16/11/15.
 */
var angular = require('angular');
var smg = angular.module('smg.authentication', [
    'smg.datasource',
    'firebase'
]);

module.exports = function (smg) {
    require('./AuthenticationFactory')(smg);
};
