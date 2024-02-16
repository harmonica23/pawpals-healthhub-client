import { useState } from 'react'
import { RegisterUser } from '../services/auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    let navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await RegisterUser({
            userName: formValues.userName,
            email: formValues.email,
            password: formValues.password
        })
        setFormValues({
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
        navigate('/signin')
    }

    return (
            <div className='signin-container'>
                <form className="col" onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="userName">Name</label>
                        <input
                            onChange={handleChange}
                            name="userName"
                            type="text"
                            placeholder="John Smith"
                            value={formValues.userName}
                            required
                        />
                    </div>
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
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            value={formValues.password}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="confirmPassword"
                            value={formValues.confirmPassword}
                            required
                        />
                    </div>
                    <button className="signin-button"
                        disabled={
                            !formValues.email ||
                            (!formValues.password &&
                                formValues.confirmPassword === formValues.password)
                        }
                    >
                        SIGN UP
                    </button>
                </form>
            </div>
    )
}

export default Register
