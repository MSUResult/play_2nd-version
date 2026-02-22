import { io } from "socket.io-client"; // <--- ADD THIS LINE
export const socket = io("http://localhost:5000", {
  autoConnect: false,
  withCredentials: true, // ADD THIS LINE
});
