/**
 * Created by Carlo on 09/11/15.
 */
module.exports = function (ngModule) {
    ngModule.directive('smgNote', function (Authentication) {
    return {
        restrict: 'E',
        scope: {},
        bindToController: true,
        templateUrl: 'notes/smgNote.html',
        controllerAs: 'vm',
        controller: function() {
            var vm = this;
            vm.greeting = 'In Here......... weeeeeeeeeeeeeeeeee!';
        }
    }
});
};