import '../App.css'
import EditExercise from './EditExercise';
import DeleteExercise from './DeleteExercise'

function TableRow({exercise, onDelete, onEdit}) {
    return (
        <>
            <tr>
                <td>{exercise.name}</td>
                <td>{exercise.date}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.weight}</td>
                <td>{exercise.unit}</td>
                <td><EditExercise exercise={exercise} onEdit={onEdit}></EditExercise></td>
                <td><DeleteExercise exercise={exercise} onDelete={onDelete}></DeleteExercise></td>
            </tr>
        </>
    )
}

export default TableRow