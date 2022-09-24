import { useEffect, useState, } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { eventCreator, getEvents} from '../../store/events'
import { useDispatch, useSelector } from 'react-redux';

function CreateEvent({venues}) {
  const dispatch = useDispatch()
  const history = useHistory();
  const [venueId, setVenueId] = useState('')
  const [name, setName] = useState('');
  const [type, setType] = useState('In person');
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(1.00)
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [validationErrors, setValidationErrors] = useState([]);
  const events = useSelector(state => {
    if (state.events.allEvents) {
      return Object.values(state.events.allEvents)
    }
  })
  const {groupId} = useParams()


  useEffect(()=> {
    dispatch(getEvents())
  }, [dispatch])

  useEffect(() => {
    const errors = [];

    if (events.find((event) => event.name === name)) {
      errors.push('Name already exists.')
    } else if (!name.length) {
      errors.push('Name Required')
    }
    if (description.length < 50) errors.push('About must be 50 characters or more')
    if (!startDate.length) errors.push('Start Date required')
    if (!endDate.length) errors.push('End Date required')
    setValidationErrors(errors)
    }, [name, description, startDate, endDate]);

    const submitHandler = async (e) => {
      e.preventDefault();
      const body = {
        venueId: venueId,
        name: name,
        type: type,
        capacity: capacity,
        description: description,
        startDate: startDate,
        endDate: endDate,
        price: price }
        const newEvent = await dispatch(eventCreator(body, groupId))
        history.push(`/events/${newEvent.id}`)
    };

  return (
    <form
      className="create-event-form"
      onSubmit={submitHandler}
    >
      <h2>Create an Event</h2>
      <ul className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Venue:
        <select
        name='venueId'
        onChange={(e) => setVenueId(e.target.value)}
        >
        {venues && venues.map((venue) => (
          <option value={venue.id}>{venue.address}</option>
        ))}
        </select>
      </label>
      <label>
        Name:
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </label>
        <label>Type: </label>
      <label>
        <input
          checked={type === 'Online'}
          type="radio"
          value="Online"
          name="type"
          onChange={(e) => setType(e.target.value)}
        />
        Online
      </label>
      <label>
        <input
          checked={type === 'In person'}
          type="radio"
          value="In person"
          name="type"
          onChange={(e) => setType(e.target.value)}
        />
        In Person
      </label>
      <label>
        Start:
        <input
          type="datetime-local"
          name="startDate"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
        />
      </label>
      <label>
        End:
        <input
          type="datetime-local"
          name="endDate"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
        />
      </label>
      <label>
        Capacity :
        <input
          type="number"
          name="capacity"
          min='1'
          onChange={(e) => setCapacity(e.target.value)}
          value={capacity}
        />
      </label>
      <label>
        Price :
        <input
          type="number"
          name="price"
          min='1'
          step='0.01'
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </label>
      <button
        type="submit"
        disabled={!!validationErrors.length}
      >
        Create Event
      </button>
    </form>
  )
};

export default CreateEvent;
