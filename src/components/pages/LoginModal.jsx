import React, { useState } from "react";
import Login from "./Login";

const LoginModal = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleLoginClick}>Login</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <Login
              setCurrentUser={props.setCurrentUser}
              currentUser={props.currentUser}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
