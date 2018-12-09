// const http = require('http');
// const Ont = require('./node_modules/ontology-ts-sdk/lib/index.js')
//
// const hostname = '127.0.0.1';
// const port = 3000;
//
// const server = http.createServer(async (req, res) => {
//  
//
//
//
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//  
//   res.end('Hello World!!\n' + verified);
// });
//
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
//
const Ont = require('./node_modules/ontology-ts-sdk/lib/index.js')

var express = require('express')
var app = express()
let ejs = require('ejs')
 
app.get('/', function (req, res) {
  res.send('Hello World')
  res.send(html)
})

app.get('/verified', async function (req, res) {
  const did = "did:ont:AYmpvkUHi5GzkXbeMscrkkzGco9nyNGNjX"
  const url = 'ws://polaris1.ont.io:20335';
  const url2 = 'http://polaris1.ont.io:20334';
  const signed = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDpvbnQ6QVV2U21xbldERzVtc2VhZWNkY01mazN3OThyd3JLYW16SyNrZXlzLTEifQ.eyJqdGkiOiJjZXJ2ZXJpZmllZCIsImlzcyI6ImRpZDpvbnQ6QVV2U21xbldERzVtc2VhZWNkY01mazN3OThyd3JLYW16SyIsInN1YiI6ImRpZDpvbnQ6QUZ6bUJTenVBc3g5ZlZ2S1U5VG1RZFlXbXdEVE1qSHlMNCIsInZlciI6IjAuNy4wIiwiQGNvbnRleHQiOiJodHRwczovL2V4YW1wbGUuY29tL3RlbXBsYXRlL3YxIiwiY2xtIjp7ImV2ZW50Ijp7Im5hbWUiOiJPbnRvbG9neSBCbG9ja2NoYWluIEhhY2thdGhvbiBUb2t5byAjMSIsInVybCI6Imh0dHBzOi8vb250b2xvZ3kuY29ubnBhc3MuY29tL2V2ZW50LzEwNjY4NC8iLCJpbWFnZV91cmwiOiJodHRwczovL2Nvbm5wYXNzLXRva3lvLnMzLmFtYXpvbmF3cy5jb20vdGh1bWJzLzJhLzIyLzJhMjI4NDg5Nzg0NTlhMTI1OGQzOTk1OWRlYTg1ZWY4LnBuZyJ9LCJlbnRyeSI6eyJuYW1lIjoibW9zYSIsImltYWdlX3VybCI6Imh0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy8zNzg4MDAwMDAyMTQ3NTM1NDEvYjNmZGQ5MzAxNjNhMzMwYjY3MGE0NWI0ODM2MDY1NzRfNDAweDQwMC5qcGVnIn0sInRlYW0iOnsibmFtZSI6InRlYW1fc2F0b3NoaSIsIm1lbWJlcnMiOltdfSwic3VibWl0dGVkIjp7InVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9tb3Nhc2lydS9qYXBhbi1oYWNrYXRob24tYm94IiwidGl0bGUiOiJDZXJ2ZXJpZmllZCIsImRlc2NyaXB0aW9uIjoiYXR0ZXN0IHlvdSBhdHRlbmQgdGhlIGV2ZW50IiwiaW1hZ2VfdXJsIjoiIn0sImF3cmQiOnsidGl0bGUiOiJCZXN0IGF3YXJkIiwiZGVzY3JpcHRpb24iOiJiZXN0ISEhIiwiaW1hZ2VfdXJsIjoiIn19fQ.oFdVzIZRQ0Eq6ZP0jBARczOpaN0FOcndgdHDDsUO3IFpvA1q385Lxe1g-ppmPBJNO4KCD2g0J3TieDA89QLC-w"
  const claims = Ont.Claim.deserialize(signed);
  console.log(claims)
  var verified = await claims.verify(url2, false)

  template = `
    verified: <%= verified; %>
    claims: <%= claims %>
  `

  html = ejs.render(
    template,
    {
      claims: JSON.stringify(claims, null, 2),
      verified: verified,
    }
  );
  res.send(html)
})
 
app.listen(3000, function() {
  console.log('app listening on port 3000!');
});
