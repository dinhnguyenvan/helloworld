import Log from "../rest/Util";

export interface BackendResponse {
    code: number,
    body: {}
}

export interface Birthday {
    month: number,
    day: number,
    year: number
}

export interface Age {
    years: number,
    months: number
}

export default class BackendController {

    constructor() {
        Log.trace('BackendControllerImpl::init()');
    }

    calculateAge(birthday: Birthday): Promise<BackendResponse> {
        return new Promise(function (fulfill, reject) {            
            let d: any = new Date();
            let year = d.getFullYear();

            let ageYears: number;
            let ageMonths: number;

            // before birth month
            if (d.getMonth() + 1 > birthday.month) {
                ageYears = year - birthday.year;
                ageMonths = ageYears * 12 + (d.getMonth() + 1 - birthday.month);

            // after birth month
            } else if (d.getMonth() + 1 < birthday.month) {
                ageYears = year - birthday.year - 1;
                ageMonths = ageYears * 12 + (birthday.month - d.getMonth() + 1);

            // on the birth month
            } else if (d.getMonth() + 1 == birthday.month) {
                if (d.getDate() > birthday.day || d.getDate() == birthday.day) {
                    ageYears = year - birthday.year;
                    ageMonths = ageYears * 12;
                } else if (d.getDate() < birthday.day) {
                    ageYears = year - birthday.year - 1;
                    ageMonths = ageYears * 12;
                }
            }

            // final age object
            let age: Age = {years: ageYears, months: ageMonths};
            fulfill({code: 200, body: age});
        })
    }
}
