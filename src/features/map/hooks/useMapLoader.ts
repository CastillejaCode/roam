import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";

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
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    loader
      .load()
      .then(async () => {
        const { Map } = (await google.maps.importLibrary(
          "maps",
        )) as google.maps.MapsLibrary;

        if (!ref.current) return;
        let map = new Map(ref.current, mapOptions);
      })
      .then(() => setLoading(false));
  }, []);

  return ref;
}
