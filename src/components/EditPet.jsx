import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Client from '../services/api'


const EditPet = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    console.log(id)
    const [formData, setFormData] = useState({
        name: '',
        birthday: '',
        kind: '',
        gender: '',
        spayNeuterStatus: '',
    })

    useEffect(() => {
        const fetchPetDetails = async () => {
            try {
                const response = await Client.get(`/pet/${id}`)
                console.log(response.data)
                const petDetails = response.data
                setFormData({
                    name: petDetails.name || '',
                    birthday: formatDate(petDetails.birthday) || '',
                    kind: petDetails.kind || '',
                    gender: petDetails.gender || '',
                    spayNeuterStatus: petDetails.spayNeuterStatus || '',
                });
            } catch (error) {
            console.error('Error fetching pet details:', error)
        }
    }

        fetchPetDetails()
    }, [id])
    console.log(formData)
    const handleInputChange = (e) => {
        const { name, value } = e.target 

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            await Client.put(`/pet/${id}`, formData)
            navigate('/profile')
        } catch (error) {
            console.error('Error editing pet:', error)
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toISOString().split('T')[0];
    };

    return (
        <div>
            <h2>EditPet</h2>
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
                <button type="submit">Save Changes</button>
            </form>
        </div>
    )
}

export default EditPet