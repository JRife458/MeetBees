import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getGroupById, getGroupEventsById, getGroups, groupDelete, requestMembership} from '../../store/groups'
import { denyMembership } from '../../store/groups';
import { useEffect, useState } from 'react';
import {NavLink, useParams, useHistory} from 'react-router-dom'
import beeLogo from '../../assets/meetbees.png'
import './SingleGroup.css'

import CreateEventFormModal from '../CreateEventModal';
import AddGroupImageFormModal from '../AddGroupImageModal'
import EventDetails from '../GetAllEvents/EventDetails';
import PendingMembershipsModal from '../PendingMembershipsModal';


function GetSingleGroup() {
  const {groupId} = useParams()
  const dispatch = useDispatch()
  const history = useHistory();
  const group = useSelector(state => state.groups.singleGroup)
  const user = useSelector(state => state.session.user)
  const events = useSelector(state => {
     if (state.groups.singleGroupEvents) {
      return Object.values(state.groups.singleGroupEvents)
      }
  })
  const [requestButtonText, setRequestButtonText] = useState('Request Pending')
  let previewImage = group?.GroupImages.filter(e => e.preview = true)[0]?.url
  if (!previewImage) previewImage = beeLogo

  const privateString = group?.private === true ? 'Private' : 'Public'

  const userMember = group?.Members[user?.id] ? group.Members[user?.id] : false
  const pendingMember = group?.PendingMembers[user?.id] ? true : false

  const numMembers = group?.Members ? Object.keys(group.Members).length : 'loading'
  const memberString = numMembers === 1 ? 'member' : 'members'


  useEffect(()=> {
    dispatch(getGroupById(groupId))
    dispatch(getGroupEventsById(groupId))
    dispatch(getGroups())
  }, [dispatch, groupId])

  const deleteGroup = async (e) => {
    e.preventDefault()
    await dispatch(groupDelete(groupId))
    history.push('/groups');
  }

  const requestMembershipButton = async (e) => {
    e.preventDefault()
    await dispatch(requestMembership(groupId))
  }

  const deleteRequestButton = async (e) => {
    e.preventDefault()
    await dispatch(denyMembership(groupId, user.id))
    setRequestButtonText('Request Pending')
  }

  return (
    <div>
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
            <img className='group-preview-image' alt='group-preview' src={previewImage}></img>
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
              <p>{`${numMembers} ${memberString}`} · {privateString} group</p>
            </div>
            <div className='specifics-lines'>
              <i className="fa-solid fa-user-large"></i>
              <p>Organizer: {group?.Organizer?.firstName}</p>
            </div>
          </div>
        </div>

        {group?.Members[user?.id] &&
        <div className='group-edit-buttons'>
          {group?.organizerId === user?.id &&
          <NavLink to={`/groups/${groupId}/update`}>
            <button>Update Group</button>
          </NavLink>}
          {group?.organizerId === user?.id && <button onClick={deleteGroup}>Delete Group</button>}
          <AddGroupImageFormModal groupId={groupId}/>
          <CreateEventFormModal venues={group.Venues}/>
          {userMember?.status === "cohost" && <PendingMembershipsModal pending={group?.PendingMembers} />}
        </div>}
        <div className='group-edit-buttons'>
        {!userMember && !pendingMember && user && <button onClick={requestMembershipButton}>Request Membership</button>}
        {pendingMember && <button
            onClick={deleteRequestButton}
            className="pending-request-button"
            onMouseEnter={() => setRequestButtonText('Delete Request?')}
            onMouseLeave={() => setRequestButtonText("Request Pending")}
            >{requestButtonText}</button>}
        </div>

        <div className='single-group-details'>
          <div className='group-about'>
            <h4>What we're about:</h4>
            <p>{group?.about}</p>
          </div>
          <div className='group-images-container'>
            <h3>Group Images</h3>
            <div className='group-images'>
              {group?.GroupImages.map(image => (
                <div className='group-image-container' key={image.id}>
                  <img className='group-image' alt='group' src={image.url}></img>
                </div>
              ))}
              </div>
          </div>
        </div>
        <div className='group-events'>
          <h2>Group Events</h2>
        {events && <ul className='events-list'>
      {events?.map((event) => (
        <EventDetails key={event.id} event={event} />
      ))}
    </ul>}
        </div>
      </div>
    }
    </div>
  )
}

export default GetSingleGroup;
