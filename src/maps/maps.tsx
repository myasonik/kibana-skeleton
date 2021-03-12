import { EuiPageHeader } from "@elastic/eui";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { MapsTimeslider } from "./maps_timeslider";
import { MapsTopNavbar } from "./maps_top_navbar";

const username = "miukimiu";
const style_id = "ckm4ugehhdgzf17l9r58xfm45";
const tile_size = "256";
const url = `https://api.mapbox.com/styles/v1/${username}/${style_id}/tiles/${tile_size}/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

export default function Maps() {
  const [isTimeSliderActive, setIsTimeSliderActive] = useState(true);

  const onToggleTimeslider = () => {
    console.log("clicked", isTimeSliderActive);

    setIsTimeSliderActive(!isTimeSliderActive);
  };

  return (
    <div className="kbnMaps">
      <EuiPageHeader style={{ padding: 16 }}>
        <MapsTopNavbar onToggleTimeslider={onToggleTimeslider} />
      </EuiPageHeader>
      {isTimeSliderActive && <MapsTimeslider onClose={onToggleTimeslider} />}

      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={url}
        />
      </MapContainer>
    </div>
  );
}
