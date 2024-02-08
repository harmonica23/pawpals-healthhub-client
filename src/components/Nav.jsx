import { NavLink } from 'react-router-dom'

const Nav = () => {

    return (
        <nav className="navbar">
            <div>
                <NavLink to="/">Home</NavLink>
            </div>
        </nav>
    )
}

export default Nav