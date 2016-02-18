/**
 * Created by Carlo on 09/11/15.
 */
var angular = require('angular');
var smg = angular.module('smg.generator', []);

module.exports = function(smg) {
    require('./smgGeneratorFactory')(smg);
};
