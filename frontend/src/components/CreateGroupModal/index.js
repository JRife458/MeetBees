import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateGroupForm from './CreateGroupForm';
import './CreateGroup.css'

function CreateGroupFormModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className='create-group-button' onClick={() => setShowModal(true)}>Create Group</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateGroupForm/>
        </Modal>
      )}
    </>
  );
}

export default CreateGroupFormModal;
