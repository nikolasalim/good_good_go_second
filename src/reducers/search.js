export default function (state = {}, action = {}) {
  switch (action.type) {
    case "GET_DEPARTURE": {
      console.log("action.payload is", action.payload);
      return action.payload;
    }
    default:
      return state;
  }
}
