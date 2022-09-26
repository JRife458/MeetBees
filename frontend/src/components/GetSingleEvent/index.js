import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { eventDestroyer, getEventById } from "../../store/events";
import beeLogo from '../../assets/meetbees.png'
import './SingleEvent.css'


function GetSingleEvent() {
  const {eventId} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const event = useSelector(state => state.events.singleEvent)
  const user = useSelector(state => state.session.user)
  let previewImage = event?.EventImages.filter(e => e.preview = true)[0]?.url
  if (!previewImage) previewImage = beeLogo

  useEffect(() => {
    dispatch(getEventById(eventId))
  }, [dispatch])

  const deleteEvent = (e) => {
    e.preventDefault()
    dispatch(eventDestroyer(eventId))
    history.push('/events');
  }

  return (
    <div>
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
              <img className="event-preview-image" src={previewImage}></img>
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
          <div className="single-event-details">
            {user && <button className="delete-event-button" onClick={deleteEvent}>Delete Event</button>}
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
