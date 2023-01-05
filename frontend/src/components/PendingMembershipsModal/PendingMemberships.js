import { useEffect } from 'react'
import ApproveMembershipButton from './ApproveMembership'
import DenyMembershipButton from './DenyMembership'

function PendingMemberships({pending}) {
  const pendingArr = Object.values(pending)

  return (
    <div>
      <h2>Pending Memberships</h2>
      {!pendingArr.length && <h3>No Pending Requests</h3>}
      {pendingArr.map(user => (
        <div key={user.id}>
          <p>{user.firstName}</p>
          <ApproveMembershipButton userId={user.id}/>
          <DenyMembershipButton userId={user.id}/>
        </div>
      ))}
    </div>
  )
}

export default PendingMemberships
