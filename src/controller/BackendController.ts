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
            if (d.getMonth() + 1 > birthday.month) {
                ageYears = year - birthday.year;
            } else if (d.getMonth() + 1 < birthday.month) {
                ageYears = year - birthday.year - 1;
            } else if (d.getMonth() + 1 == birthday.month) {
                if (d.getDate() > birthday.day || d.getDate() == birthday.day) {
                    ageYears = year - birthday.year;
                } else if (d.getDate() < birthday.day) {
                    ageYears = year - birthday.year - 1;
                }
            }

            let age: Age = {years: ageYears};
            fulfill({code: 200, body: age});
        })
    }
}
