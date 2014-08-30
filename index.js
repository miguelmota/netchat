var net = require('net');

var clients = [];

var port = 9423;

net.createServer(function(socket) {

  var lineEntered = 0;

  socket.name = socket.remoteAddress + ':' + socket.remotePort

  socket.write('Welcome,' + socket.name + '\n');
  socket.write('Type "quit" to exit.\n\n');
  socket.write('Enter username: ');

  socket.on('data', function (data) {
    lineEntered += 1;
    if (lineEntered === 1) {
      socket.username = data.toString().trim();
      clients.push(socket);
      broadcast(socket.username + ' joined the chat\n', socket);
    } else {
      if (data.toString().trim() === 'quit') {
        socket.end('Goodbye.\n');
        return;
      }
      broadcast(socket.username + ': ' + data, socket);
    }
    socket.write('> ');
  });

  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(socket.name + ' left.\n');
  });

  function broadcast(message, sender) {
    clients.forEach(function (client) {
      if (client === sender) return;
      client.write(message);
    });

    console.log(message)
  }

}).listen(port, '127.0.0.1');

console.log('Server running on port ' + port + '\n');
