interface flatrateProvider {
    logo_path: string;
    provider_id: number;
    provider_name: string;
    display_priority: number;
}

interface countryData {
    link: string;
    flatrate: flatrateProvider[];
}
export interface results {
    [countryCode: string]: countryData;
}

export interface movieProvidersProps {
    id: number;
    results: results;
}
