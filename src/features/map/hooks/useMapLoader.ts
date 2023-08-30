import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
  version: "weekly",
});

export default function useMapLoader(config: google.maps.MapOptions) {
  useEffect(() => {
    let map;
    async function initMap(): Promise<void> {
      const { Map } = (await google.maps.importLibrary(
        "maps",
      )) as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker",
      )) as google.maps.MarkerLibrary;

      map = new Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 34.052, lng: -118.243 },
        zoom: 10,
        mapId: process.env.NEXT_PROCESS_MAP_ID,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });
    }

    initMap();
  }, []);
}
