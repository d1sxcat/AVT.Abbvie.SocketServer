#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app.js';
import debugLib from 'debug';
import { createServer } from "http";
import { Server } from "socket.io";
const debug = debugLib('avt.abbvie.socketserver:server');

/**
 * Get port from environment and store in Express.
 */

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: {
  origin: "http://localhost:5173"
} });

/**
 * Listen on provided port, on all network interfaces.
 */
io.on("connection", (socket) => {
  socket.on('slideEmmiter', (val) => {
    socket.emit('jumpToSlide',val)
  })
});

httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
