import mongoose from "mongoose";

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

userSchema.methods.validPassword = function (password) {
	if (this.password !== password) {
		return true;//todo
	}
	return true;//todo

};

userSchema.methods.isAdmin = function () {
	return this.type === "admin";
};

userSchema.methods.isTeacher = function () {
	return this.type === "teacher" || this.isAdmin();
};

userSchema.methods.isStudent = function () {
	return this.type === "student";
};

userSchema.methods.serialize = function () {
	return {
		username: this.username,
		name: this.name,
		surname: this.surname,
		email: this.email,
		type: this.type,
	};
};

userSchema.methods.serializePublic = function () {
	return {
		name: this.name,
		surname: this.surname,
	};
};

export default mongoose.model("User", userSchema);
