"use strict";
var chai_1 = require("chai");
var BackendController_1 = require("../src/controller/BackendController");
var backendController = new BackendController_1.default();
it("testing my own birthday", function () {
    var birthday = { month: 5, day: 11, year: 1994 };
    var result = { years: 22 };
    return backendController.calculateAge(birthday).then(function (response) {
        chai_1.expect(response.code).to.equal(200);
        chai_1.expect(response.body).to.deep.equal(result);
    }).catch(function () {
        chai_1.expect.fail();
    });
});
it("testing today", function () {
    var birthday = { month: 5, day: 8, year: 1994 };
    var result = { years: 23 };
    return backendController.calculateAge(birthday).then(function (response) {
        chai_1.expect(response.code).to.equal(200);
        chai_1.expect(response.body).to.deep.equal(result);
    }).catch(function () {
        chai_1.expect.fail();
    });
});
//# sourceMappingURL=BackendControllerSpec.js.map