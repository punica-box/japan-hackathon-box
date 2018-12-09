// https://github.com/ontio/ontology-ts-sdk/blob/master/docs/en/identity_claim.md

const { Claim, Crypto } = require('ontology-ts-sdk');

const iss = 'AUr5QUfeBADq6BMY6Tp5yuMsUNGpsD7nLZ';
const sub = 'ANV1eKGmrPmzA39kW21KKYL8K36L6CaNwU';
const issuer  = `did:ont:${iss}`;
const subject = `did:ont:${sub}`;

const signature = null;
const useProof = false;
const claim = new Claim({
	messageId: `${issuer}_${subject}`,
	issuer,
	subject,
	issueAt: Math.floor(new Date().getTime() / 1000),
}, signature, useProof);
claim.content = {
  role: 'developer',
};

const url = 'http://127.0.0.1:20335';
const gasPrice = '500';
const gasLimit = '20000';
const payer = new Crypto.Address(iss);
const privateKey = new Crypto.PrivateKey('274b0b664d9c1e993c1d62a42f78ba84c379e332aa1d050ce9c1840820acee8b');
claim.revoke(url, gasPrice, gasLimit, payer, privateKey).then(result => {
  console.log(result);
});
