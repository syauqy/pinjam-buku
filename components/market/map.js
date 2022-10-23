import Map, { Marker, FullscreenControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ShrimpMarker } from "../icons/shrimp-map-marker";

const MapTambak = ({ latitude, longitude }) => {
  //   console.log(latitude.toFixed(5), longitude.toFixed(5));
  return (
    <div className="py-2">
      <div className="h-48 w-full rounded-lg overflow-hidden">
        <Map
          initialViewState={{
            latitude: latitude,
            longitude: longitude,
            zoom: 7,
          }}
          scrollZoom={false}
          // style={{ width: "100vw", height: "100vh" }}
          mapStyle="mapbox://styles/syauqy/ckksamyxl05x018mh05chg8ph"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        >
          <FullscreenControl />
          <Marker latitude={latitude} longitude={longitude} anchor="bottom">
            <ShrimpMarker />
          </Marker>
        </Map>
      </div>
    </div>
  );
};

export default MapTambak;
