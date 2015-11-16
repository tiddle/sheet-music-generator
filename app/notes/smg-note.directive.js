/**
 * Created by Carlo on 09/11/15.
 */
module.exports = function (ngModule) {
    ngModule.directive('smgNote', function (DataSource) {
    return {
        restrict: 'E',
        scope: {},
        bindToController: true,
        templateUrl: 'notes/smg-note.html',
        controllerAs: 'vm',
        controller: function() {
            var vm = this;
            console.log(DataSource);
            vm.greeting = 'In Here......... weeeeeeeeeeeeeeeeee!';
        }
    }
});
};