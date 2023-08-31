import Itinerary from "./Itinerary";

export default function Planner() {
  return (
    <section className="absolute left-8 top-1/2 flex h-[95%]  w-2/6 -translate-y-1/2 flex-col rounded-xl border-4 border-emerald-600 bg-gray-100 shadow-lg">
      <div className="h-32 bg-red-200 ">stuff</div>
      <Itinerary />
    </section>
  );
}
