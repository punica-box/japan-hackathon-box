// https://github.com/ontio/ontology-ts-sdk/blob/master/docs/en/identity_claim.md

const { Claim, Crypto } = require('ontology-ts-sdk');

const iss = 'AUr5QUfeBADq6BMY6Tp5yuMsUNGpsD7nLZ';
const sub = 'ANV1eKGmrPmzA39kW21KKYL8K36L6CaNwU';
const issuer  = `did:ont:${iss}`;
const subject = `did:ont:${sub}`;
const signature = null;
const useProof = false;
const claim = new Claim({
	// issuer,
	// subject,
	messageId: `${issuer}_${subject}`,
}, signature, useProof);


const url = 'http://127.0.0.1:20334';
claim.getStatus(url).then(result => {
  console.log(result);
}).catch(err => {
  console.error(err.toString());
});
