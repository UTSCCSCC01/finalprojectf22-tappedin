#!/usr/bin/env node
/**
 * Module dependencies.
 */
import debug from "debug";
import * as http from "http";
import * as dotenv from "dotenv";
import app from "./app";

// Config .env file
dotenv.config();
/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val: string) =>
{
    const port = parseInt(val, 10);
    if (Number.isNaN(port))
    {
        // named pipe
        return val;
    }
    if (port >= 0)
    {
        // port number
        return port;
    }
    return false;
};

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT ?? "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error: NodeJS.ErrnoException) =>
{
    if (error.syscall !== "listen")
    {
        throw error;
    }
    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code)
    {
    case "EACCES":
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
    case "EADDRINUSE":
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
    default:
        throw error;
    }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () =>
{
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr!.port}`;
    debug(`Listening on ${bind}`);
};
/**
 * Listen on provided port, on all network interfaces.
 */
console.log("nodp");
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
