/**
 * Created by Carlo on 16/11/15.
 */
var angular = require('angular');
var smg = angular.module('smg.sheets', [
    'smg.vexflow',
    'smg.generator',
]);

module.exports = function (smg) {
    require('./smgSheetDirective')(smg);
};
