import { Loader } from "@googlemaps/js-api-loader";
import { useEffect } from "react";

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  version: "weekly",
});

const mapOptions = {
  center: { lat: 34.052, lng: -118.243 },
  zoom: 10,
  mapId: process.env.NEXT_PROCESS_MAP_ID,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};

export default function useMapLoader() {
  useEffect(() => {
    loader.load().then(async () => {
      const { Map } = (await google.maps.importLibrary(
        "maps",
      )) as google.maps.MapsLibrary;
      let map = new Map(
        document.getElementById("map") as HTMLElement,
        mapOptions,
      );
    });
  });
}
