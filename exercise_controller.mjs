import 'dotenv/config';
import * as exercisesModel from './exercise_model.mjs';
import * as users from './exercise_model.mjs';
import express from 'express';
import asyncHandler from 'express-async-handler';


const PORT = process.env.PORT;

const ERROR_NOT_FOUND = {Error: 'Not found'}
const ERROR_INVALID_REQUEST = {Error: 'Invalid request'}

const app = express();

app.use(express.json());

app.listen(PORT, async()=>{
    await users.connect(false)
    console.log(`Server listening on port ${PORT}...`);
})

function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function validateData(name, reps, weight, unit, date){
    if (name === ''){
        return false
    } else if (typeof reps !== 'number' || reps < 1) {
        return false
    } else if (typeof weight !== 'number' || weight < 1) {
        return false    
    } else if (unit !== 'lbs' && unit !== 'kgs') {
        return false        
    } else if (isDateValid(date) !== true ) {
        return false        
    } else {
        return true
    }
}

/**
 * Create a new exercise with the required data from the body.
 */
app.post('/exercises', asyncHandler(async(req, res) => {
    if (validateData(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date) === true){
        const name = req.body.name
        const reps = req.body.reps
        const weight = req.body.weight
        const unit = req.body.unit
        const date = req.body.date
        const exercise = await exercisesModel.createExercise(name, reps, weight, unit, date);
        res.status(201).json(exercise)
    } else {
        res.status(400).json(ERROR_INVALID_REQUEST)
    }
    
}));

/**
 * Retrieve all exercises. 
 */
app.get('/exercises', asyncHandler(async(req, res) => {
    /*const exercises = exercisesModel.findExercises();*/
    const findexercise = await exercisesModel.findExercises(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    res.json(findexercise);
}));


/**
 * Retrieve the exercise corresponding to the ID.
 */
app.get('/exercises/:exercise_id', asyncHandler(async(req, res) => {
    const exercise = await exercisesModel.findExerciseById(req.params.exercise_id);
    if (exercise !== null) {
        res.json(exercise);
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));

/**
 * Update the exercise whose id is provided.
 */
app.put('/exercises/:exercise_id', asyncHandler(async(req, res) => {
    const name = req.body.name
    const reps = req.body.reps
    const weight = req.body.weight
    const unit = req.body.unit
    const date = req.body.date
    if (validateData(name, reps, weight, unit, date) === true) {

        const numUpdated = await exercisesModel.replaceExercise(req.params.exercise_id, name, reps, weight, unit, date)
        console.log(numUpdated)
        if (numUpdated !== null) {
            res.json({ _id: req.params.exercise_id, name: name, reps: reps, weight: weight, unit: unit, date: date })
        } else {
            res.status(404).json(ERROR_NOT_FOUND);
        }
    } else {
        res.status(400).json(ERROR_INVALID_REQUEST);    
    }

    
}));

/**
 * Delete the exercise whose id is provided.
 */
app.delete('/exercises/:exercise_id', asyncHandler(async(req, res) => {
    const deletedCount = exercisesModel.deleteById(req.params.exercise_id);
    if (deletedCount !== 1) {
        res.status(204).send();
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));

