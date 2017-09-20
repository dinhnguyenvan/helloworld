"use strict";
var Util_1 = require("../rest/Util");
var BackendController = (function () {
    function BackendController() {
        Util_1.default.trace("BackendControllerImpl::init()");
    }
    BackendController.prototype.calculateAge = function (birthday) {
        return new Promise(function (fulfill, reject) {
            try {
                var betweenDays = function (date1, date2) {
                    var oneDay = 1000 * 60 * 60 * 24;
                    var ms1 = date1.getTime();
                    var ms2 = date2.getTime();
                    var difference = ms2 - ms1;
                    return Math.round(difference / oneDay);
                };
                var betweenMonths = function (date1, date2) {
                    var months = (date2.getFullYear() - date1.getFullYear()) * 12;
                    months -= date1.getMonth() + 1;
                    months += date2.getMonth();
                    return months <= 0 ? 0 : months;
                };
                var d = new Date();
                var year = d.getFullYear();
                var month = d.getMonth() + 1;
                var date = d.getDate();
                var birthDate = new Date(birthday.year, birthday.month, birthday.day);
                var today = new Date(year, month, date);
                var ageDays = betweenDays(birthDate, today);
                var ageMonths = betweenMonths(birthDate, today);
                var ageYears = Math.floor(ageDays / 365);
                var ageWeeks = Math.floor(ageDays / 7);
                var ageHours = ageDays * 24;
                var ageMinutes = ageHours * 60;
                var ageSeconds = ageMinutes * 60;
                var age = { years: ageYears, months: ageMonths, weeks: ageWeeks, days: ageDays, hours: ageHours, minutes: ageMinutes, seconds: ageSeconds };
                fulfill({ code: 200, body: age });
            }
            catch (err) {
                reject({ code: 400, body: { error: err } });
            }
        });
    };
    return BackendController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BackendController;
//# sourceMappingURL=BackendController.js.map