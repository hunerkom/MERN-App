import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate()

    const addExercise = async () => {
        
        const newExercise = {name, reps, weight, unit, date}
        
        const response = await fetch (
            '/exercises', {
                method: 'POST', 
                headers: {'Content-type': 'application/json'}, 
                body: JSON.stringify(newExercise)}
        )
        if (response.status === 201) {
            alert('Exercise Added')
        } else {
            alert('Failed to add exercise. Status: ' + response.status)
        }              
        
        navigate('/')
    };

    return (
        <div>
            <h1>Add an exercise here:</h1>
            <input className='myinput'
                type="text"
                placeholder="Enter exercise"
                value={name}
                onChange={e => setName(e.target.value)} 
                required/>
                <br></br>
            <input className='myinput'
                type="number"
                value={reps}
                placeholder="reps"
                onChange={e => setReps(e.target.valueAsNumber)} />
                <br></br>
            <input className='myinput'
                type="number"
                placeholder="weight"
                value={weight}
                onChange={e => setWeight(e.target.valueAsNumber)} />
                <br></br>
            <input className='myinput'
                type="text"
                value={unit}
                placeholder="units"
                onChange={e => setUnit(e.target.value)} />
                <br></br>
            <input className='myinput'
                type="text"
                placeholder="date MM-DD-YY"
                value={date}
                onChange={e => setDate(e.target.value)} />
                <br></br>

            <button className='mybutton'
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;