/**
 * Created by Carlo on 16/11/15.
 */
var angular = require('angular');
var smg = angular.module('smg.users', [
    'smg.datasource',
    'smg.authentication',
    'firebase'
]);

module.exports = function (smg) {
    require('./UserFactory')(smg);
};
