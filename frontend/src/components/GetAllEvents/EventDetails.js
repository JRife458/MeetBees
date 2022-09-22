import { NavLink } from "react-router-dom";
import beeLogo from '../../assets/meetbees.png'

function EventDetails({event}) {

  return(
    <div>{event.name}</div>
  )
}

export default EventDetails;
