import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getGroupById} from '../../store/groups'
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'


function GetSingleGroup() {
  const {groupId} = useParams()
  const dispatch = useDispatch()
  const group = useSelector(state => {
    return state.groups[groupId]})


  useEffect(()=> {
    dispatch(getGroupById(groupId))
  }, [dispatch])

  return (
    <>
    <div>Group</div>
    {!group && <span>Group not found</span>}
     {group && <div>
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
