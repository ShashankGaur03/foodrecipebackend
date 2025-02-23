// const { Schema, model, models } = require("mongoose");

import { Schema, SchemaTypes, model } from "mongoose";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true
        },
        password: { type: String, required: true, select: false }
    },
    {
        timestamps: true,
        autoIndex: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const User = model.User || model("User", userSchema);

// module.exports = User;
export { User };