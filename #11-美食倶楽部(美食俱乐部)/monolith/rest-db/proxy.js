const commander = require('commander');
const http = require('http');
const { Claim, Crypto, utils } = require('ontology-ts-sdk');

commander
  .version('0.0.1')
  .option('--port <port>')
  .option('--proxy-host <host>')
  .option('--proxy-port <port>')
  .option('--claim-issuer <issuer>')
  .option('--ont-api-origin <origin>', 'e.g. http://127.0.0.1:20334')
  .parse(process.argv);

const port = commander.port || 21982;
const { proxyHost, proxyPort, claimIssuer, ontApiOrigin } = commander; 
if (!proxyHost) {
  console.log('--proxy-host is required');
  process.exit(1);
}

if (!proxyPort) {
  console.log('--proxy-port is required');
  process.exit(1);
}

if (!claimIssuer || !ontApiOrigin) {
  console.log('--claim-issuer or --ont-api-origin is not specified, so do not authorize/authenticate requester');
}

async function hasPermission(req, iss) {
  const token = req.headers['session-token'];
  if (!token) {
    console.log('missing session token');
    return false;
  }

  const [account, _publicKey, _signature] = token.split(':');
  if (!account || !_publicKey || !_signature) {
    console.log('incomplete session token');
    return false;
  }

  let publicKey;
  let ontid;
  try {
    publicKey = Crypto.PublicKey.deserializeHex(new utils.StringReader(_publicKey))
    ontid = Crypto.Address.generateOntid(publicKey);
  } catch (e) {
    console.log('failed to decode public key');
    return false;
  }

  if (ontid !== `did:ont:${account}`) {
    console.log('address and public key does not match');
    return false;
  }

  let signature;
  try {
    signature = Crypto.Signature.deserializeHex(_signature);
  } catch (e) {
    console.log('failed to decode signature');
    return false;
  }

  const msg = utils.str2hexstr(account);
  const verified = publicKey.verify(msg, signature);
  if (!verified) {
    console.log('failed to verify signature');
    return false;
  }

  const issuer = `did:ont:${iss}`;
  const subject = `did:ont:${account}`;
  const useProof = false;
  const claim = new Claim({
    issuer,
    messageId: `${issuer}_${subject}`,
  }, null, useProof);
  
  try {
    const res = await claim.getStatus(ontApiOrigin);
    console.log('result', res);
    return res;
  } catch (e) {
    console.error('got exception', e);  
    return false;
  }
}

const server = http.createServer(async function (req, res) {
  console.log(`${req.method} ${req.url}`);

  if (req.method && req.method === 'OPTIONS') {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Session-Token",
      "Access-Control-Allow-Methods": "GET,POST,HEAD,OPTIONS,PUT,DELETE",
    });
    res.end();
    return;
  }

  if (claimIssuer) {
    console.log(req.headers['session-token']);
    if (!(await hasPermission(req, claimIssuer))) {
      const body = JSON.stringify({ error: 'authentication failed' });
      res.writeHead(403, { 'Content-Length': body.length });
      res.write(body);
      res.end();
      console.log('verification failed');
      return;
    }
  }

  const options = {
    hostname: proxyHost,
    port: proxyPort,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };
  const req2 = http.request(options, res2 => {
    res.writeHead(res2.statusCode, res2.headers);
    res2.on('data', chunk => res.write(chunk));
    res2.on('end', () => res.end());
  });

  req.on('data', chunk => req2.write(chunk));
  req.on('end', () => req2.end());
});

server.listen(port);
console.log(`listen on ${port}`);
