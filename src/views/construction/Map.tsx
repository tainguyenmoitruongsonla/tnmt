import { useRef, useEffect } from "react";
import { loadModules } from "esri-loader";

const MapPage = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    loadModules(["esri/Map", "esri/views/MapView", "esri/Basemap", "esri/layers/KMLLayer", "esri/layers/VectorTileLayer",
    "esri/layers/TileLayer"], { css: true })
      .then(([Map, MapView, Basemap, KMLLayer, VectorTileLayer]) => {
        const layer = new KMLLayer({
          url:
            "https://kc08.top/public/files/huyen-quangngai.kmz"
        });

        // const map = new Map({
        //   basemap: "gray-vector",
        //   layers: [layer]
        // });

        

        // var basemapToggle = new BasemapToggle({
        //   view: view,
        //   nextBasemap: "streets-vector"
        // });

        // const featureLayer = new FeatureLayer({
        //   url: 'https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer'
        // });

        const vectorTileLayer = new VectorTileLayer({
          portalItem: {
            id: "72be31d1fa6a42fc895d9a3c0fd8aeef" // World Navigation Map
          },
          opacity: .75
        });

        const basemap = new Basemap({
          baseLayers: [
            vectorTileLayer
          ],
        });

        const map = new Map({
          basemap: basemap,
          layers: [layer]
        });

        const view = new MapView({
          container: mapRef.current,
          map,
          center: [108.5833, 14.975],
          zoom: 8
        });

        // Add the widget to the top-right corner of the view
        view.ui.add(basemap, {
          position: "top-right"
        });

        return () => {
          if (view) {
            // destroy the map view when the component is unmounted
            view.destroy();
          }
        };
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return <div style={{ width: "100%", height: "100%" }} ref={mapRef} />;
};
export default MapPage;