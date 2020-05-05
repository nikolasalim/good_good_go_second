export function gettingDeparture(departureCity) {
  return {
    type: "GET_DEPARTURE",
    payload: departureCity,
  };
}
