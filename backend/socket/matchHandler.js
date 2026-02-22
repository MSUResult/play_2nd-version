export function handleChallengeAccept(io, onlineUsers, data) {
  const challenger = onlineUsers.get(data.from);
  const accepter = onlineUsers.get(data.to);

  if (!challenger || !accepter) return;

  const roomId = `room-${data.from}-${data.to}`;

  joinSockets(io, challenger.socketIds, roomId);
  joinSockets(io, accepter.socketIds, roomId);

  io.to(roomId).emit("matchStart", {
    roomId,
    players: [data.from, data.to],
  });
}

function joinSockets(io, socketIds, roomId) {
  socketIds.forEach((id) => {
    const sock = io.sockets.sockets.get(id);
    if (sock) sock.join(roomId);
  });
}
