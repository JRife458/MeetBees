import { NavLink } from "react-router-dom";
import beeLogo from '../../assets/meetbees.png'

function GroupDetails({group}) {
  if (!group.previewImage) group.previewImage = beeLogo
  let privateString = group.private === true ? 'Private' : 'Public'
  let memberString = group.numMembers === 1 ? 'member' : 'members'
  let about = group.about.split(' ')
  if (about.length > 20) about = `${about.slice(0, 20).join(' ')}...`
  else about = group.about

  return (
    <div className="group-details">
      <div className="image-container">
        <NavLink to={`/groups/${group.id}`}>
          <img className="preview-image" src={group.previewImage}></img>
        </NavLink>
      </div>
      <div className="group-info">
          <h3 className="group-name">{group.name}</h3>
          <h4 className="group-location">{group.city}, {group.state}</h4>
      <p className="all-group-about">{about}</p>
      <p>{`${group.numMembers} ${memberString}`} · {privateString}</p>
      </div>
    </div>
  )
}
export default GroupDetails;
