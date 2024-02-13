import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Client from '../services/api'


const EditPet = () => {
    const navigate = useNavigate()
    const { _id } = useParams()

    const [formData, setFormData] = useState({
        name: '',
        birthday: '',
        kind: '',
        gender: '',
        spayNeuterStatus: '',
    })




    return (
        <div>EditPet</div>
    )
}

export default EditPet