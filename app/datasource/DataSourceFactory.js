module.exports = function (ngModule) {
    ngModule.factory('DataSource', function ($firebaseObject) {
        var connection;
        var url = 'https://boiling-fire-6401.firebaseio.com';
        var Service = {
            createConnection: createConnection
        };

        function createConnection() {
            connection = new Firebase(url)
            return connection;
        }

        function testEntry() {
            var connection = createConnection();

            var p = $firebaseObject(connection);
            p.foo = 'bar';
            p.$save().then(function(ref) {
                console.log(ref);
            })
        }

        return Service;
    });
};
