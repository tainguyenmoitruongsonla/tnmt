import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, LayersControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { BingLayer } from 'src/@core/components/bingmap';
import { GeoJSON } from 'react-leaflet';
import ReactLeafletKml from "react-leaflet-kml";

const { BaseLayer } = LayersControl;

const SetViewOnClick = ({ coords, zoom }: any) => {
	const map = useMap();
	map.flyTo(coords, zoom, {
		duration: 1
	});

	// map._layers.forEach((index:any) => {
	// 	console.log(index);
	// })
	return null;
}

const lineStyle = (feature: any) => {
	return {
		fillColor: "transparent",
		weight: 3,
		opacity: 1,
		color: "orange", //Outline color
		fillOpacity: 1,
		className: "line-layer " + feature.properties.id
	};
}

export default function Map({ center, zoom, mapData }: any) {

	const bing_key = "AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L"
	const [kml, setKml] = useState<any>(null);

	useEffect(() => {
        fetch(
          "/kml/tinh-quangngai.kml"
        )
          .then((res) => res.text())
          .then((kmlText) => {
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmlText, "text/xml");console.log(kml);
            setKml(kml);
          });
    }, []);

	return (
		<>
			<MapContainer attributionControl={false} center={center} zoom={zoom} style={{ height: '100%' }}>
				<LayersControl position='topright'>
					<BaseLayer name='Bản đồ hành chính'>
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					</BaseLayer>
					<BaseLayer name='Bản đồ đường'>
						<BingLayer bingkey={bing_key} type="Road" />
					</BaseLayer>
					<BaseLayer name="Bản đồ vệ tinh 1">
						<TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'	/>
					</BaseLayer>
					<BaseLayer checked name='Bản đồ vệ tinh 2'>
						<BingLayer bingkey={bing_key} type="AerialWithLabels" />
					</BaseLayer>
				</LayersControl>
				<GeoJSON data={mapData} style={lineStyle} onEachFeature={(feature, layer) => {
					layer.on({
						click: () => {
							layer.bindPopup(feature.properties.detailContent, { closeOnClick: true, autoClose: true }).openPopup()
						},
						mouseover: (e) => {
							e.target.setStyle({
								color: '#cc34eb',
								opacity: 1,
								weight: 3
							});
						},
						mouseout: (e) => {
							e.target.setStyle({
								color: 'orange',
								opacity: 1,
								weight: 3
							});
						}
					});
				}} />
				<SetViewOnClick coords={center} zoom={zoom} />
				{kml && <ReactLeafletKml kml={kml} />}
			</MapContainer>
		</>
	);
}