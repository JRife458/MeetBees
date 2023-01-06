import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PendingAttendance from './PendingAttendance';

function PendingAttendanceModal({pending}) {
  const [showModal, setShowModal] = useState(false);
  const pendingArr = Object.values(pending)
  const pendingText = () => {
    switch (pendingArr.length) {
      case 0:
        return 'No Attendance Requests'
      case 1:
        return '1 Attendance Request'
      default:
        return `${pendingArr.length} Attendance Requests`
  }

  }

  return (
    <>
      <button className='pending-attendance-button' onClick={() => setShowModal(true)}>{(() => {
        return pendingText()
      })()}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PendingAttendance
          pendingArr = {pendingArr}
          onClose = {() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default PendingAttendanceModal;
