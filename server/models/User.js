/* 
* Boilerplate code for creating your mongoDB/mongoose Schemas
* See the link below for the docs:
* https://mongoosejs.com/docs/schematypes.html
*/
const mongoose = require("mongoose");
const Joi = require("joi"); // data validation library

STRING_MAX_LENGTH = 100;


// Define the schema of the "User" object
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String, // sets the type
      trim: true, // performs .trim(), which removes leading/trailing whitespace
      maxLength: STRING_MAX_LENGTH, // sets max lengths of strings to 100 characters
      required: true, // field data required to instantiate this schema
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,

      // // A custom validator (copied from models/Event.js) which checks if 
      // // certain conditions about the data are true
      // validate: { 
      //   validator: function (value) {
      //     condition1 = true; // Replace "true" with whatever conditions you want to check for
      //     condition2 = true;
      //     return condition1 && condition2; // if this returns true, the data is valid
      //   },
      // },
    },
  },
  // Enable timestamps for when each entry was created and last updated
  { timestamps: true }
);

// Saving our schema as a model
const User = mongoose.model("User", UserSchema);

// Schema for validating the recieved request.body when before a User object is instantiated.
const createUserSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  email: Joi.string().min(1).max(100).required(),
  password: Joi.string().min(1).max(100).required(),
  dateField: Joi.date()
    // Subtract one day because time on server may differ from client
    .min(new Date() - 60 * 60 * 24 * 1000)
    .required()
});

// Export our schemas to be used in other files
module.exports = {
  User,
  createUserSchema,
};
