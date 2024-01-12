import mongoose from "mongoose";

const progressionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
        required: true,
    },
    level: {
        type: Number,
        required: true,
        default: 0,
    },
    grade: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 20,
    },
    teacherGradeOverride: {
        type: Boolean,
        required: true,
        default: false,
    },
    teacherGradeComment: {
        type: String,
        required: false,
    },
});

progressionSchema.methods.serialize = function () {
    return {
        userId: this.userId,
        sessionId: this.sessionId,
        level: this.level,
    };
};

export default mongoose.model("Progression", progressionSchema);
