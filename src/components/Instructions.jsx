import React from 'react';
import Modal from 'react-modal';

const InstructionsModal = (props) => {
  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onClose} className="instructions-modal">
      <h2 className="instructions-modal__title">Site Instructions</h2>
      <p className="instructions-modal__text">Welcome to 🛹Find One And Skate, the premier online skateboarding community!  We're all about finding and sharing spots so you can level up your skills and expand your portfolio.</p>
      <p className="instructions-modal__text">Here are some tips to get started:</p>
      <ol className="instructions-modal__list">
        <li className="instructions-modal__list-item">Create an account to start posting and engaging with other users.</li>
        <li className="instructions-modal__list-item">Check out the spots on the map.</li>
        <li className="instructions-modal__list-item">Click on a pin to see the spot's details.</li>
        <li className="instructions-modal__list-item">Double click on a pin to upload your photos and videos.</li>
      </ol>
      <button className="instructions-modal__button" onClick={props.onClose}>Close</button>
    </Modal>
  );
};


export default InstructionsModal;
