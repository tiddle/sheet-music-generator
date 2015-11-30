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

                User.createUser({
                    username: 'poop',
                    id: 'carlocruz',
                    email: 'head@mee.com',
                    password: 'margharita',
                    extra: 'poopie pants'
                });

                Authentication.login('head@mee.com', 'margharita').then(function(data) {
                    console.log(data);
                });

                console.log('in here');
            }
        }
    });
};
