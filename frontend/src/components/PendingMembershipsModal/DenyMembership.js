import { useDispatch, useSelector } from 'react-redux';
import { denyMembership } from '../../store/groups';

function DenyMembershipButton({userId}) {
  const dispatch = useDispatch()
  const group = useSelector(state => state.groups.singleGroup)

  const onClick = async (e) => {
    e.preventDefault()
    await dispatch(denyMembership(group.id, userId))
  }

  return <button onClick={onClick}>Deny</button>
}

export default DenyMembershipButton
