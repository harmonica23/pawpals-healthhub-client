import { useState } from 'react'
import { SignInUser } from '../services/auth'
import { useNavigate } from 'react-router-dom'

const SignIn = (props) => {
    let navigate = useNavigate()

    const [formValues, setFormValues] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = await SignInUser(formValues)
        setFormValues({ email: '', password: '' })
        props.setUser(payload)
        navigate('/profile')
    }

    return (
        <div className='signin-container'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        name="email"
                        type="email"
                        placeholder="example@example.com"
                        value={formValues.email}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        value={formValues.password}
                        required
                    />
                </div>
                <button className="signin-button" disabled={!formValues.email || !formValues.password}>
                    SIGN IN
                </button>
            </form>
        </div>
    )
}

export default SignIn
