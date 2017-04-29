const uuidv4 = require('uuid/v4');
const udp = require('dgram');

const server = udp.createSocket('udp4');

server.on('error', (err) => {
    console.log(`server error :\n$  {err.stack}`);
    server.close();
});

server.on('listening', () => {
    var address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

var args = process.argv;
var sound;

switch(args[2]) {
    case 'piano':
        sound = 'ti-ta-ti';
        break;
    case 'trumpet':
        sound = 'pouet';
        break;
    case 'flute':
        sound = 'trulu';
        break;
    case 'violin':
        sound = 'gzi-gzi';
        break;
    case 'drum':
        sound = 'boum-boum';
        break;
    default:
        sound = 'wouat'; 
        break;
}

var uuid = uuidv4();

setInterval(function() {
    var msg = JSON.stringify({
        'uuid' : uuid,
        'sound' : sound
    });

    server.send(msg, 0, msg.length, 2206, '230.1.1.39'); 
}, 1000);
