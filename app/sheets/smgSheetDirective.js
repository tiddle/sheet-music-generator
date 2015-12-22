/**
 * Created by Carlo on 09/11/15.
 */
module.exports = function (ngModule) {
    ngModule.directive('smgSheet', function (DataSource, $firebaseArray, User, Authentication) {
        return {
            restrict: 'E',
            scope: {},
            bindToController: true,
            templateUrl: 'sheets/smgSheet.html',
            controllerAs: 'vm',
            controller: function () {
                var vm = this;
                var ref = DataSource.createConnection('/Sheets');
                vm.sheets = $firebaseArray(ref);
            }
        }
    });
};
