import express from "express";
import SessionModel from "../models/session.js";
import {isAuthenticated} from "../app.js";


const sessionRouter = express.Router();
sessionRouter.get("/available", isAuthenticated, async (req, res) => {
	try {
		const sessions = await SessionModel.find({startDate: {$lte: Date.now()}, endDate: {$gte: Date.now()}});
		return res.status(200).json(sessions.map((session) => session.serialize()));
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
		name: "test12345",
		password: "test",
		startDate: Date.now() - 1000 * 60 * 60 * 24 * 14,
		endDate: Date.now() + 1000 * 60 * 60 * 24 * 7,
		students: [],
		teachers: [req.user.id],
	});
	try {
		const savedSession = await newSession.save();
		return res.status(200).json(savedSession.serializeTeacher());
	} catch (e) {
		console.log(e);
		if (e.name === "ValidationError") {
			return res.status(400).json({message: e.message});
		}
		return res.status(500).json({message: "Internal server error"});
	}
});

sessionRouter.post("/new", isAuthenticated, async (req, res) => {
	if (!req.user.isTeacher()) {
		return res.status(403).json({message: "Forbidden"});
	}
	const {name, password, startDate, endDate} = req.body;
	let newSession = new SessionModel({
		name,
		password,
		startDate,
		endDate,
		teachers: [req.user.id],
	});
	try {
		const savedSession = await newSession.save();
		return res.status(200).json(savedSession.serializeTeacher());
	} catch (e) {
		console.log(e);
		if (e.name === "ValidatorError") {
			return res.status(400).json({message: e.message});
		}
		return res.status(500).json({message: "Internal server error"});
	}
});

sessionRouter.delete("/:id", isAuthenticated, async (req, res) => {
	if (!req.user.isTeacher()) {
		return res.status(403).json({message: "Forbidden"});
	}
	try {
		const session = await SessionModel.findById(req.params.id);
		if (!session) {
			return res.status(404).json({message: "Session not found"});
		}
		if (!session.teachers.includes(req.user.id)) {
			return res.status(403).json({message: "Forbidden"});
		}
		if (session.startDate < Date.now()) {
			return res.status(400).json({message: "Session already started"});
		}
		await SessionModel.deleteOne({_id: req.params.id});
		return res.status(200).json({message: "Session deleted"});
	} catch (e) {
		console.log(e);
		return res.status(500).json({message: "Internal server error"});
	}
});

sessionRouter.post("/:id/end", isAuthenticated, async (req, res) => {
	if (!req.user.isTeacher()) {
		return res.status(403).json({message: "Forbidden"});
	}
	try {
		const session = await SessionModel.findById(req.params.id);
		if (!session) {
			return res.status(404).json({message: "Session not found"});
		}
		if (!session.teachers.includes(req.user.id)) {
			return res.status(403).json({message: "Forbidden"});
		}
		if (session.endDate < Date.now()) {
			return res.status(400).json({message: "Session already ended"});
		}
		session.endDate = Date.now();
		await session.save();
		return res.status(200).json(session.serializeTeacher());
	} catch (e) {
		console.log(e);
		return res.status(500).json({message: "Internal server error"});
	}
});

sessionRouter.post("/:id/join", isAuthenticated, async (req, res) => {
	if (!req.user.isStudent()) {
		return res.status(403).json({message: "Forbidden"});
	}
	try {
		const session = await SessionModel.findById(req.params.id);
		if (!session) {
			return res.status(404).json({message: "Session not found"});
		}
		if (session.startDate > Date.now()) {
			return res.status(400).json({message: "Session not started"});
		}
		if (session.endDate < Date.now()) {
			return res.status(400).json({message: "Session already ended"});
		}
		if (session.students.includes(req.user.id)) {
			return res.status(400).json({message: "Already joined"});
		}
		session.students.push(req.user.id);
		await session.save();
		return res.status(200).json(session.serializeStudent());
	} catch (e) {
		console.log(e);
		return res.status(500).json({message: "Internal server error"});
	}
});


export default sessionRouter;
