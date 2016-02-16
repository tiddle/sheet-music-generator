/**
 * Created by Carlo on 09/11/15.
 */
module.exports = function (ngModule) {
    ngModule.directive('smgVexTab', function ($compile, $http) {
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
                vm.notes = vm.notes ? vm.notes : 'tabstave';
                var ren = new Vex.Flow.Renderer($element.find('canvas')[0], Vex.Flow.Renderer.Backends.CANVAS);
                var artist = new Artist(10, 10, 800, {scale: 1});
                var vextab = new VexTab(artist);
                vextab.parse(vm.notes);
                artist.render(ren);
            }
        }
    });
};
