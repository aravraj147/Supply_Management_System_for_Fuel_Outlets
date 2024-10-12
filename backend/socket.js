import { Server } from 'socket.io';

let io;

export const initializeSocket = (server, corsOptions) => {
  io = new Server(server, {
    cors: corsOptions,
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
