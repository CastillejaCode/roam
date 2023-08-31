"use client";

import useMapLoader from "../../hooks/useMapLoader";

export default function Map() {
  // Returns a ref where the loaded map will be displayed
  const ref = useMapLoader();

  return <section ref={ref} className="h-full" />;
}
