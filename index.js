import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./database/db.database.js";
import { WebSocket, WebSocketServer } from 'ws';
import http from 'http';

dotenv.config({
    path: "./.env"
});

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server listen at port ${process.env.PORT}`);
    });
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

export const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

const PORT = process.env.WEB_PORT || 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});
