import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PendingMemberships from './PendingMemberships'

function PendingMembershipsModal({pending}) {
  const [showModal, setShowModal] = useState(false);
  const pendingArr = Object.values(pending)
  const pendingText = () => {
    switch (pendingArr.length) {
      case 0:
        return 'No Membership Requests'
      case 1:
        return '1 Membership Request'
      default:
        return `${pendingArr.length} Membership Requests`
  }

  }

  return (
    <>
      <button className='pending-memberships-button' onClick={() => setShowModal(true)}>{(() => {
        return pendingText()
      })()}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PendingMemberships
          pendingArr = {pendingArr}
          onClose = {() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default PendingMembershipsModal;
