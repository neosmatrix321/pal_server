"use strict";

// import WebSocket from '../.././node_modules/ws/index.js';

// const ws = new WebSocket('wss://127.0.0.1:8080/');

// ws.on('error', console.error);

// ws.on('open', function open() {
//     heartbeat();
//   console.log('connected');
//   ws.send(Date.now());
// });
// ws.on('ping', heartbeat);

// ws.on('close', function close() {
//   console.log('disconnected');
//   clearTimeout(this.pingTimeout);
// });

// ws.on('message', function message(data) {
//   console.log(`Round-trip time: ${Date.now() - data} ms`);

//   setTimeout(function timeout() {
//     ws.send(Date.now());
//   }, 500);
// });