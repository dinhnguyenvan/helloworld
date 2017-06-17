import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/rest/Util";
import {BackendResponse, Birthday, Age} from "../src/controller/BackendController";
import BackendController from "../src/controller/BackendController";

let backendController: BackendController = new BackendController();

it("testing my own birthday", function () {
    let birthday: Birthday = {month: 5, day: 11, year: 1994};
    let result: Age = {years: 23, months: 277};

    return backendController.calculateAge(birthday).then(function (response: BackendResponse) {
        expect(response.code).to.equal(200);
        expect(response.body).to.deep.equal(result);
    }).catch(function () {
        expect.fail();
    });
});

it("testing today", function () {
    let birthday: Birthday = {month: 6, day: 17, year: 1994};
    let result: Age = {years: 23, months: 276};

    return backendController.calculateAge(birthday).then(function (response: BackendResponse) {
        expect(response.code).to.equal(200);
        expect(response.body).to.deep.equal(result);
    }).catch(function () {
        expect.fail();
    });
});
