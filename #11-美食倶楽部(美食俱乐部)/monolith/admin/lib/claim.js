// https://github.com/ontio/ontology-ts-sdk/blob/master/docs/en/identity_claim.md

import { Claim, Crypto } from 'ontology-ts-sdk';

export default class MyClaim {
  constructor (issuer, subject) {
    const signature = null;
    const useProof = false;
    this.claim = new Claim({
	    messageId: issuer + '/' + subject,
	    issuer: issuer,
	    subject: subject,
    }, signature, useProof);
  }
  async attest (payer, privateKey) {
    this.claim.issueAt = Math.floor(new Date() / 1000);
    const url = 'http://127.0.0.1:20335';
    const gasPrice = '500';
    const gasLimit = '20000';
    return await this.claim.attest(
      url,
      gasPrice,
      gasLimit,
      new Crypto.Address(payer),
      new Crypto.PrivateKey(privateKey)
    );
  }
}
