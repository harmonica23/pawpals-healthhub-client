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

    const handleLogOutAndCloseMenu = () => {
        handleLogOut();
        closeMenu();
    };

    let userOptions
    if (user) {
        userOptions = (
            <>
                <NavLink to="/" className="nav-link" onClick={closeMenu}>
                    HOME
                </NavLink>
                <NavLink to="/profile" className="nav-link" onClick={closeMenu}>
                    MY PETS
                </NavLink>
                <NavLink to="/" className="nav-link" onClick={handleLogOutAndCloseMenu}>
                    SIGN OUT
                </NavLink>
            </>
        )
    }

    const publicOptions = (
        <>
            <NavLink to="/register" className="nav-link" onClick={closeMenu}>REGISTER</NavLink>
            <NavLink to="/signin" className="nav-link" onClick={closeMenu}>SIGN IN</NavLink>
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