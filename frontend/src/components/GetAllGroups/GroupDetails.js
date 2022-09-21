import { NavLink } from "react-router-dom";

function GroupDetails({group}) {
  if (!group.previewImage) group.previewImage = 'no preview Image'

  return (
    <div className="group-details">
      <NavLink to={`/groups/${group.id}`}>
      <span>{group.name}</span>
      </NavLink>
      <img src={group.previewImage}></img>
      <p>{group.about}</p>
    </div>
  )
}

export default GroupDetails;
