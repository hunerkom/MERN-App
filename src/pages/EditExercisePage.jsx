import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditMoviePage = ({exerciseToEdit}) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate()

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date}

        const response = await fetch (
            `/exercises/${exerciseToEdit._id}`, {
                method: 'PUT', 
                headers: {'Content-type': 'application/json'}, 
                body: JSON.stringify(editedExercise)}
        )
        if (response.status === 200) {
            alert('Exercise updated')
        } else {
            alert('Failed to update exercise. Status: ' + response.status)
        }
        navigate('/')
    };

    return (
        <div>
            <h1>Edit the exercise:</h1>
            <input className='myinput'
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
                <br></br>
            <input className='myinput'
                type="number"
                value={reps}
                onChange={e => setReps(e.target.valueAsNumber)} />
                <br></br>
            <input className='myinput'
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.valueAsNumber)} />
                <br></br>
            <input className='myinput'
                type="text"
                value={unit}
                onChange={e => setUnit(e.target.value)} />
                <br></br>
            <input className='myinput'
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)} />
                <br></br>

            <button className='mybutton'
                onClick={editExercise}
            >Update</button>
        </div>
    );
}

export default EditMoviePage;