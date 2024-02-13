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
        <div>
            <h2>Add Diet Information</h2>
            <form onSubmit={handleSubmit}>
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
                    Feeding Notes:
                    <textarea name="feedingNotes" value={formData.feedingNotes} onChange={handleInputChange} maxLength="100" />
                </label>

                <label>
                    Pet Weight (lbs):
                    <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
export default DietWtForm