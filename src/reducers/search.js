export default function (state = {}, action = {}) {
  switch (action.type) {
    case "GET_DEPARTURE": {
      return action.payload;
    }
    default:
      return state;
  }
}
