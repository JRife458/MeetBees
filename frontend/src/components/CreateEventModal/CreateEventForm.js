import { useEffect, useState, } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { eventCreator, getEvents} from '../../store/events'
import { useDispatch, useSelector } from 'react-redux';

function CreateEvent({venues}) {
  const dispatch = useDispatch()
  const history = useHistory();

  const [venueId, setVenueId] = useState(venues[0]?.id)
  const [name, setName] = useState('');
  const [type, setType] = useState('Online');
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(1.00)
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [validationErrors, setValidationErrors] = useState([]);
  const {groupId} = useParams()

  const disabled = !venues ? true : false


  useEffect(()=> {
    dispatch(getEvents())
  }, [dispatch])

  useEffect(() => {
    const errors = [];

    if (!name.length) {
      errors.push('Name Required')
    }
    if (description.length < 50) errors.push('About must be 50 characters or more')
    if (!startDate.length) errors.push('Start Date required')
    if (!endDate.length) errors.push('End Date required')
    setValidationErrors(errors)
    }, [name, description, startDate, endDate]);

    const submitHandler = async (e) => {
      e.preventDefault();
      setValidationErrors([]);
      const body = {
        venueId: type === 'In person' ? venueId : null,
        name: name,
        type: type,
        capacity: capacity,
        description: description,
        startDate: startDate,
        endDate: endDate,
        price: price }
        const newEvent = await dispatch(eventCreator(body, groupId)).catch(
          async (data) => {
            if (data && data.errors) return setValidationErrors(data.errors);
            else return data
          }
        )
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
      <label className='create-event-element'>
        Name:
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label className='create-event-element'>
        Description:
        <textarea
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </label>
      <label className='create-event-element'>Type:
        {disabled && <h5>Must add Venues to Host events In Person</h5>}
        <label className='create-event-checkbox'>
          <input
            checked={type === 'Online'}
            type="radio"
            value="Online"
            name="type"
            onChange={(e) => setType(e.target.value)}
            />
          Online
        </label>
        <label className='create-event-checkbox'>
          <input
            checked={type === 'In person'}
            type="radio"
            value="In person"
            name="type"
            onChange={(e) => setType(e.target.value)}
            disabled={disabled}
            />
          In Person
        </label>
      </label>
      {venues && type === 'In person' && <label className='create-event-element'>
            Venue:
            <select
            name='venueId'
            onChange={(e) => setVenueId(e.target.value)}
            >
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>{venue.address}</option>
            ))}
            </select>
          </label>
        }
      <label className='create-event-element'>
        Start:
        <input
          type="datetime-local"
          name="startDate"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
        />
      </label>
      <label className='create-event-element'>
        End:
        <input
          type="datetime-local"
          name="endDate"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
        />
      </label>
      <label className='create-event-element'>
        Capacity :
        <input
          type="number"
          name="capacity"
          min='1'
          onChange={(e) => setCapacity(e.target.value)}
          value={capacity}
        />
      </label>
      <label className='create-event-element'>
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
