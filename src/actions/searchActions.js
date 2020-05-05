export function gettingDeparture(departureCity) {
  console.log("departureCity is:", departureCity);
  return {
    type: "GET_DEPARTURE",
    payload: departureCity,
  };
}
