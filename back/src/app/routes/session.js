import express from "express";
import SessionModel from "../models/session.js";
import {isAuthenticated} from "../app.js";


const sessionRouter = express.Router();
sessionRouter.get("/available", isAuthenticated, async (req, res) => {
	try {
		const sessions = await SessionModel.find({startDate: {$lte: Date.now()}, endDate: {$gte: Date.now()}});
		return res.status(200).json(sessions.map((session) => session.serializeDefault()));
	} catch (e) {
		console.log(e);
		return res.status(500).json({message: "Internal server error"});
	}
});

sessionRouter.get("/all", isAuthenticated, async (req, res) => {
	if (req.user.isStudent()) {
		try {
			// Get active session or sessions that the student is enrolled in and that are done
			const sessions = await SessionModel.find({
				$or: [{
					startDate: {$lte: Date.now()},
					endDate: {$gte: Date.now()}
				}, {endDate: {$lte: Date.now()}, students: {$in: [req.user.id]}}]
			});
			return res.status(200).json(sessions.map((session) => session.serializeStudent()));
		} catch (e) {
			console.log(e);
			return res.status(500).json({message: "Internal server error"});
		}
	} else if (req.user.isAdmin()) {
		try {
			const sessions = await SessionModel.find({});
			return res.status(200).json(sessions.map((session) => session.serializeTeacher()));
		} catch (e) {
			console.log(e);
			return res.status(500).json({message: "Internal server error"});
		}
	} else if (req.user.isTeacher()) {
		try {
			const sessions = await SessionModel.find({teachers: {$in: [req.user.id]}});
			console.log(sessions);
			return res.status(200).json(sessions.map((session) => session.serializeTeacher()));
		} catch (e) {
			console.log(e);
			return res.status(500).json({message: "Internal server error"});
		}
	}
});
sessionRouter.get("/testNew", async (req, res) => {
	let newSession = new SessionModel({
		name: "test",
		startDate: Date.now() - 1000 * 60 * 60 * 24 * 14,
		endDate: Date.now() - 1000 * 60 * 60 * 24 * 7,
		students: [req.user.id],
		teachers: [req.user.id],
	});
	try {
		const savedSession = await newSession.save();
		return res.status(200).json(savedSession);
	} catch (e) {
		console.log(e);
		if (e.name === "ValidationError") {
			return res.status(400).json({message: e.message});
		}
		return res.status(500).json({message: "Internal server error"});
	}
});


export default sessionRouter;
