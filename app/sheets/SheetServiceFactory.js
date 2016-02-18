module.exports = function (ngModule) {
    ngModule.factory('Sheet', function () {
        var Service = {
            createSheet: createSheet
        };

        function createSheet() {

        }

        return Service;

    });
};
