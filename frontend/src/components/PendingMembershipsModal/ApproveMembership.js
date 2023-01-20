import { useDispatch, useSelector } from 'react-redux';
import { approveMembership } from '../../store/groups';

function ApproveMembershipButton({userId}) {
  const dispatch = useDispatch()
  const group = useSelector(state => state.groups.singleGroup)

  const onClick = async (e) => {
    e.preventDefault()
    await dispatch(approveMembership(group.id, userId))
  }

  return <button onClick={onClick}>Approve</button>
}

export default ApproveMembershipButton
