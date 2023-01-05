import socket from 'socket.io';

const io = socket(8000);

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        io.emit('message', data);
    });
});
    


