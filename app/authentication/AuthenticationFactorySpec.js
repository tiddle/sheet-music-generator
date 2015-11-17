describe('Service: smg.authentication.Authentication', function () {

    // load the service's module
    beforeEach(module('smg.authentication'));

    // instantiate service
    var service;

    //update the injection
    beforeEach(inject(function (Authentication) {
        service = Authentication;
    }));

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */
    it('should be injected and defined', function () {
        expect(service).toBeDefined();
    });
});
