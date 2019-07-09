export class Endpoints {
    private _measurementsEndpoint: string = "https://api.openaq.org/v1/measurements";
    private _wikiEndpoint: string = "https://en.wikipedia.org/w/api.php?";
    
    public getMeasurementsEndpoint() {
        return this._measurementsEndpoint;
    }
    public getWikiEndpoint() {
        return this._wikiEndpoint;
    }
}