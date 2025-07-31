import exercises from './data/exercisedata.mjs';
import Exercise from './exercise.mjs';
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_CLASS = 'Exercise';

let connection = undefined;
let exerciseModel = undefined;

async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        exerciseModel = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

function createModel(){

    const exerciseSchema = mongoose.Schema({ 
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, rquired: true}}, 
    {collection: 'exercise'});

    return mongoose.model(EXERCISE_CLASS, exerciseSchema); 
};

/**
 * Create an exercise
 * @param {string} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns
 */
async function createExercise(name, reps, weight, unit, date) {
    const exercise = new exerciseModel({name, reps, weight, unit, date});
    return await exercise.save();
}

/**
 * Retrieve all exercises
 * @returns 
 */
const findExercises = async(name) => {
    let query = exerciseModel.find();
    return await query.exec();
}

/**
 * Retrieve exercise based on the ID
 * @param {Object} exercise_id
 * @returns 
 */
const findExerciseById = async(exercise_id) => {
    const query = exerciseModel.findById(exercise_id);
    return await query.exec()
}

/**
 * Replace the title, year, language properties of the movie with the id value provided
 * @param {String} _id 
 * @param {string} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns Number of documents modified
 */

const replaceExercise = async(_id, name, reps, weight, unit, date) => {

    if (name !== undefined) {
        const query1 = await exerciseModel.updateOne({_id: _id}, {name: name})
    }
    if (reps !== undefined) {
        const query2 = await exerciseModel.updateOne({_id: _id}, {reps: reps});
    }
    if (weight !== undefined) {
        const query3 = await exerciseModel.updateOne({_id: _id}, {weight: weight});
    }
    if (unit !== undefined) {
        const query4 = await exerciseModel.updateOne({_id: _id}, {unit: unit});
    }
    if (date !== undefined) {
        const query4 = await exerciseModel.updateOne({_id: _id}, {date: date});
    }

    const query = exerciseModel.findById(_id);
    return await query.exec()
    
}


/**
 * Delete the movie with provided id value
 * @param {String} _id 
 * @returns Count of deleted documents
 */
const deleteById = async(_id) => {
    const result = await exerciseModel.deleteOne({_id: _id})
    return result
}

export {connect, createExercise, findExercises, findExerciseById, replaceExercise, deleteById };
