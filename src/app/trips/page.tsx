import { DatePickerWithRange } from "@/components/general/DatePickerWithRange";
import Trip from "@/features/trips/components/Trip";
import TripForm from "@/features/trips/components/TripForm";
import { createClient } from "@/utils/supabase/server";
import { parseISO } from "date-fns";
import { cookies } from "next/headers";
import { DateRange } from "react-day-picker";

type TripType = {
  id: number;
  name: string;
  currentDay: string | null;
  days: { date: string }[];
};

export default async function Trips() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("trips")
    .select("id, name, currentDay:current_day, days (date)");
  if (error) throw new Error(`${error.message}`);

  const trips = mapDateRange(data);

  return (
    <main className="flex flex-col items-center px-8 py-4">
      <h1 className="mb-2 text-4xl underline">Trips</h1>
      <TripForm />
      <section className="m-4 grid w-full max-w-xl grid-cols-magic place-content-center gap-4 rounded-sm bg-slate-400 p-4">
        {trips.map((trip) => {
          return <Trip key={trip.id} name={trip.name} id={trip.id} />;
        })}
      </section>
    </main>
  );
}

// Calculate the min and max days and replace days with new property
function mapDateRange(trips: TripType[]) {
  return trips.map((trip) => {
    const sortedDays = trip.days.map(({ date }) => date).sort();
    const { 0: start, length, [length - 1]: end } = sortedDays;

    const dateRange: DateRange = {
      from: parseISO(start),
    };
    if (start !== end) {
      dateRange.to = parseISO(end);
    }

    const { days, ...newTrip } = { ...trip, dateRange };

    return newTrip;
  });
}
