import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	teachers: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "User",
		validate: [
			function (v) {
				return Array.isArray(v) && v.length > 0;
			},
			"There must be at least one teacher"
		],
		default: [],
	},
	students: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		default: [],
	}],
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
		validate: [
			function (value) {
				return this.startDate <= value;
			},
			"endDate must be after startDate"
		]
	},
	// TP: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "TP",
	// 	required: true,
	// },
});

sessionSchema.methods.serializeTeacher = function () {
	return {
		id: this.id,
		name: this.name,
		teachers: this.teachers,
		students: this.students,
		startDate: this.startDate,
		endDate: this.endDate,
		// TP: this.TP.map(e => e.serialize()),
		status: this.startDate <= Date.now() ? (this.endDate <= Date.now() ? "done" : "progressing") : "scheduled",
	};
};

sessionSchema.methods.serializeStudent = function () {
	return {
		id: this.id,
		name: this.name,
		teachers: this.teachers,
		startDate: this.startDate,
		endDate: this.endDate,
		// TP: this.TP.map(e => e.serialize()),
		status: this.startDate <= Date.now() && (this.endDate <= Date.now() ? "done" : "progressing")
	};
};

sessionSchema.methods.serialize = sessionSchema.methods.serializeStudent;

export default mongoose.model("Session", sessionSchema);
