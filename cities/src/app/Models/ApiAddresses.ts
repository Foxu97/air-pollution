export class ApiAddresses {
    private _basicMeasurementsUrl: string = "https://api.openaq.org/v1/measurements";
    private _sss: string = "?country=PL&limit=10&sort=desc&parameter=so2&order_by=value"

    public getMeasurementsUrl() {
        return this._basicMeasurementsUrl;
    }
}