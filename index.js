import './config.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import fileUpload from 'express-fileupload';
import { connect } from 'mongoose';

import { authRouter, recipeRouter } from './src/routes/index.js';
import { authenticate } from './src/config/index.js';

// const { authRouter, recipeRouter } = require('./src/routes/index');
// const { authenticate } = require('./src/config/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(cors({
    origin: '*', // Allows all domains
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true // If using cookies or authentication
}));
app.use(helmet());

app.use(
    fileUpload({
        limits: { fileSize: 20 * 1024 * 1024 },
        abortOnLimit: true,
    })
);

app.use(passport.initialize());

// Passport config
authenticate(passport);

app.use('/auth', authRouter);
app.use('/recipe', recipeRouter);

app.get('/ping', (req, res) => {
    res.send("pong");
});

app.all('*', (req, res) => {
    res.status(404).json({ message: 'The route you requested is not found' });
});

const runDB = async () => {
    try {
        await connect(process.env.MONGODB_URI);
        console.log("Connected to database successfully");
    } catch (err) {
        console.error(`Error: ${err}`);
    }
};

runDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
