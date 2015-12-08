module.exports = function (ngModule) {
    ngModule.factory('User', function ($firebaseObject, $firebaseArray, DataSource, Authentication) {
        var Service = {
            createUser: createUser,
            getUser: getUser
        };

        /**
         * Create user accounts
         * @param userDetails
         */
        function createUser(userDetails) {
            return Authentication.createUser(userDetails.email, userDetails.password).then(function(response) {
                var ref = DataSource.createConnection('/users/'+userDetails.id);
                var userList = $firebaseObject(ref);

                var output = angular.extend(userList, userDetails);
                output.email = null;
                output.id = response.uid;
                output.$priority = userDetails.username;
                return userList.$save(output).then(function(response) {
                    return response;
                }, function(error) {
                    console.log(error);
                });
            });
        }

        /**
         * Get user by username
         * @returns {*}
         */
        function getUser(username) {
            return DataSource.createConnection('/users/'+username);
        }

        return Service;
    });
};
