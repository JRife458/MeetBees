import { useDispatch, useSelector } from 'react-redux';
import { approveAttendance } from '../../store/events';

function ApproveAttendanceButton({updateSwitch, userId}) {
  const dispatch = useDispatch()
  const event = useSelector(state => state.events.singleEvent)

  const onClick = async (e) => {
    e.preventDefault()
    await dispatch(approveAttendance(event.id, userId))
    updateSwitch()
  }

  return <button onClick={onClick}>Approve</button>
}

export default ApproveAttendanceButton;
