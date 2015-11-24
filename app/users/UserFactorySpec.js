describe('Service: smg.users.UserFactory', function () {

    // load the service's module
    beforeEach(module('smg.users'));

    // instantiate service
    var service;

    //update the injection
    beforeEach(inject(function (UserFactory) {
        service = UserFactory;
    }));

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */
    it('should be injected and defined', function () {
        expect(service).toBeDefined();
    });
});
