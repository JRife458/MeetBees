import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateGroupForm from './CreateGroupForm';

function CreateGroupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>CreateGroup</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateGroupForm />
        </Modal>
      )}
    </>
  );
}

export default CreateGroupFormModal;
