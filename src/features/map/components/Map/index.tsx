"use client";

import { Loader2 } from "lucide-react";
import useMapLoader from "../../hooks/useMapLoader";

export default function Map() {
  // Returns a ref where the loaded map will be displayed
  const ref = useMapLoader();

  return (
    <section ref={ref} className="grid h-full place-content-center">
      {ref && <Loader2 className="h-16 w-16 animate-spin" />}
    </section>
  );
}
