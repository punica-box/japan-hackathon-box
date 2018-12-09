import express from 'express';
import Claim from '../lib/claim';

const router = express.Router();

router.get('/attest', (req, res, next) => {
  res.render('admin/attest', { title: 'Attest Claim' });
});

router.post('/attest', async (req, res, next) => {
  const claim = new Claim(
    'did:ont:AUr5QUfeBADq6BMY6Tp5yuMsUNGpsD7nLZ',
    'did:ont:' + req.body.subject
  );
  const result = await claim.attest(
    'AUr5QUfeBADq6BMY6Tp5yuMsUNGpsD7nLZ',
    '274b0b664d9c1e993c1d62a42f78ba84c379e332aa1d050ce9c1840820acee8b'
  );
  res.json({ result: result });
});

module.exports = router;
