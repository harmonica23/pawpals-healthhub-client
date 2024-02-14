import { useState } from 'react'
import Client from '../services/api'
import { useNavigate } from 'react-router-dom'


const AddPetForm = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        birthday: '',
        kind: '',
        gender: '',
        spayNeuterStatus: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await Client.post('/pet', formData);
            navigate('/profile')
        } catch (error) {
            console.error('Error adding pet:', error)
        }
    }

    return (
        <div className='add-pet-form'>
            <h2>Add a Pet</h2>
            <form onSubmit={handleSubmit}>
                {/* name */}
                <label>
                    Pet's Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                {/* DOB */}
                <label>
                    Birthday:
                    <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                {/* Kind */}
                <label>
                    Type:
                    <select
                        name="kind"
                        value={formData.kind}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Kind</option>
                        {["cat", "dog", "bird", "fish", "lizard", "snake", "rabbit", "hamster", "guinea pig", "ferret", "turtle", "other"].map((kind) => (
                            <option key={kind} value={kind}>
                                {kind}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                {/* Gender */}
                <label>
                    Gender:
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Gender</option>
                        {["male", "female", "unknown"].map((gender) => (
                            <option key={gender} value={gender}>
                                {gender}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                {/* Spay/Neuter Status */}
                <label>
                    Spay/Neuter Status:
                    <select
                        name="spayNeuterStatus"
                        value={formData.spayNeuterStatus}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Status</option>
                        {["spayed", "neutered", "intact"].map((spayNeuterStatus) => (
                            <option key={spayNeuterStatus} value={spayNeuterStatus}>
                                {spayNeuterStatus}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit" className='add-pet-button'>
                    <span className="button-content">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0H24V24H0z"></path>
                            <path
                                fill="currentColor"
                                d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z"
                            ></path>
                        </svg>
                        Add Pet
                    </span>
                </button>
            </form>
        </div>
    )

}

export default AddPetForm