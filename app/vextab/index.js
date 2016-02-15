/**
 * Created by Carlo on 16/11/15.
 */
var angular = require('angular');
var smg = angular.module('smg.vextab', []);

module.exports = function (smg) {
    require('./smgVexTabDirective')(smg);
};
