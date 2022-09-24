import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddGroupImageForm from './AddGroupImageForm';

function AddGroupImageFormModal({groupId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add a Group Image</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddGroupImageForm
          onClose={() => setShowModal(false)}
          groupId={groupId}/>
        </Modal>
      )}
    </>
  );
}

export default AddGroupImageFormModal;
