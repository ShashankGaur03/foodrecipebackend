// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { User } = require('../models/user');
// const { CONSTANTS } = require('../constants/index');

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { CONSTANTS } from "../constants/index.js";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

const RegisterOrLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const _user = await User.findOne({ email }).select('+password').exec();
        if (_user) {
            if (!(await bcrypt.compare(password, _user?.password))) {
                res.status(400).json({ error: "Invalid email or password." });
                return;
            }
            const token = signToken(_user?._id);
            res.status(200).json({ token, email, id: _user?._id });
            return;
        }
        const newUser = await User.create({ email, password: await bcrypt.hash(password, CONSTANTS.SALT) });
        const token = signToken(newUser._id);

        res.status(201).json({ token, email: newUser?.email, id: newUser._id });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing your request." });
        return;
    }
};

// module.exports = { RegisterOrLogin };
export { RegisterOrLogin };