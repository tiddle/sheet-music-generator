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
                var ref = DataSource.createConnection('/users/'+userDetails.username);
                var userList = $firebaseObject(ref);

                var output = angular.extend(userList, userDetails);
                output.email = null;
                output.id = response.uid;
                output.$priority = userDetails.uid;

                output.$priority = response.uid;
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
            var deferred = $q.defer();
            var ref = DataSource.createConnection('/users/'+username);
            var userList = $firebaseObject(ref);
            deferred.resolve(userList);
            return deferred.promise;
        }

        return Service;
    });
};
