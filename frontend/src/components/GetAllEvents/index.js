import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getEvents} from '../../store/events'
import EventDetails from './EventDetails';

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
    <span>Events</span>
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
