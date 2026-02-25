// Server-side Socket Logic
const onlineUsers = new Map();

// Helper to emit safe user data (without Set objects)
function emitOnlineUsers(io) {
  const usersArray = Array.from(onlineUsers.values()).map((u) => ({
    id: u.id,
    name: u.name,
    avatar: u.avatar,
  }));
  io.emit("onlineUsers", usersArray);
}

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // NEW USER
    socket.on("newUser", (user) => {
      // PERF FIX: Store the userId directly on the socket object
      socket.userId = user.id;

      const existingUser = onlineUsers.get(user.id);

      if (existingUser) {
        existingUser.socketIds.add(socket.id);
      } else {
        onlineUsers.set(user.id, {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          socketIds: new Set([socket.id]),
        });
      }

      emitOnlineUsers(io);
    });

    // CHALLENGE SEND
    socket.on("playerChallenging", (data) => {
      const targetUser = onlineUsers.get(data.to);
      if (!targetUser) return;

      targetUser.socketIds.forEach((socketId) => {
        io.to(socketId).emit("challengeReceived", {
          from: data.from,
        });
      });
    });

    // CHALLENGE ACCEPT
    socket.on("challengeAccept", (data) => {
      handleChallengeAccept(io, onlineUsers, data);
    });

    socket.on('playerMove', ({roomId , playerId, move}) => {
      socket.to(roomId).emit('opponentMove', {
        playerId,
        move
      })
    })


   socket.on("roundResult", ({ roomId, result }) => {
  io.to(roomId).emit("roundResultUpdate", result);
});





    // DISCONNECT
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // PERF FIX: Instant O(1) lookup instead of looping through all users
      const userId = socket.userId;
      if (userId) {
        const user = onlineUsers.get(userId);
        if (user) {
          user.socketIds.delete(socket.id);
          if (user.socketIds.size === 0) {
            onlineUsers.delete(userId);
          }
        }
      }

      emitOnlineUsers(io);
    });
  });
};

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
