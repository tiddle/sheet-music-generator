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
                vm.notes = 'poop';
                vm.music = 'options space=20 tab-stems=true stave-distance=40 tab-stem-direction=down\n tabstave notation=true key=A time=4/4\n notes :q =|: (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |\n notes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :h p5/4';
            }
        }
    });
};
