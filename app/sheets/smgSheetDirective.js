/**
 * Created by Carlo on 09/11/15.
 */
module.exports = function (ngModule) {
    ngModule.directive('smgSheet', function (DataSource) {
        return {
            restrict: 'E',
            scope: {},
            bindToController: true,
            templateUrl: 'notes/smg-note.html',
            controllerAs: 'vm',
            controller: function() {
                var ref = DataSource.createConnection();
                var sheets = ref.child('Sheets');
                console.log('in here');
                sheets.push({
                    title: 'My Title',
                    content: 'aaaa'
                });


            }
        }
    });
};
