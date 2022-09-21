import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getGroupById, getGroups, groupDelete} from '../../store/groups'
import { useEffect } from 'react';
import {NavLink, useParams, useHistory} from 'react-router-dom'


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
      <div>
        <NavLink to={`/groups/${groupId}/update`}>Update</NavLink>
        <button onClick={deleteGroup}>Delete Group</button>
        <br></br>
        <span>{group?.name}</span>
        <br></br>
        <span>Organizer: {group?.Organizer?.firstName}</span>
        <br></br>
        <span>What we're about: {group?.about}</span>
    </div>}
    </>
  )
}

export default GetSingleGroup;
