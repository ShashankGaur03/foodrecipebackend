// const { Schema, SchemaTypes, model } = require("mongoose");

import { Schema, SchemaTypes, model } from "mongoose";

const recipeSchema = new Schema(
    {
        user: { type: SchemaTypes.ObjectId, ref: "User" },
        title: { type: String, required: true, index: true },
        description: { type: String, required: true, index: true },
        note: { type: String, index: true },
        ingredients: { type: String, required: true, index: true },
        image: {
            url: { type: String, required: true },
            id: { type: String, required: true }
        }
    },
    {
        timestamps: true,
        autoIndex: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const Recipe = model("Recipe", recipeSchema);

// module.exports = Recipe;
export { Recipe };