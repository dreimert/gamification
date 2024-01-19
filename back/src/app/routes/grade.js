import express from "express";
import { isAuthenticated, logger } from "../app.js";
import { Progression } from "../models/progression.js";
import Session from "../models/session.js";
import { getIndexGrades } from "../tp/indexGrades.js";

const gradeRouter = express.Router();

gradeRouter.get("/my", isAuthenticated, async (req, res) => {
    if (req.user.isStudent()) {
        try {
            const progressions = await Progression.find({ userId: req.user.id }).populate("sessionId");
            res.status(200).json(
                progressions.map((progression) => {
                    return {
                        sessionName: progression.sessionId.name,
                        tp: progression.sessionId.TP,
                        grade: progression.grade,
                        level: progression.level,
                        mean: progression.sessionId.meanGrades,
                        std: progression.sessionId.standDevGrades,
                        coefficient: 1,
                    };
                }),
            );
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(403).json({ message: "You should not be here" });
    }
});

gradeRouter.get("/all/:sessionId", isAuthenticated, async (req, res) => {
    if (req.user.isTeacher()) {
        try {
            const progressions = await Progression.find({ sessionId: req.params.sessionId }).populate("userId");
            res.status(200).json(
                progressions.map((progression) => {
                    return {
                        progressionId: progression._id,
                        studentName: progression.userId.name + " " + progression.userId.surname,
                        grade: progression.grade,
                        level: progression.level,
                        gradeOverriden: progression.teacherGradeOverride,
                        gradeComment: progression.teacherGradeComment,
                    };
                }),
            );
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(403).json({ message: "You are not allowed to access this resource" });
    }
});

gradeRouter.post("/resetGrade/:progressionId", isAuthenticated, async (req, res) => {
    if (req.user.isTeacher()) {
        try {
            const progression = await Progression.findById(req.params.progressionId).populate("sessionId");
            progression.grade = progression.sessionId.indexGrades.get(progression.level.toString());
            progression.teacherGradeOverride = false;
            progression.teacherGradeComment = "";
            await progression.save();
            res.status(200).json({ message: "Grade reset" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(403).json({ message: "You are not allowed to access this resource" });
    }
});

gradeRouter.post("/setGrade/:progressionId", isAuthenticated, async (req, res) => {
    if (req.user.isTeacher()) {
        try {
            const progression = await Progression.findById(req.params.progressionId);
            progression.grade = req.body.grade;
            progression.teacherGradeOverride = true;
            progression.teacherGradeComment = req.body.comment;
            await progression.save();
            res.status(200).json({ message: "Grade overriden" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(403).json({ message: "You are not allowed to access this resource" });
    }
});

gradeRouter.post("/setLevelGrade/:sessionId", isAuthenticated, async (req, res) => {
    if (req.user.isTeacher()) {
        try {
            const progressions = await Progression.find({ sessionId: req.params.sessionId }).populate("userId");
            const filtered = progressions.filter((progression) => progression.level === req.body.level);
            filtered.forEach((progression) => {
                if (progression.teacherGradeOverride === false) {
                    progression.grade = req.body.grade;
                    progression.save();
                }
            });
            const session = await Session.findById(req.params.sessionId);
            session.indexGrades.set(req.body.level.toString(), req.body.grade);
            await session.save();
            // Non modified progressions
            const nonModified = filtered.filter((progression) => progression.teacherGradeOverride === true);
            res.status(200).json(
                nonModified.map((progression) => {
                    return {
                        progressionId: progression._id,
                        studentName: progression.userId.name + " " + progression.userId.surname,
                        grade: progression.grade,
                        level: progression.level,
                        gradeOverriden: progression.teacherGradeOverride,
                        gradeComment: progression.teacherGradeComment,
                    };
                }),
            );
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(403).json({ message: "You are not allowed to access this resource" });
    }
});

gradeRouter.post("/removeLevelGrade/:sessionId", isAuthenticated, async (req, res) => {
    if (req.user.isTeacher()) {
        try {
            const progressions = await Progression.find({ sessionId: req.params.sessionId }).populate("userId");
            progressions.forEach((progression) => {
                if (progression.teacherGradeOverride === false) {
                    progression.grade = progression.sessionId.indexGrades.get(progression.level.toString());
                    progression.save();
                }
            });
            const session = await Session.findById(req.params.sessionId);
            session.indexGrades = new Map(getIndexGrades().get(session.TP)());
            await session.save();
            // Non modified progressions
            const nonModified = progressions.filter((progression) => progression.teacherGradeOverride === true);
            res.status(200).json(
                nonModified.map((progression) => {
                    return {
                        progressionId: progression._id,
                        studentName: progression.userId.name + " " + progression.userId.surname,
                        grade: progression.grade,
                        level: progression.level,
                        gradeOverriden: progression.teacherGradeOverride,
                        gradeComment: progression.teacherGradeComment,
                    };
                }),
            );
        } catch (err) {
            logger.error(err);
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(403).json({ message: "You are not allowed to access this resource" });
    }
});

export default gradeRouter;
