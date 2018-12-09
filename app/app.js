const Ont = require('./node_modules/ontology-ts-sdk/lib/index.js');

const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
 
app.get('/hello', function (req, res) {
  res.send('Hello World');
  res.send(html);
})

app.use(express.static('.')); // TODO move static files to public for security

app.get('/verify', async function (req, res) {
  const did = "did:ont:AYmpvkUHi5GzkXbeMscrkkzGco9nyNGNjX";
  const template = `
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
  `;
  const html = ejs.render(
    template,
    {did: did}
  );
  res.send(html);
});


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
    if (ddo.Attributes.length === 0) {
        throw new Error('No attribute in DDO: ' + JSON.stringify(ddo));
    }
    const targetAttr = _.find(ddo.Attributes, 'SelfDefined.cerverified');
    if (typeof targetAttr === 'undefined') {
        throw new Error('No cerverified attribute in DDO: ' + JSON.stringify(ddo.Attributes));
    }
    const cerverified = JSON.parse(targetAttr.SelfDefined.cerverified);
    return Ont.Claim.deserialize(cerverified.Value);
}

app.post('/verify', async function (req, res) {
  try {
      const did = req.body.did
      const claim = await getClaim(did)

      const url = 'ws://polaris1.ont.io:20335';
      const url2 = 'http://polaris1.ont.io:20334';

      var verified = await claim.verify(url2, false)

      res.json({
        verified: verified,
        claim: claim,
      })

  } catch (error) {
      console.error(error);
    res.status(500).json({
      error: error.message
    })
  }
})
 
app.listen(3000, function() {
  console.log('app listening on port 3000!');
});
