import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import ExerciseTable from "../components/ExerciseTable";

function HomePage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate()

    const loadExercises = async () => {
        const response = await fetch('/exercises')
        const data = await response.json()
        setExercises(data)
    }

    const onDelete = async (_id) => {
        const response = await fetch(
            `/exercises/${_id}`,
            {method: 'DELETE'}
        )
        if (response.status === 204) {
            setExercises(exercises.filter(item => item._id !== _id))
        } else {
            alert(`Failed to delete exercise ID: ${_id}, status code = ${response.status}`)
        }
    }

    const onEdit = (exercise) => {
        setExerciseToEdit(exercise)
        navigate('/edit-exercise')
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseTable>
        </>
    );
}

export default HomePage;