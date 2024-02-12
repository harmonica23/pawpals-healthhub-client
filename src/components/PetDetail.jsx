import { useEffect, useState } from 'react'
import Client from '../services/api'
import { useParams, useNavigate } from 'react-router-dom'

const PetDetail = () => {
    let { id } = useParams()
    const navigate = useNavigate()

    const [pet, setPet] = useState({})
    const [diets, setDiets] = useState([])
    const [recentDiet, setRecentDiet] = useState({})
    const [age, setAge] = useState(null)
    const [vetConsults, setVetConsults] = useState([])
    const [vax, setVax] = useState([])
    const [meds, setMeds] = useState([])
    const [incidents, setIncidents] = useState([])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString('en-US', options)
    };

    // Function to calculate age
    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthdateObj = new Date(birthdate)
        let age = today.getFullYear() - birthdateObj.getFullYear()
        const monthDiff = today.getMonth() - birthdateObj.getMonth()

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateObj.getDate())) {
            age--;
        }

        return age;
    };

    useEffect(() => {
        const fetchPet = async () => {
            const data = await Client.get(`/pet/${id}`)
            setPet(data.data);
            if (data.data.birthday) {
                setAge(calculateAge(data.data.birthday))
            }
        }

        const fetchDiets = async () => {
            const data = await Client.get(`/diet/pet/${id}`)
            setDiets(data.data)

            if (data.data.length > 0) {
                setRecentDiet(data.data[0]);
            }
        }

        const fetchVetConsults = async () => {
            const data = await Client.get(`/vetConsult/pet/${id}`)
            setVetConsults(data.data)
        }
        
        const fetchVax = async () => {
            const data = await Client.get(`/vax/pet/${id}`)
            setVax(data.data)
        }
        
        const fetchMeds = async () => {
            const data = await Client.get(`/med/pet/${id}`)
            setMeds(data.data)
        }
        
        const fetchIncidents = async () => {
            const data = await Client.get(`/incident/pet/${id}`)
            setIncidents(data.data)
        }

        fetchPet()
        fetchDiets()
        fetchVetConsults()
        fetchVax()
        fetchMeds()
        fetchIncidents()
    }, [id])

    // Function to handle the click event and navigate
    const handleAddDietClick = () => {
        navigate(`/pet/${id}/diet`)
    }

    const handleAddVetConsultClick = () => {
        navigate(`/pet/${id}/vetConsult`)
    }

    return (
        <div>
            <h2>{pet.name}</h2>
            {/* Display the most recent diet and weight */}
            {recentDiet && (
                <div>
                    <h3>Current Health Summary</h3>
                    <p>{pet.name} eats {recentDiet.cups} cup(s) of {recentDiet.brand} {recentDiet.frequency}.</p>
                    <p>{pet.name} weighs {recentDiet.weight} lbs.</p>
                </div>
            )}

            <h3>Diet & Weight History</h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Diet</th>
                        <th>Weight</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {diets.map((diet, index) => (
                        <tr key={index}>
                            <td>{formatDate(diet.createdAt)}</td>
                            <td>{diet.cups} cup(s) {diet.brand} {diet.frequency}</td>
                            <td>{diet.weight} lbs.</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />

            <h3>Veterinary Visit History</h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Visit Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {vetConsults.map((vetConsult, index) => (
                        <tr key={index}>
                            <td>{formatDate(vetConsult.date)}</td>
                            <td>{vetConsult.visitType}</td>
                            <td>{vetConsult.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>Vaccine</th>
                        <th>Date Given</th>
                        <th>Next Due</th>
                    </tr>
                </thead>
                <tbody>
                    {vax.map((vax, index) => (
                        <tr key={index}>
                            <td>{vax.name}</td>
                            <td>{formatDate(vax.dateGiven)}</td>
                            <td>{formatDate(vax.nextDue)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>Medication</th>
                        <th>Dose</th>
                        <th>Frequency</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {meds.map((vax, index) => (
                        <tr key={index}>
                            <td>{vax.name}</td>
                            <td>{formatDate(vax.dateGiven)}</td>
                            <td>{formatDate(vax.nextDue)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Incident Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {incidents.map((incident, index) => (
                        <tr key={index}>
                            <td>{formatDate(incident.date)}</td>
                            <td>{incident.incidentType}</td>
                            <td>{incident.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handleAddDietClick}>Add Diet and Weight</button>
            <br />
            <button onClick={handleAddVetConsultClick}>Add Vet Visit Details</button>
        </div>
    )
}

export default PetDetail;
