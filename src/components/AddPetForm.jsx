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
        <div>
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
                <button type="submit">Add Pet</button>
            </form>
        </div>
    )

}

export default AddPetForm