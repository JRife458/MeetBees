import React from "react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { eventDestroyer, getEventById, requestAttendance } from "../../store/events";
import { denyAttendance } from "../../store/events";
import PendingAttendanceModal from "../PendingAttendanceModal";
import beeLogo from '../../assets/meetbees.png'
import './SingleEvent.css'


function GetSingleEvent() {
  const {eventId} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const event = useSelector(state => state.events.singleEvent)
  const user = useSelector(state => state.session.user)
  const [requestButtonText, setRequestButtonText] = useState('Request Pending')
  const [updated, setUpdated] = useState(false)
  const updateSwitch = () => updated === true ? setUpdated(false) : setUpdated(true)


  let previewImage = event?.EventImages.filter(e => e.preview = true)[0]?.url
  if (!previewImage) previewImage = beeLogo

  const userAttendance = event?.Attendees[user?.id] ? event.Attendees[user?.id] : false
  let pendingRequest = event?.Requests[user?.id] ? true : false

  useEffect(() => {
    dispatch(getEventById(eventId))
  }, [dispatch, eventId, updated])

  const deleteEvent = async (e) => {
    e.preventDefault()
    await dispatch(eventDestroyer(eventId))
    history.push('/events');
  }

  const requestAttendanceButton = async (e) => {
    e.preventDefault()
    await dispatch(requestAttendance(eventId))
    updateSwitch()
  }

  const deleteRequestButton = async (e) => {
    e.preventDefault()
    await dispatch(denyAttendance(eventId, user.id))
    updateSwitch()
    setRequestButtonText('Request Pending')
  }

  return (
    <div>
      <div className='links'>
        <NavLink className='link active' to='/events'>
          <h3>Events</h3>
        </NavLink>
        <NavLink className='link' to='/groups'>
          <h3>Groups</h3>
        </NavLink>
      </div>
      {!event && <span>Event not found</span>}
      {event &&
      <div className="single-event">
        <div className='single-event-info'>
          <time>{event?.startDate}</time>
          <h1>{event?.name}</h1>
        </div>
        <div className="event-container">
          <div className="event-image-info">
            <div className="event-preview-image-container">
              <img className="event-preview-image" alt="event" src={previewImage}></img>
            </div>

          <div className="other-event-info">
            <div className="event-group">
              <NavLink to={`/groups/${event?.Group?.id}`}>
                <i className="fa-solid fa-users-rectangle fa-3x"></i>
              </NavLink>
              <div className="event-group-info">
                <p>{event?.Group?.name}</p>
                <p>{event?.Group?.private === true ? 'Private Group' : 'Public Group'}</p>
              </div>
            </div>
            <div className="event-time-location">
              <div className="time">
                <i className="fa-regular fa-clock"></i>
                <time>{event.startDate} to {event.endDate}</time>
              </div>
                {event?.type === 'Online' ?
                  <div className="location">
                    <i className="fa-solid fa-video"></i>
                    <p>Online Event</p>
                  </div>
                  :
                  <div className="location">
                    <i className="fa-solid fa-location-dot"></i>
                    <div className="event-address">
                      <p>{event?.Venue?.address}</p>
                      <p>{event?.Venue?.city} · {event?.Venue?.state}</p>
                    </div>
                  </div>
                }
            </div>
          </div>
          </div>
          <div className="single-event-buttons">
            {userAttendance.status === 'co-host' && <button className="delete-event-button" onClick={deleteEvent}>Delete Event</button>}
            {userAttendance.status === "co-host" && <PendingAttendanceModal updateSwitch={updateSwitch} pending={event.Requests} />}

            {!userAttendance && !pendingRequest && <button onClick={requestAttendanceButton}>Request to Attend Event</button>}
            {pendingRequest && <button
            onClick={deleteRequestButton}
            className="pending-request-button"
            onMouseEnter={() => setRequestButtonText('Delete Request?')}
            onMouseLeave={() => setRequestButtonText("Request Pending")}
            >{requestButtonText}</button>}

          </div>
          <div className="single-event-details">

            <h2>Details</h2>
            <p>{event?.description}</p>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default GetSingleEvent;
