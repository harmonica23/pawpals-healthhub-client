import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Client from '../services/api'


const Profile = ({ user }) => {
    let navigate = useNavigate()
    const [pets, setPets] = useState([])

    useEffect(() => {
        const fetchPets = async () => {
            if (user) {
                try {
                    const data = await Client.get('/pet')
                    setPets(data.data);
                } catch (error) {
                    console.error('Error fetching pets:', error)
                }
            }
        };

        fetchPets();
    }, [user]);

    const handleAddPetClick = () => {
        navigate(`/pet`);
    };

    return (
        <div>
            {user ? (
                <div>
                    <h3>Welcome, {user.email}!</h3>
                    {pets.map(pet => (
                        <div key={pet._id}>
                            <Link to={`/pet/${pet._id}`}>{pet.name}</Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="protected">
                    <h3>Oops! You must be signed in to do that!</h3>
                    <button onClick={() => navigate('/signin')}>Sign In</button>
                </div>
            )}
            <br />
            <button onClick={handleAddPetClick}>Add a Pet</button>
        </div>
    )
}

export default Profile