export type MapLayer = {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][] | number[];
  };
  properties: {
    id: number;
    type: string;
    color: string;
  };
};