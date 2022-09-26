import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getGroupById, getGroups, groupDelete} from '../../store/groups'
import { useEffect } from 'react';
import {NavLink, useParams, useHistory} from 'react-router-dom'
import beeLogo from '../../assets/meetbees.png'
import './SingleGroup.css'

import CreateEventFormModal from '../CreateEventModal';
import AddGroupImageFormModal from '../AddGroupImageModal'


function GetSingleGroup() {
  const {groupId} = useParams()
  const dispatch = useDispatch()
  const history = useHistory();
  const group = useSelector(state => {
    return state.groups.singleGroup})
  const user = useSelector(state => state.session.user)
  let previewImage = group?.GroupImages.filter(e => e.preview = true)[0]?.url
  if (!previewImage) previewImage = beeLogo
  let privateString = group?.private === true ? 'Private' : 'Public'
  let memberString = group?.numMembers === 1 ? 'member' : 'members'


  useEffect(()=> {
    dispatch(getGroupById(groupId))
    dispatch(getGroups())
  }, [dispatch])

  const deleteGroup = (e) => {
    e.preventDefault()
    dispatch(groupDelete(groupId))
    history.push('/groups');
  }

  return (
    <>
    <div className='links'>
    <NavLink className='link' to='/events'>
      <h3>Events</h3>
    </NavLink>
    <NavLink className='link active' to='/groups'>
      <h3>Groups</h3>
    </NavLink>
    </div>
    {!group && <span>Group not found</span>}
     {group &&
      <div className='groupInfo'>
        <div className='group-title-card'>
          <div className='group-preview-image-container'>
            <img className='group-preview-image' src={previewImage}></img>
          </div>
          <div className='group-specifics'>
            <div className='specifics-lines'>
              <h1>{group?.name}</h1>
            </div>
            <div className='specifics-lines'>
              <i className="fa-solid fa-location-dot"></i>
              <p>{`${group?.city}, ${group?.state}`}</p>
            </div>
            <div className='specifics-lines'>
              <i className="fa-solid fa-user-group"></i>
              <p>{`${group.numMembers} ${memberString}`} · {privateString} group</p>
            </div>
            <div className='specifics-lines'>
              <i className="fa-solid fa-user-large"></i>
              <p>Organizer: {group?.Organizer?.firstName}</p>
            </div>
          </div>
        </div>
        {group?.organizerId === user?.id && <div className='group-edit-buttons'>
          <NavLink to={`/groups/${groupId}/update`}>
            <button>Update Group</button>
          </NavLink>
          <button onClick={deleteGroup}>Delete Group</button>
          <AddGroupImageFormModal groupId={groupId}/>
          <CreateEventFormModal venues={group.Venues}/>
        </div>}
        <div className='single-group-details'>
          <div className='group-about'>
            <h4>What we're about:</h4>
            <p>{group?.about}</p>
          </div>
          <div className='group-images-container'>
            <h3>Group Images</h3>
            <div className='group-images'>
              {group?.GroupImages.map(image => (
                <div className='group-image-container'>
                  <img className='group-image' key={image.id} src={image.url}></img>
                </div>
              ))}
              </div>
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default GetSingleGroup;
