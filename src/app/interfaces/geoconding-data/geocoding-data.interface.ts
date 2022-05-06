export interface IGeoCodingData {
	name: string;
	local_names: { [id: string] : string };
	lat: number;
	lon: number;
	country: string;
	state: string;
}