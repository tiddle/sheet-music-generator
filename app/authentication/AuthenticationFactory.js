module.exports = function (ngModule) {
    ngModule.factory('Authentication', function (DataSource, $firebaseAuth) {
        console.log('in here');
        var Service = {
            createUser: createUser,
            login: login
        };

        function createUser(email, password) {
            var ref = $firebaseAuth(DataSource.createConnection());

            return ref.$createUser({
                email: email,
                password: password
            });
        }

        function login(email, password) {
            var ref = DataSource.createConnection();
            ref.authWithPassword({
                email: email,
                password: password
            }, function(error, authData) {
                if(error) {
                    console.log(error);
                } else {
                    console.log('in here', authData);
                    return authData;
                }
            })
        }

        return Service;
    });
};
