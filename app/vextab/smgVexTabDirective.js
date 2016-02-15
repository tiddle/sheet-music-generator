/**
 * Created by Carlo on 09/11/15.
 */
module.exports = function (ngModule) {
    ngModule.directive('smgVexTab', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                notes: '='
            },
            bindToController: true,
            templateUrl: 'vextab/smgVexTab.html',
            controllerAs: 'vm',
            controller: function ($scope, $element) {
                var vm = this;
                console.log($element);
            }
        }
    });
};
