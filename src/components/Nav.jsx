import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    let userOptions
    if (user) {
        userOptions = (
            <>
                <NavLink to="/" className="nav-link">
                    Home
                </NavLink>
                <NavLink to="/pet" className="nav-link">
                    Add a Pet
                </NavLink>
                <NavLink to="/profile" className="nav-link">
                    My Pets
                </NavLink>
                <NavLink onClick={handleLogOut} to="/" className="nav-link">
                    Sign Out
                </NavLink>
            </>
        )
    }

    const publicOptions = (
        <>
            <NavLink to="/register" className="nav-link" onClick={closeMenu}>Register</NavLink>
            <NavLink to="/signin" className="nav-link" onClick={closeMenu}>Sign In</NavLink>
        </>
    )

    return (
        <header>
            <nav className='navigation'>
            <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {user && userOptions}
                    {!user && publicOptions}
                </div>
            </nav>
        </header>
    )
}

export default Nav