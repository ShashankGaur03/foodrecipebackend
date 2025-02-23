// const { ExtractJwt, Strategy } = require('passport-jwt');
// const { User } = require('../models/index');

import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../models/index.js";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const authenticate = (passport) => {
    passport.use(
        new Strategy(options, async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload.id);
                if (user) {
                    return done(null, user?._id);
                }
                return done(null, false);
            } catch (err) {
                console.error(err);
                return done(err, false);
            }
        })
    );
};

// module.exports = { authenticate };
export { authenticate };