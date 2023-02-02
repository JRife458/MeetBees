import { csrfFetch } from "./csrf";

const GET_EVENTS = 'events/getAllEvents'
const GET_SINGLE_EVENT = 'events/getEventById'
const CREATE_EVENT = 'events/createEvent'
const DELETE_EVENT = 'events/deleteEvent'
const REQUEST_ATTENDANCE = 'events/requestAttendance'
const APPROVE_ATTENDANCE = 'group/approveAttendance'
const DENY_ATTENDANCE = 'group/denyAttendance'

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

const requestAttendanceAction = (attendance) => {
  return {
    type: REQUEST_ATTENDANCE,
    attendance
  }
}

const approveAttendanceAction = (attendance) => {
  return {
    type: APPROVE_ATTENDANCE,
    attendance
  }
}

const denyAttendanceAction = (userId) => {
  return {
    type: DENY_ATTENDANCE,
    userId
  }
}

export const normalizeDate = (date) => {
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

export const requestAttendance = (eventId) => async (dispatch) => {
  const attendanceResponse = await csrfFetch(`/api/events/${eventId}/attendance`, {method: 'POST'})
  if (attendanceResponse.ok) {
    const data = await attendanceResponse.json();
    dispatch(requestAttendanceAction(data));
    return data
  }
}

export const approveAttendance = (eventId, userId) => async (dispatch) => {
  const attendanceResponse = await csrfFetch(`/api/events/${eventId}/attendance`, {
    method: 'PUT',
    body: JSON.stringify({
      userId,
      status: "member"
    })
  })
  if (attendanceResponse.ok) {
    const data = await attendanceResponse.json();
    dispatch(approveAttendanceAction(data));
    return data
  }
}

export const denyAttendance = (eventId, userId) => async (dispatch) => {
  const attendanceResponse = await csrfFetch(`/api/events/${eventId}/attendance`, {
    method: 'DELETE',
    body: JSON.stringify({userId})
  })
  if (attendanceResponse.ok) {
    const data = await attendanceResponse.json();
    dispatch(denyAttendanceAction(userId));
    return data
  }
}

const initialState = {};

const eventsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_EVENTS:
      newState = Object.assign({}, state);
      const events = {}
      action.events.Events.forEach(event => {
        events[event.id] = Object.assign({}, event);
        events[event.id].startDate = normalizeDate(event.startDate)
        events[event.id].endDate = normalizeDate(event.endDate)
      });
      newState.allEvents = events
      return newState;
    case GET_SINGLE_EVENT:
      newState = Object.assign({}, state);
      const newEvent = action.event
      newEvent.startDate = normalizeDate(newEvent.startDate)
      newEvent.endDate = normalizeDate(newEvent.endDate)
      let attendeesNormalized = {}
      let pendingNormalized = {}
      newEvent.Attendees.forEach(user => {
        const data = {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id,
          status: user.Attendees[0].status
        }
        data.status === "pending" ? pendingNormalized[data.id] = data : attendeesNormalized[data.id] = data
      })
      newEvent.Attendees = attendeesNormalized
      newEvent.Requests = pendingNormalized
      newState.singleEvent = newEvent
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
      return newState
    case REQUEST_ATTENDANCE:
      newState = Object.assign({}, state);
      newState.singleEvent.Requests[action.attendance.userId] = {
        id: action.attendance.userId,
        status: action.attendance.status}
      return newState
    case APPROVE_ATTENDANCE:
      newState = Object.assign({}, state);
      newState.singleEvent.Attendees[action.attendance.userId] = action.attendance
      delete newState.singleEvent.Requests[action.attendance.userId]
      return newState
    case DENY_ATTENDANCE:
      newState = Object.assign({}, state);
      delete newState.singleEvent.Requests[action.userId]
      return newState
    default:
      return state;
  }
}

export default eventsReducer;
