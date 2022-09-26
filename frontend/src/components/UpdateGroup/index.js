import { useEffect, useState, } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {getGroups, getGroupById, groupUpdater} from '../../store/groups'
import { useDispatch, useSelector } from 'react-redux';
import './UpdateGroup.css'


function UpdateGroup() {
  const dispatch = useDispatch()
  const history = useHistory();
  const {groupId} = useParams()
  const group = useSelector(state => state.groups.allGroups[groupId] )
  const [name, setName] = useState(group?.name);
  const [about, setAbout] = useState(group?.about);
  const [type, setType] = useState(group?.type);
  const [city, setCity] = useState(group?.city);
  const [state, setState] = useState(group?.state);
  const [privateBoolean, setPrivate] = useState(group?.private);
  const [validationErrors, setValidationErrors] = useState([]);
  const groups = useSelector(state => Object.values(state.groups))

  useEffect(()=> {
    dispatch(getGroups())
    dispatch(getGroupById(groupId))
  }, [dispatch])

  useEffect(() => {
    const errors = [];

    if (groups.find((group) => group.name === name)
        && name !== group?.name) {
      errors.push('Name already exists.')
    } else if (!name?.length) {
      errors.push('Name Required')
    }
    if (about?.length < 50) errors.push('About must be 50 characters or more')
    if (!city?.length) errors.push('City required')
    if (!state?.length) errors.push('State required')
    setValidationErrors(errors)
    }, [name, about, city, state]);

    const submitHandler = (e) => {
      e.preventDefault();
      const body = {
        name: name,
        about: about,
        city: city,
        state: state,
        type: type,
        privateBoolean: privateBoolean }
      dispatch(groupUpdater(body, group.id))

      history.push(`/groups/${group.id}`);
    };

  return (
      <form
        className="edit-group-form"
        onSubmit={submitHandler}
      >
        <h2>Update {group?.name}</h2>
        <ul className="errors">
          {validationErrors.length > 0 &&
            validationErrors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <label className='edit-group-element'>
          Name:
          <input
          className='edit-group-input'
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label className='edit-group-element'>
          About:
          <textarea
          className='edit-group-input'
            type="text"
            name="about"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
          ></textarea>
        </label>
          <label className='edit-group-checkbox-element'>Type:
        <label className='edit-group-checkbox'>
          <input
            checked={type === 'Online'}
            type="radio"
            value="Online"
            name="type"
            onChange={(e) => setType(e.target.value)}
          />
          Online
        </label>
        <label className='edit-group-checkbox'>
          <input
            checked={type === 'In person'}
            type="radio"
            value="In person"
            name="type"
            onChange={(e) => setType(e.target.value)}
          />
          In Person
        </label>
        </label>
        <label className='edit-group-element'>
          City:
          <input
          className='edit-group-input'
            type="text"
            name="city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </label>
        <label className='edit-group-element'>
          State:
          <input
            className='edit-group-input'
            type="text"
            name="state"
            onChange={(e) => setState(e.target.value)}
            value={state}
          />
        </label>
        <label className='edit-group-checkbox'>
          Private:
          <input
            type="checkbox"
            name="privateBoolean"
            checked={privateBoolean === true}
            onChange={(e) => setPrivate(!privateBoolean)}
            value={privateBoolean}
          />
        </label>
        <button
          className='update-group-button'
          type="submit"
          disabled={!!validationErrors.length}
        >
          Update Group
        </button>
      </form>
  )
}

export default UpdateGroup;
