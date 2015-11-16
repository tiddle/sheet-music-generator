describe('Service: smg.datasource.DataSource', function () {

    // load the service's module
    beforeEach(module('smg.datasource'));

    // instantiate service
    var service;

    //update the injection
    beforeEach(inject(function (DataSource) {
        service = DataSource;
    }));

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */
    it('should be injected and defined', function () {
        expect(service).toBeDefined();
    });
});
