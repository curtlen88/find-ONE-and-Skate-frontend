import { useState, useEffect } from 'react'
import { Navigate } from 'react'
import axios from 'axios'
import Login from './Login'

export default function Profile(props) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const privateMessage = async function() {
      try {
        // get the jwt from local storage
        const token = localStorage.getItem('jwtToken')
        // make auth headers
        const authHeaders = {
          'Authorization': token
        }
        // hit auth locked endpoint
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, { headers: authHeaders })
        // const response = await axios.get('/')
        console.log('👾',  process.env.REACT_APP_TEST)
        // console.log('response 👾', response.data)
        setMessage(response.data.msg)
      } catch(error) {
        console.log(error)
        // log the user out if the jwt doesn't pass the auth check
        props.handleLogout()
      }
    }
  
    privateMessage()
  }, [props])

  // if auth fails Navigate to login
  if(!props.currentUser) return <Navigate to='/login' component={ Login } currentUser={ props.currentUser } />

  return (
    <div>
      <h4>hello {props.currentUser.name}</h4>
      <h5>your email is {props.currentUser.email}</h5>

      <div>
      <p>you have a secret message from the auth locked route:</p>

      <p> {message} </p>
      </div>
    </div>
  )
}