import { MapContainer, Marker, Popup, TileLayer,  GeoJSON, Polygon} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { BasemapLayer } from "react-esri-leaflet";
import L from 'leaflet';

const Map = () => {

  const polygonCoords = [
    [[14.53344, 108.2046], [14.53344, 109.1687], [15.41891, 109.1687], [15.41891, 108.2046], [14.53344, 108.2046]]
  ];

  const latLngCoords = polygonCoords[0].map(coord => L.latLng(coord[0], coord[1]));

  const polygonStyle = {
    fillColor: "#aac",
    color: "#000",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.7
  };

  return (
    <MapContainer center={[14.975, 108.5833]} zoom={10} scrollWheelZoom={true} style={{height: '100%', width: "100%", position: 'relative'}}>
      <BasemapLayer name="ImageryLabels" />

      <TileLayer
        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />

      <Polygon positions={[latLngCoords]} pathOptions={polygonStyle} />
    </MapContainer>
  );
}

export default Map;
