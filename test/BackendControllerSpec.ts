import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/rest/Util";
import {BackendResponse, Birthday, Age} from "../src/controller/BackendController";
import BackendController from "../src/controller/BackendController";

let backendController: BackendController = new BackendController();

it("Testing my own birthday May 11th, 1994 (update age before each test)", function () {
    let birthday: Birthday = {month: 5, day: 11, year: 1994};
    let age: Age = {years: 23, months: 279, weeks: 1218, days: 8527, 
                    hours: 204648, minutes: 12278880, seconds: 736732800};

    return backendController.calculateAge(birthday).then(function (response: BackendResponse) {
        expect(response.code).to.equal(200);
        console.log(response.body);
        expect(response.body).to.deep.equal(age);
    }).catch(function () {
        expect.fail();
    });
});

it("Error Case 1: birthday is null", function () {
    let birthday: any = null;

    return backendController.calculateAge(birthday).then(function () {
        expect.fail();
    }).catch(function (response: BackendResponse) {
        expect(response.code).to.equal(400);
    });
});

it("Error Case 2: birthday is undefined", function () {
    let birthday: any = undefined;

    return backendController.calculateAge(birthday).then(function () {
        expect.fail();
    }).catch(function (response: BackendResponse) {
        expect(response.code).to.equal(400);
    });
});
