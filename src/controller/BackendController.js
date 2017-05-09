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
            if (d.getMonth() + 1 > birthday.month) {
                ageYears = year - birthday.year;
            }
            else if (d.getMonth() + 1 < birthday.month) {
                ageYears = year - birthday.year - 1;
            }
            else if (d.getMonth() + 1 == birthday.month) {
                if (d.getDate() > birthday.day || d.getDate() == birthday.day) {
                    ageYears = year - birthday.year;
                }
                else if (d.getDate() < birthday.day) {
                    ageYears = year - birthday.year - 1;
                }
            }
            var age = { years: ageYears };
            fulfill({ code: 200, body: age });
        });
    };
    return BackendController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BackendController;
//# sourceMappingURL=BackendController.js.map