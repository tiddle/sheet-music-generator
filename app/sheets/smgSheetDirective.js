/**
 * Created by Carlo on 09/11/15.
 */
module.exports = function (ngModule) {
    ngModule.directive('smgSheet', function (DataSource, $firebaseArray, UserFactory) {
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

                UserFactory.createUser({
                    username: 'poop',
                    id: 'carlocruz',
                    email: 'head@mee.com',
                    password: 'margharita',
                    extra: 'poopie pants'
                });

                console.log('in here');
            }
        }
    });
};
