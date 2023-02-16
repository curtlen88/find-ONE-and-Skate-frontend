import React from 'react';
import Modal from 'react-modal';

const InstructionsModal = (props) => {
  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onClose}>
      <h2>Site Instructions</h2>
      <p>Welcome to 🛹Find One And Skate, the premier online skateboarding community!  We're all about finding and sharing spots so you can level up your skills and expand your portfolio.</p>
      <p>Here are some tips to get started:</p>
      <ol>
        <li>Create an account to start posting and engaging with other users.</li>
        <li>Check out the spots on the map.</li>
        <li>Click on a pin to see the spot's details.</li>
        <li>Double click on a pin to upload your photos and videos.</li>
      </ol>
      <button onClick={props.onClose}>Close</button>
    </Modal>
  );
};

export default InstructionsModal;
