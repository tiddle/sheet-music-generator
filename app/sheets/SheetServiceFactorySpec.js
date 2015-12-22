describe('Service: smg.sheets.SheetService', function () {

    // load the service's module
    beforeEach(module('smg.sheets'));

    // instantiate service
    var service;

    //update the injection
    beforeEach(inject(function (SheetService) {
        service = SheetService;
    }));

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */
    it('should be injected and defined', function () {
        expect(service).toBeDefined();
    });
});
