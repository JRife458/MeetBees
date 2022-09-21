import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getGroups} from '../../store/groups'
import { useEffect } from 'react';

import GroupDetails from './GroupDetails';
import { NavLink } from 'react-router-dom';
import CreateGroupFormModal from '../CreateGroupModal';


function GetAllGroups() {
  const dispatch = useDispatch()
  const groups = useSelector(state => {
    if (state.groups.allGroups) {
      return Object.values(state.groups.allGroups)
    }
  })

  useEffect(()=> {
    dispatch(getGroups())
  }, [dispatch])

  return (
    <>
    <div>Groups</div>
    <CreateGroupFormModal/>
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
