import ApproveMembershipButton from './ApproveMembership'
import DenyMembershipButton from './DenyMembership'

function PendingMemberships({pendingArr}) {

  return (
    <div className='pending-user-container'>
      <h2>Pending Memberships</h2>
      {!pendingArr.length && <h3>No Pending Requests</h3>}
      {pendingArr.map(user => (
        <div className='pending-user' key={user.id}>
          <p>{user.firstName} {user.lastName}</p>
          <ApproveMembershipButton userId={user.id}/>
          <DenyMembershipButton userId={user.id}/>
        </div>
      ))}
    </div>
  )
}

export default PendingMemberships
