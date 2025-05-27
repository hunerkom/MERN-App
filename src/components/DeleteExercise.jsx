import { HiMiniMinusCircle } from "react-icons/hi2";

function DeleteExercise({exercise, onDelete}) {
  
    return(
        <>
            <a href="/" onClick={e => {e.preventDefault(), onDelete(exercise._id)}}><HiMiniMinusCircle/></a>
        </>
    )
}

export default DeleteExercise