import https from "https";
import express from "express";
import session from "express-session";
import passport from "passport";
import SamlStrategy from "@node-saml/passport-saml";
import LocalStrategy from "passport-local";
import db from "./db/conn.js";
import * as fs from "fs";
import bodyParser from "body-parser";
import "dotenv/config";
import UserModel from "./models/user.js";
import cookieParser from "cookie-parser";
import mainRouter from "./routes/index.js";

let strategy = new SamlStrategy.Strategy(
	{
		callbackUrl: "https://6308-37-143-55-149.ngrok-free.app",
		entryPoint: "https://idauth.insa-lyon.fr/realms/insa-lyon/protocol/saml",
		issuer: "insa",
		cert: "null",
		signatureAlgorithm: "sha256",
	},
	function (profile, done) {
		return done(null, {
			profile,
		});
	},
	function (err, profile, done) {
		return done(err);
	}
);

strategy = new LocalStrategy({
	usernameField: "username",
	passwordField: "password",
},
async function (username, password, done) {
	// check if user exists in db and password is correct
	const user = await UserModel.findOne({username: username});
	if (!user) {
		// create user if dev mode
		if (process.env.ENV === "dev") {
			const newUser = new UserModel({
				username: username,
				password: password,
				name: "test",
				surname: "test",
				email: "abc@abc.com",
				type: "student",
			});
			await newUser.save();
			return done(null, newUser);
		}
		return done(null, false, {message: "Incorrect username."});
	}
	if (!user.validPassword(password)) {
		return done(null, false, {message: "Incorrect password."});
	}
	return done(null, user);
}
);
passport.serializeUser(function (user, done) {
	return done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
	try {
		const user = await UserModel.findById(id);
		if (user) {
			return done(null, user);
		}
		return done(null, false);
	} catch (e) {
		return done(e);
	}
});

passport.use(strategy);
const app = express();
const port = 3000;
const connectionString = process.env.MONGO_URI || "mongodb://root:example@localhost:27017";
db.connect(connectionString);
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: process.env.secret || "secret",
	resave: false,
	saveUninitialized: false,
}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

function setCreds(req, res, next) {
	if (process.env.ENV === "dev") {
		req.body.username = "test";
		req.body.password = "test";
	}
	next();
}

// if(process.env.ENV === "dev") {
// 	app.use(setCreds, passport.authenticate("local", {
// 		failureRedirect: process.env.FRONTEND_URL + "/login",
// 	}));
// }

app.get("/login", setCreds, passport.authenticate("local", {
	failureRedirect: process.env.FRONTEND_URL + "/login",
}), function (req, res) {
	res.send("<a href='/test'>test</a>");
});


export function isAuthenticated(req, res, next) {
	if (req.user) {
		return next();
	}
	return res.status(401).json({message: "Unauthorized", redirectURL: process.env.FRONTEND_URL + "/login"});
}

app.get("/test", isAuthenticated, function (req, res) {
	console.log("/test", req.user);
	res.send("Hello World!");
});

app.use("/api", mainRouter);

https.createServer(
	{
		key: fs.readFileSync("./selfsigned.key"),
		cert: fs.readFileSync("./selfsigned.crt"),
	}
	, app)
	.listen(port, () => {
		console.log("Server is running at port 3000");
	});
