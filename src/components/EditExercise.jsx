import { HiMiniPencil } from "react-icons/hi2";

function EditExercise({exercise, onEdit}) {
  
    return(
        <>
            <a href="/" onClick={e => {e.preventDefault(), onEdit(exercise)}}><HiMiniPencil/></a>
        </>
    )
}

export default EditExercise