import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { BasemapLayer } from "react-esri-leaflet";


const Map = () => {
  return (
    <MapContainer center={[21.529737201190642, 103.9692398828125]} zoom={9} scrollWheelZoom={true} style={{height: 'calc(65vh - 135px)', width: "100%"}}>
      <BasemapLayer name="ImageryLabels" />

      <TileLayer
						attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
						url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
						/>
    </MapContainer>
  )
}

export default Map