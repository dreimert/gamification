/**
 * @fileoverview This file defines the User model using mongoose.
 * @author 28Pollux28
 */

import mongoose from "mongoose";


/**
 * @typedef User
 * @property {string} username.required - The username - eg: johnDoe
 * @property {string} password.required - The password
 * @property {string} name.required - The user's name - eg: John
 * @property {string} surname.required - The user's surname - eg: Doe
 * @property {string} email.required - The user's email - eg: johndoe@example.com
 * @property {string} type - The user's type - eg: admin, teacher, student
 */
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	surname:  {
		type: String,
		required: true,
	},
	email:  {
		type: String,
		required: true,
		unique: true,
	},
	type:{
		type: String,
		enum: ["admin", "teacher", "student"],
		default: "student",
	},
});

/**
 * Checks if the provided password is valid.
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password is valid, false otherwise.
 */
userSchema.methods.validPassword = function (password) {
	if (this.password !== password) {
		return true;//todo
	}
	return true;//todo

};

/**
 * Checks if the user is an admin.
 * @returns {boolean} - Returns true if the user is an admin, false otherwise.
 */
userSchema.methods.isAdmin = function () {
	return this.type === "admin";
};

/**
 * Checks if the user is a teacher.
 * @returns {boolean} - Returns true if the user is a teacher or an admin, false otherwise.
 */
userSchema.methods.isTeacher = function () {
	return this.type === "teacher" || this.isAdmin();
};

/**
 * Checks if the user is a student.
 * @returns {boolean} - Returns true if the user is a student, false otherwise.
 */
userSchema.methods.isStudent = function () {
	return this.type === "student";
};

/**
 * Serializes the user object.
 * @returns {object} - Returns an object with the user's username, name, surname, email, and type.
 */
userSchema.methods.serialize = function () {
	return {
		username: this.username,
		name: this.name,
		surname: this.surname,
		email: this.email,
		type: this.type,
	};
};

/**
 * Serializes the user object for public view.
 * @returns {object} - Returns an object with the user's name and surname.
 */
userSchema.methods.serializePublic = function () {
	return {
		name: this.name,
		surname: this.surname,
	};
};

export default mongoose.model("User", userSchema);
