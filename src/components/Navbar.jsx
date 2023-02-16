import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import InstructionsModal from '../components/Instructions';

Modal.setAppElement('#root');

export default function Navbar(props) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [instructionsModalOpen, setInstructionsModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);
  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  const handleLogin = () => {
    closeLoginModal();
  };

  const handleLogout = () => {
    props.handleLogout();
  };

  const toggleInstructions = () => {
    setInstructionsModalOpen(!instructionsModalOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/">🛹FOAS</Link>
      <span onClick={toggleInstructions}>Instructions</span>
      {props.currentUser ? (
        <>
          
          <Link to="/profile">Profile</Link>

          <span onClick={handleLogout}>Log out</span>
        </>
      ) : (
        <>
          <span onClick={openLoginModal}>Login</span>
          <span onClick={openRegisterModal}>Register</span>
        </>
      )}
      
      <Modal isOpen={loginModalOpen} onRequestClose={closeLoginModal} className="custom-modal">
        <Login onClose={closeLoginModal} onLogin={handleLogin} setCurrentUser={props.setCurrentUser} currentUser={props.currentUser}/>
      </Modal>
      <Modal isOpen={registerModalOpen} onRequestClose={closeRegisterModal} className="custom-modal">
        <Register onClose={closeRegisterModal} setCurrentUser={props.setCurrentUser} currentUser={props.currentUser}/>
      </Modal>
      <InstructionsModal isOpen={instructionsModalOpen} className="custom-modal" onClose={toggleInstructions} />
    </nav>
  );
}
