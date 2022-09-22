import { useEffect, useState, } from 'react';
import { useHistory } from 'react-router-dom';
import {groupCreator, getGroups} from '../../store/groups'
import { useDispatch, useSelector } from 'react-redux';

function CreateGroup() {
  const dispatch = useDispatch()
  const history = useHistory();
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [type, setType] = useState('In person');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [privateBoolean, setPrivate] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const groups = useSelector(state => Object.values(state.groups.allGroups))
  const userId = useSelector(state => state.session.user.id)

  useEffect(()=> {
    dispatch(getGroups())
  }, [dispatch])

  useEffect(() => {
    const errors = [];

    if (groups.find((group) => group.name === name)) {
      errors.push('Name already exists.')
    } else if (!name.length) {
      errors.push('Name Required')
    }
    if (about.length < 50) errors.push('About must be 50 characters or more')
    if (!city.length) errors.push('City required')
    if (!state.length) errors.push('State required')
    setValidationErrors(errors)
    }, [name, about, city, state]);

    const submitHandler = async (e) => {
      e.preventDefault();
      const body = {
        name: name,
        about: about,
        city: city,
        state: state,
        type: type,
        privateBoolean: privateBoolean }
        const newGroup = await dispatch(groupCreator(body, userId))
        history.push(`/groups/${newGroup.id}`)
    };

  return (
    <form
      className="create-group-form"
      onSubmit={submitHandler}
    >
      <h2>Create a Group</h2>
      <ul className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) => <li key={error}>{error}</li>)}
      </ul>
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
        About:
        <input
          type="text"
          name="about"
          onChange={(e) => setAbout(e.target.value)}
          value={about}
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
        City:
        <input
          type="text"
          name="city"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
      </label>
      <label>
        State:
        <input
          type="text"
          name="state"
          onChange={(e) => setState(e.target.value)}
          value={state}
        />
      </label>
      <label>
        Private :
        <input
          type="checkbox"
          name="privateBoolean"
          checked={privateBoolean === true}
          onChange={(e) => setPrivate(!privateBoolean)}
          value={privateBoolean}
        />
      </label>
      <button
        type="submit"
        disabled={!!validationErrors.length}
      >
        Create Group
      </button>
    </form>
  )
};

export default CreateGroup;
