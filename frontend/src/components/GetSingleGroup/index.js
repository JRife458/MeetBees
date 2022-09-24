import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getGroupById, getGroups, groupDelete} from '../../store/groups'
import { useEffect } from 'react';
import {NavLink, useParams, useHistory} from 'react-router-dom'
import './SingleGroup.css'

import CreateEventFormModal from '../CreateEventModal';
import AddGroupImageFormModal from '../AddGroupImageModal'


function GetSingleGroup() {
  const {groupId} = useParams()
  const dispatch = useDispatch()
  const history = useHistory();
  const group = useSelector(state => {
    return state.groups.singleGroup})

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
    <h2>{group?.name}</h2>
    {!group && <span>Group not found</span>}
     {group &&
      <div className='groupInfo'>
        <div>
        <NavLink to={`/groups/${groupId}/update`}>
          <button>Update Group</button>
        </NavLink>
        <button onClick={deleteGroup}>Delete Group</button>
        <AddGroupImageFormModal groupId={groupId}/>
        <CreateEventFormModal venues={group.Venues}/>
        </div>
        <h3>Organizer: {group?.Organizer?.firstName}</h3>
        <h4>What we're about:</h4>
        <p>{group?.about}</p>
        <div>
        {group.GroupImages.map(image => (
          <div className='image-container'>
        <img className='images' key={image.id} src={image.url}></img>
          </div>
      ))}
        </div>
    </div>}
    </>
  )
}

export default GetSingleGroup;
