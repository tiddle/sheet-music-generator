module.exports = function (ngModule) {
    ngModule.factory('Sheet', function (DataSource) {
        var Service = {
            createSheet: createSheet
        };

        function createSheet() {
            var ref = DataSource.createConnection('/sheets');
            
        }

        return Service;

    });
};
