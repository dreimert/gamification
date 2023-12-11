import mongoose from "mongoose";



mongoose.Promise = global.Promise;

export default {
	connect(connectionString) {
		mongoose.connect(connectionString).then(() => {
			console.log("Connected to MongoDB");
		}).catch(e => {
			//Fatal error, stop the application
			console.error("Error connecting to mongodb");
			console.error(e);
			process.exit(1);
		});
	}
};
