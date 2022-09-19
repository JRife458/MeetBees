import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getGroups} from '../../store/groups'
import { useEffect } from 'react';

import GroupDetails from './GroupDetails';


function GetAllGroups() {
  const dispatch = useDispatch()
  const groups = useSelector(state => Object.values(state.groups))


  useEffect(()=> {
    dispatch(getGroups())
  }, [dispatch])

  return (
    <>
    <div>Groups</div>
    {!groups && <span>No groups found.</span> }
    {groups && <ul className='groups-list'>
      {groups?.map((group) => (
        <GroupDetails key={group.id} group={group} />
      ))}
    </ul>}
    </>
  )
}

export default GetAllGroups;
