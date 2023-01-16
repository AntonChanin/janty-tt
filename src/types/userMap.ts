import OSM from 'ol/source/OSM';

type OpenLayerMapOptions = {
    viewOptions: OpenLayerMapViewOptions;
    layers: OpenLayerMapLayers;
}

type OpenLayerMapViewOptions = {
    center: number[],
    zoom: number
}

type OpenLayerMapLayers = { source: OSM }[];

export type { OpenLayerMapOptions, OpenLayerMapViewOptions, OpenLayerMapLayers };
