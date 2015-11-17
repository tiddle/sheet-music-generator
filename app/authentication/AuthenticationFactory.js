module.exports = function (ngModule) {
    ngModule.factory('Authentication', function (DataSource) {
        console.log('in here');
        var Service = {
            createUser: createUser
        };

        function createUser(email, password) {
            var ref = DataSource.createConnection();
            ref.createUser({
                email: email,
                password: password
            }, function(error, userData) {
                if(error) {
                    return error;
                } else {
                    console.log(userData);
                    return userData;
                }
            })
        }

        createUser('test@email.com', 'foobar');

        return Service;
    });
};
