import Server from "../src/rest/Server";
import {expect} from 'chai';
import Log from "../src/rest/Util";
import {BackendResponse, Birthday, Age} from "../src/controller/BackendController";
import BackendController from "../src/controller/BackendController";

let backendController: BackendController = new BackendController();

it("testing my own birthday", function () {
    let birthday: Birthday = {month: 5, day: 11, year: 1994};
    let result: Age = {years: 23, months: 277, weeks: 1208, days: 8461, hours: 203064, minutes: 12183840, seconds: 731030400};

    return backendController.calculateAge(birthday).then(function (response: BackendResponse) {
        expect(response.code).to.equal(200);
        console.log(response.body);
        expect(response.body).to.deep.equal(result);
    }).catch(function () {
        expect.fail();
    });
});
