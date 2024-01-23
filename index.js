


const express = require('express');
const dns = require('dns');
const app = express();

const PORT = 4000;

app.get('/', async (req, res) => {
  const clientIpAddress = getClientIpAddress(req);
  const serverIpAddress = await getServerIpAddress();

  const response = {
    clientIpAddress,
    serverIpAddress,
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function getClientIpAddress(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  return forwardedFor ? forwardedFor.split(',')[0] : req.connection.remoteAddress;
}

async function getServerIpAddress() {
  try {
    // Use DNS resolution to get the public IP address
    const resolvedAddresses = await resolveDns('local.wishesfromsalman.com');
    return resolvedAddresses[0] || 'Unknown';
  } catch (error) {
    console.error('Error getting public IP address:', error.message);
    return 'Unable to retrieve public IP';
  }
}

function resolveDns(hostname) {
  return new Promise((resolve, reject) => {
    dns.resolve4(hostname, (err, addresses) => {  
      if (err) {
        reject(err);
      } else {
        resolve(addresses);
      }
    });
  });
}
