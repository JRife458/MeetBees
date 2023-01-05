import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PendingMemberships from './PendingMemberships'

function PendingMembershipsModal({pending}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className='pending-memberships-button' onClick={() => setShowModal(true)}>Pending Memberships</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PendingMemberships
          pending = {pending}
          onClose = {() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default PendingMembershipsModal;
