"use strict";
var chai_1 = require("chai");
var BackendController_1 = require("../src/controller/BackendController");
var backendController = new BackendController_1.default();
it("Error Case 1: birthday is null", function () {
    var birthday = null;
    return backendController.calculateAge(birthday).then(function () {
        chai_1.expect.fail();
    }).catch(function (response) {
        chai_1.expect(response.code).to.equal(400);
    });
});
it("Error Case 2: birthday is undefined", function () {
    var birthday = undefined;
    return backendController.calculateAge(birthday).then(function () {
        chai_1.expect.fail();
    }).catch(function (response) {
        chai_1.expect(response.code).to.equal(400);
    });
});
//# sourceMappingURL=BackendControllerSpec.js.map