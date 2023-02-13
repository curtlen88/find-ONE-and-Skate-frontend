import {Link} from 'react-router-dom';

export default function Navbar(props) {
    const loggedIn = (
        <>
            <Link to="/">🛹FOAS</Link>
                <br/>
            <Link to="/profile">Profile</Link>
                <br/>
            <Link to="/">
                <span onClick={ props.handleLogout }>log out</span>
            </Link>
        </>
    )

    const loggedOut = (
        <>
            <Link to="/">🛹FOAS</Link>
                <br/>
            <Link to="/login">Login</Link>
                <br/>
            <Link to="/register">Register</Link>
        </>
    )

    return (
        <>
            {props.currentUser ? loggedIn : loggedOut}
        </>
    )
}