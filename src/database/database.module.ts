import mongoose from 'mongoose';
import { config } from '../config';

const mongoDB = config.value.db.url;
mongoose.connect(mongoDB);

const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => console.log('MongoDB connected'));

export default db;
