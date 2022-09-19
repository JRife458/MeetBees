import { NavLink } from "react-router-dom";

function GroupDetails({group}) {

  return (
    <div className="group-details">
      <NavLink to={`/groups/${group.id}`}>
      <span>{group.name}</span>
      </NavLink>
      <p>{group.about}</p>
    </div>
  )
}

export default GroupDetails;
