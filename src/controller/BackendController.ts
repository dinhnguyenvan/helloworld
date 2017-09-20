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
    months: number,
    weeks: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}

export default class BackendController {

    constructor() {
        Log.trace('BackendControllerImpl::init()');
    }

    public calculateAge(birthday: Birthday): Promise<BackendResponse> {
        return new Promise(function (fulfill, reject) {
            if (birthday == null || birthday == {} || birthday == undefined) {
                reject({code: 400, body: {error: "somethings not quite right"}});
            }

            try {
                let d: Date = new Date();
                let year: number = d.getFullYear();
                let month: number = d.getMonth() + 1;
                let date: number = d.getDate();

                let birthDate: Date = new Date(birthday.year, birthday.month, birthday.day);
                let today: Date = new Date(year, month, date);
                
                let betweenDays = function(date1: Date, date2: Date): number {
                    let oneDay: number = 1000 * 60 * 60 * 24;
                    let ms1: number = date1.getTime();
                    let ms2: number = date2.getTime();
                    let difference: number = ms2 - ms1;

                    return Math.round(difference/oneDay);
                }

                let betweenMonths = function(date1: Date, date2: Date): number {
                    let months: number = (date2.getFullYear() - date1.getFullYear()) * 12;
                    months -= date1.getMonth() + 1;
                    months += date2.getMonth();
                    
                    return months <= 0 ? 0 : months;
                }

                let ageDays: number = betweenDays(birthDate, today);
                let ageMonths: number = betweenMonths(birthDate, today);
                let ageYears: number = Math.floor(ageDays / 365);
                let ageWeeks: number = Math.floor(ageDays / 7);
                let ageHours: number = ageDays * 24;
                let ageMinutes: number = ageHours * 60;
                let ageSeconds: number = ageMinutes * 60;

                let age: Age = {years: ageYears, months: ageMonths, weeks: ageWeeks, days: ageDays, 
                                hours: ageHours, minutes: ageMinutes, seconds: ageSeconds};
                
                fulfill({code: 200, body: age});
            } catch (err) {
                reject({code: 400, body: {error: err}});
            }
        })
    }
}
