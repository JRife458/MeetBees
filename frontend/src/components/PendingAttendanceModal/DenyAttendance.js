import { useDispatch, useSelector } from 'react-redux';
import { denyAttendance } from '../../store/events';

function DenyAttendanceButton({updateSwitch, userId}) {
  const dispatch = useDispatch()
  const event = useSelector(state => state.events.singleEvent)

  const onClick = async (e) => {
    e.preventDefault()
    await dispatch(denyAttendance(event.id, userId))
    updateSwitch()
  }

  return <button onClick={onClick}>Deny</button>
}

export default DenyAttendanceButton;
