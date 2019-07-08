export class ApiAdresses {
    private _measurementsUrl: string = "https://api.openaq.org/v1/measurements";

    public getMeasurementsUrl() {
        return this._measurementsUrl;
    }
}