export interface VideoProps {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
}
export interface VideoPropsResponse {
    results: VideoProps[];
    id: number;
}
export type TrailerProps = {
    id: number;
    key: string;
};
