import { NavLink } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
    let userOptions
    if (user) {
        userOptions = (
            <nav>
                <NavLink onClick={handleLogOut} to="/">
                    Sign Out
                </NavLink>
            </nav>
        )
    }

    const publicOptions = (
        <nav>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/signin">Sign In</NavLink>
        </nav>
    )

    return (
        <header>
            <nav>
                <NavLink to="/" className="nav-link">
                    Home
                </NavLink>
                <NavLink to ="/pet" className="nav-link">
                    Add a Pet
                </NavLink>
                <NavLink to ="/profile" className="nav-link">
                    My Pet Index
                </NavLink>
                {user ? userOptions : publicOptions}
            </nav>
        </header>
    )
}

export default Nav