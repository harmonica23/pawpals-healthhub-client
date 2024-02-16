import { useState } from 'react'
import Client from '../services/api'
import { useNavigate, useParams } from 'react-router-dom'


const DietWtForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const [formData, setFormData] = useState({
        brand: '',
        amount: '',
        frequency: '',
        feedingNotes: '',
        weight: '',
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
        const newDiet = {
            ...formData,
            pet: id,
        }
        try {
            await Client.post(`/diet`, newDiet);
            navigate(`/pet/${id}`)
        } catch (error) {
            console.error('Error adding diet:', error)
        }
    }


    return (
        <div className='profile-container'>
            <h2>Add Diet Information</h2>
            <form onSubmit={handleSubmit} className='diet-wt-form'>
                <label>
                    Brand:
                    <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required />
                </label>

                <label>
                    Amount:
                    <input type="text" name="amount" value={formData.amount} onChange={handleInputChange} required />
                </label>

                <label>
                    Frequency:
                    <select name="frequency" value={formData.frequency} onChange={handleInputChange} required>
                        <option value="">Select Frequency</option>
                        <option value="once a day">Once a day</option>
                        <option value="twice a day">Twice a day</option>
                        <option value="three times a day">Three times a day</option>
                        <option value="four times a day">Four times a day</option>
                        <option value="other">Other</option>
                    </select>
                </label>

                <label>
                    Feeding Notes: <br />
                    <textarea name="feedingNotes" value={formData.feedingNotes} onChange={handleInputChange} maxLength="100" />
                </label>

                <label>
                    Pet Weight (lbs):
                    <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} />
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
                        SUBMIT
                    </span>
                </button>
            </form>
        </div>
    );
};
export default DietWtForm