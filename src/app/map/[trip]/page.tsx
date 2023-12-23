import Map from "@/features/map/components";
import Planner from "@/features/planner/components";
import { createSupabaseServerClient } from "@/utils/supabaseServerClient";
import { cookies } from "next/headers";

export default async function MapPage() {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const { data: places, error } = await supabase.from("places").select();
  if (error) throw new Error(`Supabase error: ${error.message}`);

  return (
    <main className="relative h-20 flex-grow">
      <Map places={places} />
      <Planner places={places} />
    </main>
  );
}