import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';
import Navigation from './components/Navigation';

function App() {

  const[exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="app">
      <header>
        <h1>Ex Track Cise</h1>
        <p>Create exercises and track your workouts with this app. Quickly edit and delete exercises as needed.</p>
      </header>
        <Router>
          <Navigation/>
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}></Route>
            <Route path="/add-exercise" element={ <AddExercisePage />}></Route>
            <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit}/>}></Route>
          </Routes>
        </Router>
        <footer>© 2025 Mason Huerkoch</footer>
    </div>
  );
}

export default App;