import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import Profile from './Profile'

export default function Signup(props) {
  // for controlled form (name, email, password)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // for flash message
  const [message, setMessage] = useState('')

  const handleSumbit = async e => {
    try { 
      e.preventDefault()
      // post to backend with form submission
      const requestBody = {
        name: name,
        email: email,
        password: password,
      }

      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/register`, requestBody)
      
      // destructure response
      const { token } = response.data

      // Save token to localStorage
      localStorage.setItem('jwtToken', token);

      // get user data from the token
      const decoded = jwt_decode(token)

      // set the current user in the top app state
      props.setCurrentUser(decoded)
      
    } catch(error) {
      // if the email was found in the db
      if(error.response.status === 400) {
        setMessage(error.response.data.msg)
      } else {
        // otherwise log the error for debug
        console.log(error)
      }
    }
  }

  // Navigate to the profile if the user is logged in
  if(props.currentUser) return <Navigate to='/profile' component={ Profile } currentUser={ props.currentUser } />

  return (
    <div>
      <h3>Registration Form:</h3>

      <p>{message}</p>

      <form onSubmit={handleSumbit}>
        <label htmlFor='name-input'>name:</label>

        <input
          id='name-input'
          type='text'
          placeholder='your name...'
          onChange={e => setName(e.target.value)}
          value={name}
        />

        <label htmlFor='email-input'>email:</label>

        <input
          id='email-input'
          type='email'
          placeholder='user@domain.com'
          onChange={e => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor='password-input'>password:</label>

        <input 
          id='password-input'
          type='password'
          placeholder='password'
          onChange={e => setPassword(e.target.value)}
        />

        <input 
          type='submit'
          value='login'
        />
      </form>
    </div>
  )
}