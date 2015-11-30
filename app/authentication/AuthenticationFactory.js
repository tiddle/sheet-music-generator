module.exports = function (ngModule) {
    ngModule.factory('Authentication', function (DataSource, $firebaseAuth) {
        var Service = {
            createUser: createUser,
            login: login,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser
        };

        var currentUser = {
            auth: false
        };

        function createUser(email, password) {
            var ref = $firebaseAuth(DataSource.createConnection());

            return ref.$createUser({
                email: email,
                password: password
            });
        }

        function login(email, password) {
            var ref = $firebaseAuth(DataSource.createConnection());

            return ref.$authWithPassword({
                email: email,
                password: password
            }).then(function (data) {
                DataSource.createConnection('/users')
                    .startAt('poop')
                    .once('value', function(data) {
                        console.log(data.val());
                    })
                setCurrentUser(data);
                return data;
            });
        }

        function setCurrentUser(auth) {
            currentUser.auth = auth;
            return currentUser;
        }

        function getCurrentUser() {
            return currentUser;
        }

        return Service;
    });
};
