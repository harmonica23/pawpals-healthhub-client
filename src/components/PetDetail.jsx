import { useEffect, useState } from 'react'
import Client from '../services/api'
import { useParams, Link, useNavigate } from 'react-router-dom'

const PetDetail = () => {
    let { id } = useParams()
    const navigate = useNavigate()

    const [pet, setPet] = useState({})
    const [diets, setDiets] = useState([])
    const [recentDiet, setRecentDiet] = useState({})
    const [age, setAge] = useState(null)

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Function to calculate age
    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthdateObj = new Date(birthdate);
        let age = today.getFullYear() - birthdateObj.getFullYear();
        const monthDiff = today.getMonth() - birthdateObj.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateObj.getDate())) {
            age--;
        }

        return age;
    };

    useEffect(() => {
        const fetchPet = async () => {
            const data = await Client.get(`/pet/${id}`);
            setPet(data.data);
            if (data.data.birthday) {
                setAge(calculateAge(data.data.birthday));
            }
        }

        const fetchDiets = async () => {
            const data = await Client.get(`/diet/pet/${id}`)
            setDiets(data.data)

            if (data.data.length > 0) {
                setRecentDiet(data.data[0]);
            }
        }
        fetchPet()
        fetchDiets()
    }, [id])

    // Function to handle the click event and navigate to the DietWtForm page
    const handleAddDietClick = () => {
        navigate(`/pet/${id}/diet`);
    };

//     return (
//         <div>
//             <h2>{pet.name}</h2>
//             <p>
//                 {pet.name} is a {age !== null && <span>{age} year old</span>} {pet.spayNeuterStatus} {pet.gender} {pet.kind} born on {formatDate(pet.birthday)}.
//             </p>
//             {diets.map((diet, index) => (
//                 <div key={index}>
//                     <p>{pet.name} eats {diet.cups} cup(s) of {diet.brand} {diet.frequency}.</p>
//                     <p>{pet.name} weighs {diet.weight} lbs.</p>
//                 </div>
//             ))}
//             <button onClick={handleAddDietClick}>Add Diet and Weight</button>
//         </div>
//     )
// }

return (
    <div>
        <h2>{pet.name}</h2>
        {/* Display the most recent diet and weight */}
        {recentDiet && (
            <div>
                <h3>Pet Summary</h3>
                <p>{pet.name} eats {recentDiet.cups} cup(s) of {recentDiet.brand} {recentDiet.frequency}.</p>
                <p>{pet.name} weighs {recentDiet.weight} lbs.</p>
            </div>
        )}

        <h3>Full History</h3>
        {/* Diet and Weight history table */}
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Diet</th>
                    <th>Weight</th>
                </tr>
            </thead>
            <tbody>
                {diets.map((diet, index) => (
                    <tr key={index}>
                        <td>{formatDate(diet.createdAt)}</td>
                        <td>{diet.cups} cup(s) {diet.brand} {diet.frequency}.</td>
                        <td>{diet.weight} lbs.</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <br />
        <button onClick={handleAddDietClick}>Add Diet and Weight</button>
    </div>
);
};

export default PetDetail