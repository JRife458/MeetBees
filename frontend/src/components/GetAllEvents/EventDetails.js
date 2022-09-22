import { NavLink } from "react-router-dom";
import beeLogo from '../../assets/meetbees.png'
import './GetAllEvents.css'

function EventDetails({event}) {
  if (!event.previewImage) event.previewImage = beeLogo

  return(
    <div className="event-details">
        <div className="image-container">
        <NavLink to={`/events/${event.id}`}>
          <img className="preview-image" src={event.previewImage}></img>
        </NavLink>
      </div>
      <div>
          <h3 className="event-name">{event.name}</h3>
          <h4>{event.startDate}</h4>
      </div>
    </div>
  )
}

export default EventDetails;
