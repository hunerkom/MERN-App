import {Link} from 'react-router-dom';
import '../App.css'

function Navigation(){
    return(
        <nav className="App-nav">
            <Link to='/' className='Link-nav'>Home</Link>
            <Link to='/add-exercise' className='Link-nav'>Add Exercise</Link>
        </nav>
    )
}

export default Navigation