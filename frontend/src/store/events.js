import { csrfFetch } from "./csrf";

const GET_EVENTS = 'events/getAllEvents'

const populateEvents = (events) => {
  return {
    type: GET_EVENTS,
    events
  }
}

export const getEvents = () => async (dispatch) => {
  const response = await csrfFetch('/api/events')
  if (response.ok){
    const data = await response.json();
  dispatch(populateEvents(data));
  return data
  };
};

const initialState = {};

const eventsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_EVENTS:
      newState = Object.assign({}, state);
      newState.allEvents = {}
      action.events.Events.forEach(event => {
        newState.allEvents[event.id] = event
      });
      return newState;
    default:
      return state;
  }
}

export default eventsReducer;
