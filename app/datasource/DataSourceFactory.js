module.exports = function (ngModule) {
    ngModule.factory('DataSource', function ($firebaseObject) {

        var connection;
        var url = 'https://boiling-fire-6401.firebaseio.com';
        var Service = {
            createConnection: createConnection
        };

        function createConnection() {
            connection = new Firebase(url)
            console.log($firebaseObject(connection));
        }

        createConnection()
        console.log('in here');
        return Service;
    });
};
