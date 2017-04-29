const udp = require('dgram');
const tcp = require('net');
const moment = require('moment');

const udpServer = udp.createSocket('udp4');
udpServer.bind(2206, function() {
    console.log("Joining multicast group 230.1.1.39");
    udpServer.addMembership('230.1.1.39');
});

const tcpServer = tcp.createServer(function(socket) {
    var musicians_to_send = [];

    musicians.forEach((musician) => {
        delete musician.lastActivity;
        musicians_to_send.push(musician);
    });

    socket.write(JSON.stringify(musicians_to_send, null, 4));
});

tcpServer.on('listening', () => {
    var address = tcpServer.address();
    console.log(`TCP Server listening on: ${address.address}:${address.port}`);
});

tcpServer.listen(2205, "0.0.0.0");

var musicians = new Map();

udpServer.on('listening', () => {
    var address = udpServer.address();
    console.log(`UDP Server listening on: ${address.address}:${address.port}`);
});

udpServer.on('error', (err) => {
    console.log(`UDP Server error:\n${err.stack}`);
    udpServer.close();
});

udpServer.on('message', (msg, rinfo) => {
    var musician_req = JSON.parse(msg);

    if(!musicians.has(musician_req.uuid)) {
        var now = moment().format();
        var musician_info = {
            "uuid": musician_req.uuid,
            "instrument": getInstrument(musician_req.sound),
            "activeSince": now, 
            "lastActivity": now
        }
        musicians.set(musician_req.uuid, musician_info);
    }
    else {
        var now = moment().format();
        var musician_info = musicians.get(musician_req.uuid);
        musician_info.lastActivity = now;
        musicians.set(musician_req.uuid, musician_info);
    }

    /* In any case, check last activity again in 5 sec. */
    setTimeout(function(uuid) {
        var musician_info = musicians.get(uuid);

        if(moment().diff(musician_info.lastActivity) > 5000) {
            musicians.delete(uuid);
        }
    }, 5000, musician_req.uuid);
});

function getInstrument(sound) {
    switch(sound) {
        case 'ti-ta-ti':
            return 'piano';
        case 'pouet':
            return 'trumpet';
        case 'trulu':
            return 'flute';            
        case 'gzi-gzi':
            return 'violin';            
        case 'boum-boum':
            return 'drum';
        default:
            return 'wouat'; 
    }
}

