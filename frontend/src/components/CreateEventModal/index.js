import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateEventForm from './CreateEventForm';

function CreateEventFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Event</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateEventForm />
        </Modal>
      )}
    </>
  );
}

export default CreateEventFormModal;
