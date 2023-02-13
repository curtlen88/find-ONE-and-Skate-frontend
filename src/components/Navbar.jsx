import {Link} from 'react-router-dom';

export default function Navbar(currentUser, handleLogout) {
    const loggedIn = (
        <>
            <Link to="/">🛹FOAS</Link>
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
            {currentUser ? loggedIn : loggedOut}
        </>
    )
}