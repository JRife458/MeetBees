import { NavLink } from "react-router-dom";
import beeLogo from '../../assets/meetbees.png'
import './GetAllEvents.css'

function EventDetails({event}) {
  if (!event.previewImage) event.previewImage = beeLogo

  return (
    <div className="event-details">
        <div className="image-container">
        <NavLink to={`/events/${event.id}`}>
          <img className="preview-image" src={event?.previewImage}></img>
        </NavLink>
      </div>
      <div className='event-info'>
          <h4 className="event-date">{event?.startDate}</h4>
          <div>
            <h3 className="event-name">{event?.name}</h3>
            <p>{event?.Group?.name} · {event?.Group?.city}, {event?.Group?.state}</p>
          </div>
          <p>{event.numAttending} {event.numAttending === 1 ? 'attendee' : 'attendees'}</p>
      </div>
    </div>
  )
}

export default EventDetails;
