import ApproveAttendanceButton from "./ApproveAttendance"
import DenyAttendanceButton from "./DenyAttendance"

function PendingAttendance({updateSwitch, pendingArr}) {

  return (
    <div className='pending-user-container'>
      <h2>Pending Attendance Requests</h2>
      {!pendingArr.length && <h3>No Pending Requests</h3>}
      {pendingArr.map(user => (
        <div className='pending-user' key={user.id}>
          <p>{user.firstName} {user.lastName}</p>
          <ApproveAttendanceButton updateSwitch={updateSwitch} userId={user.id}/>
          <DenyAttendanceButton updateSwitch={updateSwitch} userId={user.id}/>
        </div>
      ))}
    </div>
  )
}

export default PendingAttendance
