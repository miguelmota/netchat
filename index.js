var net = require('net');
var _ = require('lodash');
var clc = require('cli-color');
var EE = require('events').EventEmitter;

var clients = [];

var port = 9423;

net.createServer(function(socket) {

  var ee = new EE();
  var lineEntered = 0;

  socket.name = socket.remoteAddress + ':' + socket.remotePort

  socket.write(clc.green('Welcome, ' + socket.name + '\n'));
  socket.write('Type "quit" to exit.\n\n');
  socket.write(clc.yellow('Enter username: '));

  socket.on('data', function (data) {
    lineEntered += 1;
    var string = data.toString().trim();
    if (string.charCodeAt() === 65533 || string === 'quit') {
      ee.emit('quit');
      return;
    }
    if (lineEntered === 1) {
      socket.username = string || randUsername();
      clients.push(socket);
      socket.write(clc.green('You are now ' + socket.username) + '\n');
      broadcast(JSON.stringify({data: socket.username + ' joined the chat'}), socket);
    } else {
      broadcast(JSON.stringify({username: socket.username, data: string}), socket);
    }
    writeCursor.call(socket);
  });

  ee.on('quit', function() {
    socket.end('Goodbye.\n');
  });

  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    broadcast(JSON.stringify({data: socket.username + ' left.'}), null, true);
  });

  function broadcast(data, sender, alert) {
    try {
      data = JSON.parse(data)
    } catch(e) {
      throw e;
    }
    var message;
    if (data.username) {
      message = clc.cyan(data.username) + ': ' + clc.yellow(data.data);
    } else {
      if (alert)
        message = clc.red(data.data);
      else
        message = clc.green(data.data);
    }
    _.each(clients, function(client) {
      if (client === sender) return;
      client.write(message + '\n');
      writeCursor.call(client);
    });

    console.log(message);
  }

  function writeCursor() {
    this.write(clc.magenta('> '));
  }

  function randUsername() {
    return 'anonymous' + _.reduce(_.range(5), function(a, v, i) {
      return (a += _.random(9), a);
    }, '');
  }

}).listen(port);

process.on('SIGNINT', function() {
  process.exit();
});

console.log('Server running on port ' + port + '\n');
