import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, LayersControl, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { BingLayer } from 'src/@core/components/bingmap';
import { GeoJSON } from 'react-leaflet';
import ReactLeafletKml from "react-leaflet-kml";
import MapPopup from './pop-up';
import { Typography } from '@mui/material';

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

// Create style for map line
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

// Create icon for map marker
const createIcon = (url:any) => {
	return new L.Icon({
	  iconUrl: url,
	  iconSize: [18, 18],
	  iconAnchor: [18, 18],
	  popupAnchor: [-9, -18]
	});
}

// Set icon for cons type
const getIcon = (type:any) => {
	if(type || type !== null){
		switch (type) {
			case 'thuydien' :
				return createIcon('/images/icon/thuydien.png');
				break;
			case 'hochua' :
				return createIcon('/images/icon/hochua.png');
				break;
			case 'trambom' :
				return createIcon('/images/icon/trambom.png');
				break;
			case 'tramcapnuoc' :
				return createIcon('/images/icon/tramcapnuoc.png');
				break;
			case 'cong' :
				return createIcon('/images/icon/cong.png');
				break;
			case 'nhamaynuoc' :
				return createIcon('/images/icon/nhamaynuoc.png');
				break;
			case 'khaithac':
				return createIcon('/images/icon/khaithac.png');
				break;
			case 'thamdo':
				return createIcon('/images/icon/thamdo.png');
				break;
			case 'congtrinh_nuocduoidatkhac':
				return createIcon('/images/icon/congtrinh_nuocduoidatkhac.png');
				break;
			case 'khu_cumcn_taptrung':
				return createIcon('/images/icon/khu_cumcn_taptrung.png');
				break;
			case 'sx_tieuthu_cn':
				return createIcon('/images/icon/sx_tieuthu_cn.png');
				break;
			case 'congtrinh_xathaikhac':
				return createIcon('/images/icon/congtrinh_xathaikhac.png');
				break;
		}
	}
}

export default function Map({ center, zoom, mapLineData, mapMarkerData }: any) {
	const bing_key = "AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L"
	const [kml, setKml] = useState<any>(null);

	useEffect(() => {
        fetch(
          "/kml/tinh-quangngai.kml"
        )
          .then((res) => res.text())
          .then((kmlText) => {
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmlText, "text/xml");
            setKml(kml);
          });
    }, []);

	return (
		<>
			<MapContainer attributionControl={false} center={center} zoom={zoom} style={{ height: '100%' }}>
				<LayersControl position='bottomright'>
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
				<GeoJSON data={mapLineData} style={lineStyle} onEachFeature={(feature, layer) => {
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
				{mapMarkerData && mapMarkerData.map((data:any) => {
					if(data.lat !== null || data.lng !== null){
						return (
							<Marker icon={getIcon(data.constructionTypeSlug)} key={data.id} position={[data.lat, data.lng]}>
								<Popup >
									<Typography sx={{color: '#035291', textAlign: 'center', fontWeight: 'bold', margin: '10px 0 !important'}}>{data.constructionName}</Typography>
									<MapPopup popupData={data} />
								</Popup>
							</Marker>
							)
					} else return null;
				})}
				<SetViewOnClick coords={center} zoom={zoom} />
				{kml && <ReactLeafletKml kml={kml} />}
			</MapContainer>
		</>
	);
}