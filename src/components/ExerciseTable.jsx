import TableRow from "./ExerciseTableRow";
import '../App.css'

function ExerciseTable({exercises, onDelete, onEdit}){
    return (
        <div>
            <table className='table-exercise'>
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Date</th>
                        <th>Repetitions</th>
                        <th>Weight</th>
                        <th>Units</th>
                    </tr>

                </thead>
                <tbody>
                    {exercises.map((exercise, index) => (<TableRow key={index} exercise={exercise} onDelete={onDelete} onEdit={onEdit}/>))}
                </tbody>              
            </table>


        </div>
    )
}

export default ExerciseTable;