module.exports = function (ngModule) {
    ngModule.factory('DataSource', function ($firebaseObject) {
        var connection;
        var url = 'https://boiling-fire-6401.firebaseio.com';
        var Service = {
            createConnection: createConnection,
        };

        function createConnection(ref) {
            var getUrl = ref ? url + ref : url;
            connection = new Firebase(getUrl)
            return connection;
        }

        return Service;
    });
};
