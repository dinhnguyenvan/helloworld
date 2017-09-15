import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/rest/Util";
import {BackendResponse, Birthday, Age} from "../src/controller/BackendController";
import BackendController from "../src/controller/BackendController";

let backendController: BackendController = new BackendController();

it("testing my own birthday", function () {
    let birthday: Birthday = {month: 5, day: 11, year: 1994};
    let age: Age = {years: 23, months: 279, weeks: 1218, days: 8526, 
        hours: 204624, minutes: 12277440, seconds: 736646400};

    return backendController.calculateAge(birthday).then(function (response: BackendResponse) {
        expect(response.code).to.equal(200);
        console.log(response.body);
        expect(response.body).to.deep.equal(age);
    }).catch(function () {
        expect.fail();
    });
});

it("testing bad case", function () {
    let birthday: any = null;

    return backendController.calculateAge(birthday).then(function () {
        expect.fail();
    }).catch(function (response: BackendResponse) {
        expect(response.code).to.equal(400);
    });
});
