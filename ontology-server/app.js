const Ont = require('./node_modules/ontology-ts-sdk/lib/index.js')

var express = require('express')
var app = express()
let ejs = require('ejs')
 
app.get('/', function (req, res) {
  res.send('Hello World')
  res.send(html)
})
app.get('/verify', async function (req, res) {
  const did = "did:ont:AYmpvkUHi5GzkXbeMscrkkzGco9nyNGNjX"


//   signedClaims = `
// eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDpvbnQ6QVV2U21xbldERzVtc2VhZWNkY01mazN3OThyd3JLYW16SyNrZXlzLTEifQ.eyJqdGkiOiJjZXJ2ZXJpZmllZCIsImlzcyI6ImRpZDpvbnQ6QVV2U21xbldERzVtc2VhZWNkY01mazN3OThyd3JLYW16SyIsInN1YiI6ImRpZDpvbnQ6QUZ6bUJTenVBc3g5ZlZ2S1U5VG1RZFlXbXdEVE1qSHlMNCIsInZlciI6IjAuNy4wIiwiQGNvbnRleHQiOiJodHRwczovL2V4YW1wbGUuY29tL3RlbXBsYXRlL3YxIiwiY2xtIjp7ImV2ZW50Ijp7Im5hbWUiOiJPbnRvbG9neSBCbG9ja2NoYWluIEhhY2thdGhvbiBUb2t5byAjMSIsInVybCI6Imh0dHBzOi8vb250b2xvZ3kuY29ubnBhc3MuY29tL2V2ZW50LzEwNjY4NC8iLCJpbWFnZV91cmwiOiJodHRwczovL2Nvbm5wYXNzLXRva3lvLnMzLmFtYXpvbmF3cy5jb20vdGh1bWJzLzJhLzIyLzJhMjI4NDg5Nzg0NTlhMTI1OGQzOTk1OWRlYTg1ZWY4LnBuZyJ9LCJlbnRyeSI6eyJuYW1lIjoibW9zYSIsImltYWdlX3VybCI6Imh0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy8zNzg4MDAwMDAyMTQ3NTM1NDEvYjNmZGQ5MzAxNjNhMzMwYjY3MGE0NWI0ODM2MDY1NzRfNDAweDQwMC5qcGVnIn0sInRlYW0iOnsibmFtZSI6InRlYW1fc2F0b3NoaSIsIm1lbWJlcnMiOltdfSwic3VibWl0dGVkIjp7InVybCI6Imh0dHBzOi8vZ2l0aHViLmNvbS9tb3Nhc2lydS9qYXBhbi1oYWNrYXRob24tYm94IiwidGl0bGUiOiJDZXJ2ZXJpZmllZCIsImRlc2NyaXB0aW9uIjoiYXR0ZXN0IHlvdSBhdHRlbmQgdGhlIGV2ZW50IiwiaW1hZ2VfdXJsIjoiIn0sImF3cmQiOnsidGl0bGUiOiJCZXN0IGF3YXJkIiwiZGVzY3JpcHRpb24iOiJiZXN0ISEhIiwiaW1hZ2VfdXJsIjoiIn19fQ.oFdVzIZRQ0Eq6ZP0jBARczOpaN0FOcndgdHDDsUO3IFpvA1q385Lxe1g-ppmPBJNO4KCD2g0J3TieDA89QLC-w"
// `
//
      // <div class="admin-item clearfix" >
      //   <label class="admin-label" >signedClaims:</label>
      //   <textarea name='signedClaims' rows="20" cols="100" /><%= signedClaims %></textarea>
      // </div>
  template = `
    <form name="VerifyClaim" method="post">
      <div class="admin-item clearfix" >
        <label class="admin-label" >did:</label>
        <input name='did' value=<%= did %> size='60' />
      </div>
      <div class="admin-item clearfix">
        <input type='submit' class="button" value="Verify" />
      </div>
      </div>
    </form>
  `
  html = ejs.render(
    template,
    {did: did}

    // {signedClaims: signedClaims}
  )
  res.send(html)
})


const _ = require('lodash');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


async function getClaim(did) {
    const ddoUrl = 'https://polarisexplorer.ont.io/api/v1/explorer/ontid/' + did + '/20/1';

    const response = await fetch(ddoUrl);
    const json = await response.json();
    if (json.Error !== 0) {
        throw new Error('json.Error is ' + json.Error + ', expected 0. ' + JSON.stringify(json));
    }
    const ddo = json.Result.Ddo;
    // console.log(ddo);
    if (ddo.Attributes.length === 0) {
        throw new Error('No attribute in DDO: ' + JSON.stringify(ddo));
    }
    const targetAttr = _.find(ddo.Attributes, 'SelfDefined.cerverified');
    if (typeof targetAttr === 'undefined') {
        throw new Error('No cerverified attribute in DDO: ' + JSON.stringify(ddo.Attributes));
    }
    const cerverified = JSON.parse(targetAttr.SelfDefined.cerverified);
    const val =  Ont.Claim.deserialize(cerverified.Value);
    console.log("aaaaaaaa")
    console.log(val)
    console.log("aaaaaaaa")
    return val
    // return cerverified.Value.content;
}

app.post('/verify', async function (req, res) {
  // console.log(req.body.claim)
  const did = req.body.did
  const claim = await getClaim(did)

  const url = 'ws://polaris1.ont.io:20335';
  const url2 = 'http://polaris1.ont.io:20334';
  // const signed = req.body.signedClaims
  // const claim = Ont.Claim.deserialize(signed);
//   signed = `
// eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDpvbnQ6QVV2U21xbldERzVtc2VhZWNkY01mazN3OThyd3JLYW16SyNrZXlzLTEifQ.eyJqdGkiOiJjZXJ2ZXJpZmllZCIsImlzcyI6ImRpZDpvbnQ6QVV2U21xbldERzVtc2VhZWNkY01mazN3OThyd3JLYW16SyIsInN1YiI6ImRpZDpvbnQ6QUZ6bUJTenVBc3g5ZlZ2S1U5VG1RZFlXbXdEVE1qSHlMNCIsInZlciI6IjAuNy4wIiwiQGNvbnRleHQiOiJodHRwczovL2V4YW1wbGUuY29tL3RlbXBsYXRlL3YxIiwiY2xtIjp7Ik5hbWUiOiJZb3VyJTIwbmFtZSIsIlRlYW1OYW1lIjoiJXUzMEVBJXUzMERDJXU2MjU1JXUzMDQ0IiwiUHJvZ3JhbSI6eyJOYW1lIjoiT250b2xvZ3kgSGFja2F0aG9uIFRva3lvICMxIiwiVXJsIjoiaHR0cHM6Ly9vbnRvbG9neS5jb25ucGFzcy5jb20vZXZlbnQvMTA2Njg0LyIsIkltYWdlVXJsIjoiaHR0cHM6Ly9jb25ucGFzcy10b2t5by5zMy5hbWF6b25hd3MuY29tL3RodW1icy8yYS8yMi8yYTIyODQ4OTc4NDU5YTEyNThkMzk5NTlkZWE4NWVmOC5wbmciLCJEYXRlIjoiMjAxOC0xMi0wOSIsIklzc3VlciI6Ik9udG9sb2d5In19fQ.n3Xoy6BoF1HyXropKIYkSDITFPCEMZh6_vu4LrOTBnUG2zf1C6QpbiqyNa2BZrRG4dFWicOsKud6AGBD0U1Dlg
// `
  // const claim = Ont.Claim.deserialize(signed);

  var verified = await claim.verify(url2, false)

  template = `
    verified: <%= verified; %>
    claim: <%= claim %>
  `

  html = ejs.render(
    template,
    {
      claim: JSON.stringify(claim, null, 2),
      verified: verified,
    }
  );
  res.send(html)
})
 
app.listen(3000, function() {
  console.log('app listening on port 3000!');
});
