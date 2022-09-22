import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getGroupById, getGroups, groupDelete} from '../../store/groups'
import { useEffect } from 'react';
import {NavLink, useParams, useHistory} from 'react-router-dom'
import './SingleGroup.css'

import AddGroupImage from '../AddGroupImage';
import CreateEventFormModal from '../CreateEventModal';


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
    <div>Group</div>
    {!group && <span>Group not found</span>}
     {group &&
      <div className='groupInfo'>
        <NavLink to={`/groups/${groupId}/update`}>Update</NavLink>
        <button onClick={deleteGroup}>Delete Group</button>
        <AddGroupImage />
        <CreateEventFormModal />
        <span>{group?.name}</span>
        <span>Organizer: {group?.Organizer?.firstName}</span>
        <span>What we're about: {group?.about}</span>
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
