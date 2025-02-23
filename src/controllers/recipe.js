// const { Recipe } = require("../models/index");
// const { validateImageType } = require("../utils/index");
// const { upload } = require("../cloudinary/index");

import { Recipe } from "../models/index.js";
import { validateImageType } from "../utils/index.js";
import { upload } from "../cloudinary/index.js";

const CreateRecipe = async (req, res) => {
    if (!req?.user) {
        res.status(422).json({ error: "Unable to process your request." });
        return;
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({ error: "No files were uploaded." });
        return;
    }
    
    const image = req.files.image;
    if (!validateImageType(image)) {
        res.status(422).json({ error: "Image type not supported." });
        return;
    }

    // Cloudinary variables
    let imageUrl = '';
    let imageId = '';

    try {
        const result = await upload(image.data, "Images");
        if (result) {
            imageUrl = result.secure_url;
            imageId = result.public_id;
        }
    } catch (err) {
        console.error(err, "CLOUDINARY ERROR");
        res.status(500).json({ error: err });
        return;
    }

    const { title, note, description, ingredients } = req.body;

    try {
        const newRecipe = await Recipe.create({
            user: req.user,
            title,
            note,
            description,
            ingredients,
            image: { url: imageUrl, id: imageId }
        });
        res.status(201).json({ message: "Created successfully.", ...newRecipe._doc });
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while processing your request" });
        return;
    }
};

const SearchRecipe = async (req, res) => {
    const { q } = req.query;
    const pipeline = [
        {
            $search: {
                index: "recipe",
                text: {
                    query: q,
                    path: {
                        wildcard: "*"
                    },
                    fuzzy: {}
                }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
            }
        },
        {
            $project: {
                user: 1,
                note: 1,
                description: 1,
                title: 1,
                ingredients: 1,
                image: 1
            }
        }
    ];

    try {
        const recipes = await Recipe.aggregate(pipeline).sort({ _id: -1 }).exec();
        let response = [];

        if (recipes?.length) {
            response = recipes.map(recipe => {
                const { user, ...rest } = recipe;
                const email = user[0]?.email;
                return { user: email, ...rest };
            });
        }

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
};

const GetAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({}).populate("user", "email").sort({ _id: -1 }).exec();
        res.status(200).json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
};

const GetRecipe = async (req, res) => {
    const { id } = req.params;
    console.log("ID is: ", id);

    try {
        const recipe = await Recipe.findById(id).populate("user", "email").exec();
        if (!recipe) {
            res.status(404).json({ error: "Recipe not found." });
            return;
        }
        res.status(200).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
};

const GetUserRecipes = async (req, res) => {
    const { userId } = req.params;
    try {
        const recipes = await Recipe.find({ user: userId }).populate("user", "email").sort({ _id: -1 }).exec();
        if (!recipes?.length) {
            res.status(404).json({ error: "Recipe not found." });
            return;
        }
        res.status(200).json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
};

// module.exports = {
//     CreateRecipe,
//     SearchRecipe,
//     GetAllRecipes,
//     GetRecipe,
//     GetUserRecipes
// };

export { CreateRecipe, SearchRecipe, GetAllRecipes, GetRecipe, GetUserRecipes };