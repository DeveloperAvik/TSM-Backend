import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";


let server: Server;

console.log("Hello World");

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/tour-management-system');

        console.log("Connected to MongoDB");

        server = app.listen(process.env.PORT, () => {
            console.log("Server is running");
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

startServer();

process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", promise, "reason:", reason);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception:", error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully.");
    if (server) {
        server.close(() => {
            console.log("Process terminated!");
        });
    } else {
        console.log("No server to close.");
    }
});
