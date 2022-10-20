import { csrfFetch } from "./csrf";

const GET_EVENTS = 'events/getAllEvents'
const GET_SINGLE_EVENT = 'events/getEventById'
const CREATE_EVENT = 'events/createEvent'
const DELETE_EVENT = 'events/deleteEvent'

const populateEvents = (events) => {
  return {
    type: GET_EVENTS,
    events
  }
}

const populateSingleEvent = (event) => {
  return {
    type: GET_SINGLE_EVENT,
    event
  }
}

const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    event
  }
}

const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    eventId
  }
}

const normalizeDate = (date) => {
  const newDate = new Date(date)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const month = months[newDate.getMonth()]
  const weekDay = days[newDate.getDay()]
  const year = newDate.getFullYear()
  const dayOfMonth = newDate.getDate()
  const hours = newDate.getHours()
  let minutes = newDate.getMinutes()
  if (minutes < 10) minutes = `0${minutes}`
  let time
  if (hours === 0) time = `12:${minutes} AM`
  else if (hours > 13) time = `${hours - 12}:${minutes} PM`
  else if (hours === 12) time = `12:${minutes} PM`
  else time = `${hours}:${minutes} AM`
  return `${weekDay}, ${month} ${dayOfMonth}, ${year} at ${time}`
 }

export const getEvents = () => async (dispatch) => {
  const response = await csrfFetch('/api/events')
  if (response.ok){
    const data = await response.json();
  dispatch(populateEvents(data));
  return data
  };
};

export const getEventById = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${id}`)
  if (response.ok){
    const data = await response.json();
    dispatch(populateSingleEvent(data));
    return data
  }
};



export const eventCreator = (body, groupId) => async (dispatch) => {
  const {venueId, name, type, capacity, price, description, startDate, endDate} = body
  const response = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: 'POST',
    body: JSON.stringify({
      venueId: !venueId ? null : venueId,
      name,
      type,
      capacity,
      price,
      description,
      startDate,
      endDate
    })
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(createEvent(data));
    return data
  }
}

export const eventDestroyer = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(deleteEvent(eventId));
    return data
  }
}

const initialState = {};

const eventsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_EVENTS:
      newState = Object.assign({}, state);
      newState.allEvents = {}
      action.events.Events.forEach(event => {
        event.startDate = normalizeDate(event.startDate)
        event.endDate = normalizeDate(event.endDate)
        newState.allEvents[event.id] = event
      });
      return newState;
    case GET_SINGLE_EVENT:
      newState = Object.assign({}, state);
      action.event.startDate = normalizeDate(action.event.startDate)
      action.event.endDate = normalizeDate(action.event.endDate)
      newState.singleEvent = action.event
      return newState;
    case CREATE_EVENT:
      newState = Object.assign({}, state);
      action.event.startDate = normalizeDate(action.event.startDate)
      action.event.endDate = normalizeDate(action.event.endDate)
      newState.allEvents[action.event.id] = action.event
      return newState
    case DELETE_EVENT:
      newState = Object.assign({}, state);
      delete newState.allEvents[action.eventId]
      newState.allEvents = Object.values(newState.allEvents).filter(id => id !==action.eventId)
    default:
      return state;
  }
}

export default eventsReducer;
