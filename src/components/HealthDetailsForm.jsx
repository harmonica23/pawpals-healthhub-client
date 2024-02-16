import { useState } from 'react';
import Client from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const HealthDetailsForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [healthDetails, setHealthDetails] = useState({
        vetConsult: {
            pet: id,
            date: '',
            visitType: '',
            description: '',
        },
        vax: {
            pet: id,
            name: '',
            dateGiven: '',
            nextDue: '',
        },
        med: {
            pet: id,
            name: '',
            dateStart: '',
            dateEnd: '',
            dose: '',
            frequency: '',
        },
        incident: {
            pet: id,
            date: '',
            incidentType: '',
            description: '',
        },
    });

    const handleInputChange = (category, e) => {
        const { name, value } = e.target;
        setHealthDetails(prevDetails => ({
            ...prevDetails,
            [category]: {
                ...prevDetails[category],
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Promise.all([
                Client.post(`/vetConsult`, healthDetails.vetConsult),
                Client.post(`/vax`, healthDetails.vax),
                Client.post(`/med`, healthDetails.med),
                Client.post(`/incident`, healthDetails.incident),
            ]);
            navigate(`/pet/${id}`);
        } catch (error) {
            console.error('Error adding health details:', error);
        }
    };

    return (
        <div className='profile-container'>
                    <h2>Veterinary Consult</h2>
            <form onSubmit={handleSubmit} className='add-pet-form'>
                {/* Veterinary Consult Section */}
                <div>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={healthDetails.vetConsult.date}
                            onChange={(e) => handleInputChange('vetConsult', e)}
                        />
                    </label>
                    <label>
                        Visit Type:
                        <select
                            name="visitType"
                            value={healthDetails.vetConsult.visitType}
                            onChange={(e) => handleInputChange('vetConsult', e)}
                        >
                            <option value="">Select Incident Type</option> {/* Optional: Prompt user to select an option */}
                            <option value="healthy">Healthy</option>
                            <option value="injury">Injury</option>
                            <option value="illness">Illness</option>
                            <option value="treatment">Treatment</option>
                            <option value="recheck">Recheck</option>
                            <option value="procedure">Procedure</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label>
                        Description: <br />
                        <textarea
                            name="description"
                            value={healthDetails.vetConsult.description}
                            onChange={(e) => handleInputChange('vetConsult', e)}
                            maxLength="1000"
                        />
                    </label>
                </div>
                {/* Vaccine Section */}
                <div>
                    <h3>Vaccine</h3>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={healthDetails.vax.name}
                            onChange={(e) => handleInputChange('vax', e)}
                        />
                    </label>
                    <label>
                        Date Given:
                        <input
                            type="date"
                            name="dateGiven"
                            value={healthDetails.vax.dateGiven}
                            onChange={(e) => handleInputChange('vax', e)}
                        />
                    </label>
                    <label>
                        Next Due:
                        <input
                            type="date"
                            name="nextDue"
                            value={healthDetails.vax.nextDue}
                            onChange={(e) => handleInputChange('vax', e)}
                        />
                    </label>
                </div>
                {/* Medication Section */}
                <div>
                    <h3>Medication</h3>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={healthDetails.med.name}
                            onChange={(e) => handleInputChange('med', e)}
                        />
                    </label>
                    <label>
                        Dose:
                        <input
                            type="text"
                            name="dose"
                            value={healthDetails.med.dose}
                            onChange={(e) => handleInputChange('med', e)}
                        />
                    </label>
                    <label>
                        Frequency:
                        <select
                            name="frequency"
                            value={healthDetails.med.frequency}
                            onChange={(e) => handleInputChange('med', e)}
                        >
                            <option value="">Select Frequency</option> {/* Optional: Prompt user to select an option */}
                            <option value="once a day">once a day</option>
                            <option value="twice a day">twice a day</option>
                            <option value="three times a day">three times a day</option>
                            <option value="four times a day">four times a day</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label>
                        Start Date:
                        <input
                            type="date"
                            name="dateStart"
                            value={healthDetails.med.dateStart}
                            onChange={(e) => handleInputChange('med', e)}
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            type="date"
                            name="dateEnd"
                            value={healthDetails.med.dateEnd}
                            onChange={(e) => handleInputChange('med', e)}
                        />
                    </label>
                </div>
                {/* Incident Section */}
                <div>
                    <h3>Problem, Incident, or Issue</h3>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={healthDetails.incident.date}
                            onChange={(e) => handleInputChange('incident', e)}
                        />
                    </label>
                    <label>
                        Incident Type:
                        <select
                            name="incidentType"
                            value={healthDetails.incident.incidentType}
                            onChange={(e) => handleInputChange('incident', e)}
                            required
                        >
                            <option value="">Select Incident Type</option> {/* Optional: Prompt user to select an option */}
                            <option value="injury">Injury</option>
                            <option value="illness">Illness</option>
                            <option value="diagnosis">Diagnosis</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={healthDetails.incident.description}
                            onChange={(e) => handleInputChange('incident', e)}
                            maxLength="1000"
                        />
                    </label>
                </div>
            </form>
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
        </div>
    );
};

export default HealthDetailsForm;
