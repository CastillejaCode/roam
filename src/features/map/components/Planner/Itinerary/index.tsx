export default function Itinerary() {
  const places = [];
  return (
    <div>
      <ol>
        {places.map((place) => {
          return <li></li>;
        })}
      </ol>
    </div>
  );
}
