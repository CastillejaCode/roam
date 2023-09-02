export async function findPlaceDetails(placeId: string) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json
    ?fields=name%2Cformatted_address%2Ctype
    &place_id=${placeId}
    &key=${process.env.GOOGLE_MAPS_API_KEY}`,
  );

  return res.json();
}
