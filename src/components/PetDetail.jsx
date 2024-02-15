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
    const [petImage, setPetImage] = useState('')

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        if (!dateString) {
            return ''; // Handle the case when dateString is null or undefined
        }

        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            // Handle the case when the date is invalid
            return 'Invalid Date';
        }

        return date.toLocaleDateString('en-US', options);
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

    const isBirthday = () => {
        if (pet.birthday) {
            const today = new Date();
            const birthday = new Date(pet.birthday);
            return today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate();
        }
        return false;
    };



    const handleDelete = async (category, entry) => {
        const { _id, pet } = entry;
        console.log(entry)
        try {
            await Client.delete(`/${category}/${_id}`);
            // Reload or update the data after deletion based on the category
            let petData
            switch (category) {
                case 'diet':
                    petData = await Client.get(`/diet/pet/${pet}`);
                    setDiets(petData.data);
                    break;
                case 'vetConsult':
                    petData = await Client.get(`/vetConsult/pet/${pet}`);
                    setVetConsults(petData.data);
                    break;
                case 'vax':
                    petData = await Client.get(`/vax/pet/${pet}`);
                    setVax(petData.data);
                    break;
                case 'med':
                    petData = await Client.get(`/med/pet/${pet}`);
                    setMeds(petData.data);
                    break;
                case 'incident':
                    petData = await Client.get(`/incident/pet/${pet}`);
                    setIncidents(petData.data);
                    break;
                // Add more cases for other categories if needed
                default:
                    break;
            }
        } catch (error) {
            console.error(`Error deleting ${category} entry:`, error);
        }
    };

    useEffect(() => {
        const fetchPet = async () => {
            const data = await Client.get(`/pet/${id}`)
            setPet(data.data)
            setPetImage(data.data.imageUrl)
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
            {pet && (
                <div className='top'>
                    <h2>All about {pet.name}...</h2>
                    {/* Display pet image here */}
                    {petImage && (
                        <img src={petImage} alt={`Image of ${pet.name}`} />
                    )}
                    {recentDiet && (
                        <div>
                            <p>{pet.name} eats {recentDiet.amount} of {recentDiet.brand} {recentDiet.frequency},
                                weighs {recentDiet.weight} lbs, and {age !== null && (
                                    `is ${age} years old.`
                                )}</p>

                            {isBirthday() && (
                                <p>Happy Birthday, {pet.name}! 🎉 It's your special day!</p>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className='all-tables'>
                <div>
                    <h3>Diet & Weight History</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Diet</th>
                                <th>Feeding Notes</th>
                                <th>Weight</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {diets.map((diet, index) => (
                                <tr key={index}>
                                    <td>{formatDate(diet.createdAt)}</td>
                                    <td>{diet.cups} cup(s) {diet.brand} {diet.frequency}</td>
                                    <td>{diet.feedingNotes}</td>
                                    <td>{diet.weight} lbs.</td>
                                    <td>
                                        {/* Delete button */}
                                        <button onClick={() => handleDelete('diet', diet)} className='bin-button'>
                                            <svg className="bin-top" viewBox="0 0 39 7" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4">
                                                </line>
                                                <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke="white" strokeWidth="3">
                                                </line>
                                            </svg>
                                            <svg className="bin-bottom" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="path-1-inside-1_8_19" fill="white">
                                                    <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" >
                                                    </path>
                                                </mask>
                                                <path d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" fill="white" mask="url(#path-1-inside-1_8_19)" >
                                                </path>
                                                <path d="M12 6L12 29" stroke="white" strokeWidth="4">
                                                </path>
                                                <path d="M21 6V29" stroke="white" strokeWidth="4">
                                                </path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <br />

                <div>
                    <h3>Veterinary Visit History</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Visit Type</th>
                                <th>Description</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vetConsults.map((vetConsult, index) => (
                                <tr key={index}>
                                    <td>{formatDate(vetConsult.date)}</td>
                                    <td>{vetConsult.visitType}</td>
                                    <td>{vetConsult.description}</td>
                                    <td>
                                        {/* Delete button */}
                                        <button onClick={() => handleDelete('vetConsult', vetConsult)} className='bin-button'>
                                            <svg className="bin-top" viewBox="0 0 39 7" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4">
                                                </line>
                                                <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke="white" strokeWidth="3">
                                                </line>
                                            </svg>
                                            <svg className="bin-bottom" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="path-1-inside-1_8_19" fill="white">
                                                    <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" >
                                                    </path>
                                                </mask>
                                                <path d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" fill="white" mask="url(#path-1-inside-1_8_19)" >
                                                </path>
                                                <path d="M12 6L12 29" stroke="white" strokeWidth="4">
                                                </path>
                                                <path d="M21 6V29" stroke="white" strokeWidth="4">
                                                </path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3>Vaccine History</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Vaccine</th>
                                <th>Date Given</th>
                                <th>Next Due</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vax.map((vax, index) => (
                                <tr key={index}>
                                    <td>{vax.name}</td>
                                    <td>{formatDate(vax.dateGiven)}</td>
                                    <td>{formatDate(vax.nextDue)}</td>
                                    <td>
                                        {/* Delete button */}
                                        <button onClick={() => handleDelete('vax', vax)} className='bin-button'>
                                            <svg className="bin-top" viewBox="0 0 39 7" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4">
                                                </line>
                                                <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke="white" strokeWidth="3">
                                                </line>
                                            </svg>
                                            <svg className="bin-bottom" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="path-1-inside-1_8_19" fill="white">
                                                    <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" >
                                                    </path>
                                                </mask>
                                                <path d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" fill="white" mask="url(#path-1-inside-1_8_19)" >
                                                </path>
                                                <path d="M12 6L12 29" stroke="white" strokeWidth="4">
                                                </path>
                                                <path d="M21 6V29" stroke="white" strokeWidth="4">
                                                </path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3>Incident History</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Incident Type</th>
                                <th>Description</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incidents.map((incident, index) => (
                                <tr key={index}>
                                    <td>{formatDate(incident.date)}</td>
                                    <td>{incident.incidentType}</td>
                                    <td>{incident.description}</td>
                                    <td>
                                        {/* Delete button */}
                                        <button onClick={() => handleDelete('incident', incident)} className='bin-button'>
                                            <svg className="bin-top" viewBox="0 0 39 7" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4">
                                                </line>
                                                <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke="white" strokeWidth="3">
                                                </line>
                                            </svg>
                                            <svg className="bin-bottom" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="path-1-inside-1_8_19" fill="white">
                                                    <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" >
                                                    </path>
                                                </mask>
                                                <path d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" fill="white" mask="url(#path-1-inside-1_8_19)" >
                                                </path>
                                                <path d="M12 6L12 29" stroke="white" strokeWidth="4">
                                                </path>
                                                <path d="M21 6V29" stroke="white" strokeWidth="4">
                                                </path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3>Medication History</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Medication</th>
                                <th>Dose</th>
                                <th>Frequency</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meds.map((med, index) => (
                                <tr key={index}>
                                    <td>{med.name}</td>
                                    <td>{med.dose}</td>
                                    <td>{med.frequency}</td>
                                    <td>{formatDate(med.dateStart)}</td>
                                    <td>{formatDate(med.dateEnd)}</td>
                                    <td>
                                        {/* Delete button */}
                                        <button onClick={() => handleDelete('med', med)} className='bin-button'>
                                            <svg className="bin-top" viewBox="0 0 39 7" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4">
                                                </line>
                                                <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke="white" strokeWidth="3">
                                                </line>
                                            </svg>
                                            <svg className="bin-bottom" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="path-1-inside-1_8_19" fill="white">
                                                    <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" >
                                                    </path>
                                                </mask>
                                                <path d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" fill="white" mask="url(#path-1-inside-1_8_19)" >
                                                </path>
                                                <path d="M12 6L12 29" stroke="white" strokeWidth="4">
                                                </path>
                                                <path d="M21 6V29" stroke="white" strokeWidth="4">
                                                </path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <button onClick={handleAddDietClick} className='button'>Add Diet and Weight</button>
            <button onClick={handleAddVetConsultClick} className='button'>Add Vet Visit Details</button>
        </div>
    )
}

export default PetDetail;
