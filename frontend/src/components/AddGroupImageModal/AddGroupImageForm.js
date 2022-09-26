import { useEffect, useState, } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addGroupImage, getGroupById } from '../../store/groups';

function AddGroupImageForm({onClose, groupId}) {
  const dispatch = useDispatch()
  const history = useHistory();
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState(false)
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    const errors = [];

    if (!url.length) {
      errors.push('Url Required')
    }
    setValidationErrors(errors)
    }, [url]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const body = {
      url,
      preview
    }
      dispatch(addGroupImage(body, groupId))
      dispatch(getGroupById(groupId))
      onClose()
  };

  return (
    <form
      className="create-group-form"
      onSubmit={submitHandler}
    >
      <h2>Add a Group Image</h2>
      <ul className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) => <li key={error}>{error}</li>)}
      </ul>
      <label className='create-group-element'>
        Url:
        <input
          type="text"
          name="url"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
      </label>
      <label className='create-group-checkbox'>
        Preview:
        <input
          type="checkbox"
          name="preview"
          checked={preview === true}
          onChange={(e) => setPreview(!preview)}
          value={preview}
        />
      </label>
      <button
        type="submit"
        disabled={!!validationErrors.length}
      >
        Add Image
      </button>
    </form>
  )
}

export default AddGroupImageForm;
