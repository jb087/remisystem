const sockets = new Map();

exports.addUserSocket = (userId, socket) => {
    sockets.set(userId, socket);
} 

exports.deleteUserSocket = (userId) => {
    sockets.delete(userId);
} 

exports.sendNotification = (note) => {
    if (sockets.has(note.userId)) {
        sockets.get(note.userId).emit('reminder', { title: note.title, description: note.description });
    }
} 
