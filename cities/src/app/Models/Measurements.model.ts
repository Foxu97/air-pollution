export class Measurements {
    meta: {
        name: string,
        license: string,
        website: string,
        page: number,
        limit: number,
        found: number
    };
    results: [
        {
            location: string,
            parameter: string,
            date: {
                utc: string,
                local: string
            },
            value: number,
            unit: string,
            coordinates: {
                latitude: number,
                longitude: number
            },
            country: string,
            city: string
        }
    ]
}