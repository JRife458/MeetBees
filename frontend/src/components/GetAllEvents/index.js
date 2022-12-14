import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getEvents} from '../../store/events'
import EventDetails from './EventDetails';
import { NavLink } from 'react-router-dom';

function GetAllEvents() {
  const dispatch = useDispatch()
  const events = useSelector(state => {
    if (state.events.allEvents) {
      return Object.values(state.events.allEvents)
    }
  })



  useEffect(()=> {
    dispatch(getEvents())
  }, [dispatch])



  return (
    <>
    <div className='events-top'>
      <div className='links'>
      <NavLink className='link active' to='/events'>
        <h3>Events</h3>
      </NavLink>
      <NavLink className='link' to='/groups'>
        <h3>Groups</h3>
      </NavLink>
      </div>
    </div>
    {!events && <span>No Events Found.</span>}
    {events && <ul className='events-list'>
      {events?.map((event) => (
        <EventDetails key={event.id} event={event} />
      ))}
    </ul>}
    </>
  )
}

export default GetAllEvents;
