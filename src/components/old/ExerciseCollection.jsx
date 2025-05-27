import ExerciseItem from './ExerciseItem';

function ExerciseCollection({exercises, onDelete, onEdit}) {
    return (
        <div className="collection-container">
            {exercises.map((exercise, i) => <ExerciseItem exercise={exercise} onDelete={onDelete} onEdit={onEdit}
                    key={i} />)}
        </div>

    );
}

export default ExerciseCollection;


            {/*import ExerciseCollection from '../components/ExerciseCollection';
            <ExerciseCollection exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseCollection>*/}