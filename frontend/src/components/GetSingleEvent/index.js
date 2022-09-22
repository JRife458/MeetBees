import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getEventById } from "../../store/events";

function GetSingleEvent() {
  const {eventId} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const event = useSelector(state => state.events.singleEvent)

  useEffect(() => {
    dispatch(getEventById(eventId))
  }, [dispatch])

  return (
    <div>
      <div>Event</div>
    {!event && <span>Event not found</span>}
     {event &&
      <div className='eventInfo'>
        <h3>{event?.name}</h3>
        <h4>Start Date: {event.startDate}</h4>
        <h4>End Date: {event.endDate}</h4>
    </div>}
    </div>
  )
}

export default GetSingleEvent;
