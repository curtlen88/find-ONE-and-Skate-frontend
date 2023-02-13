import {Link} from 'react-router-dom';

export default function Navbar(props) {
    const loggedIn = (
        <>
            <Link to="/"><span onClick={ props.handleLogout }>log out</span>🛹FOAS</Link>
            <br/>
            <Link to="/profile">Profile</Link>
            <br/>
            <Link to="/logout">Logout</Link>
            <br/>
        </>
    )

    const loggedOut = (
        <>
            <Link to="/">🛹FOAS</Link>
            <br/>
            <Link to="/login">Login</Link>
            <br/>
            <Link to="/register">Register</Link>
            <br/>
        </>
    )

    return (
        <>
            {props.currentUser ? loggedIn : loggedOut}
        </>
    )
}