import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./socket/socket.js";

const app = express();

// use exact origin and credentials
const CLIENT_ORIGIN = "http://localhost:3000";

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Backend working" }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    credentials: true,
  },
});

socketHandler(io);

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
