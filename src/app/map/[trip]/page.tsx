import Map from "@/features/map/components";
import Planner from "@/features/planner/components";
import { PlaceT, Trip } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

type Props = {
  params: { trip: number };
};

export default async function MapPage({ params }: Props) {
  const { trip: tripId } = params;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const dayInfo = await getDayInfo(supabase, tripId);
  const orderedPlaces = await getOrderedPlaces(supabase, dayInfo.currentDay);
  const trips = await getTrips(orderedPlaces);
  const places = combineTripInfo(orderedPlaces, trips);

  return (
    <main className="relative h-20 flex-grow">
      <Map places={places} dayInfo={dayInfo} />
      <Planner places={places} dayInfo={dayInfo} tripId={tripId} />
    </main>
  );
}

async function getOrderedPlaces(
  supabase: SupabaseClient,
  day: string,
): Promise<PlaceT[]> {
  const { data: places, error } = await supabase.rpc("get_places", { day });
  if (error) throw new Error(`Supabase error: ${error.message}`);
  return places;
}

async function getDayInfo(supabase: SupabaseClient, tripId: number) {
  const { data, error } = await supabase
    .from("trips")
    .select("order_days, current_day, days (start_time)")
    .eq("id", tripId)
    .limit(1)
    .single();
  if (error) throw new Error(`Supabase error: ${error.message}`);

  const { order_days: orderDays, current_day: currentDay, days } = data;
  const { start_time: startTime } = days[0];

  return {
    orderDays,
    currentDay,
    startTime,
  };
}

function combineTripInfo(places: PlaceT[], trips: Trip[] | null) {
  if (!trips) return places;
  return places.map((place, i) => {
    const tripInfo = trips[i];
    return { ...place, tripInfo };
  });
}

async function getTrips(places: PlaceT[]): Promise<Trip[] | null> {
  if (places.length < 2) return null;
  const coordinates = places
    .map((place) => `${place.lng},${place.lat}`)
    .join(";");

  const profile = "mapbox/driving";
  const res = await fetch(
    `https://api.mapbox.com/directions/v5/${profile}/${coordinates}?&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`,
  );
  const tripInformation = await res.json();

  const meterToMileFactor = 1 / (1000 * 1.609);
  const secondToMinuteFactor = 1 / 60;

  const trips = tripInformation.routes.at(0).legs.map((leg: Trip) => {
    const distance = Math.round(leg.distance * meterToMileFactor);
    const duration = Math.round(leg.duration * secondToMinuteFactor);
    return { distance, duration };
  });

  return trips;
}
