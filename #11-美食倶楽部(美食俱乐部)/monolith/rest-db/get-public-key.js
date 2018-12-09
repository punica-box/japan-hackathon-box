// https://github.com/ontio/ontology-ts-sdk/blob/master/docs/en/identity_claim.md

const { Claim, Crypto, retrievePublicKey, utils } = require('ontology-ts-sdk');

const url = 'http://127.0.0.1:20334';

const account = 'ANV1eKGmrPmzA39kW21KKYL8K36L6CaNwU';

main();

async function main() {
  const ontid = Crypto.Address.generateOntid(Crypto.PublicKey.deserializeHex(new utils.StringReader('03dd2acd18beb2a821a3a279f1df4557248aea83299d5f958faef0ef0550c981c5')));
  console.log(ontid);
  console.log(ontid === `did:ont:${account}` ? 'ok' : 'ng');

  const publicKey = Crypto.PublicKey.deserializeHex(new utils.StringReader('03dd2acd18beb2a821a3a279f1df4557248aea83299d5f958faef0ef0550c981c5'));
  console.log(publicKey);

  const sig = Crypto.Signature.deserializeHex('013aef2d8ac8b6495557e338d5502aeb7d08fd28b2c914c650ffb004e9bce8ce3011057a4a9b035102cad0ec4a985c9c698f182b47c9f9784c2cd93e57b29d2c5b');
  console.log(sig);
  const msg = utils.str2hexstr(account);
  console.log(publicKey.verify(msg, sig));
}
