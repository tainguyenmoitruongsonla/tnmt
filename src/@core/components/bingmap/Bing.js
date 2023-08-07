
import { createLayerComponent } from '@react-leaflet/core';
import { bingLayer } from './leaflet.bing';

const createLeafletElement = (props) => {
    console.log(bingLayer);
    const instance = L.bingLayer(props.bingkey, props);

    return { instance };
  }

export default createLayerComponent(createLeafletElement);
