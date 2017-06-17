"use strict";
var Util_1 = require("../rest/Util");
var BackendController = (function () {
    function BackendController() {
        Util_1.default.trace('BackendControllerImpl::init()');
    }
    BackendController.prototype.calculateAge = function (birthday) {
        return new Promise(function (fulfill, reject) {
            var d = new Date();
            var year = d.getFullYear();
            var ageYears;
            var ageMonths;
            if (d.getMonth() + 1 > birthday.month) {
                ageYears = year - birthday.year;
                ageMonths = ageYears * 12 + (d.getMonth() + 1 - birthday.month);
            }
            else if (d.getMonth() + 1 < birthday.month) {
                ageYears = year - birthday.year - 1;
                ageMonths = ageYears * 12 + (birthday.month - d.getMonth() + 1);
            }
            else if (d.getMonth() + 1 == birthday.month) {
                if (d.getDate() > birthday.day || d.getDate() == birthday.day) {
                    ageYears = year - birthday.year;
                    ageMonths = ageYears * 12;
                }
                else if (d.getDate() < birthday.day) {
                    ageYears = year - birthday.year - 1;
                    ageMonths = ageYears * 12;
                }
            }
            var age = { years: ageYears, months: ageMonths };
            fulfill({ code: 200, body: age });
        });
    };
    return BackendController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BackendController;
//# sourceMappingURL=BackendController.js.map