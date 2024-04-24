import crypto from 'crypto';

async function getRawBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(data);
    });
  });
}

function verifySignature(body, signature, secret) {
  const hash = crypto.createHash('sha256').update(secret + body).digest('hex');
  return hash === signature;
}

export default async function POST (req, res) {
  if (req.method === 'POST') {
    const signature = req.headers['wappalyzer-signature'];
    const secret = process.env.CALLBACK_WAPPALYZER; // Votre secret de signature

    const body = await getRawBody(req);
    const isValid = verifySignature(body, signature, secret);

    if (isValid) {
      const data = JSON.parse(body); // Convertissez le corps brut en JSON
      // Traitez ici vos données reçues
      res.status(200).json({ message: 'Callback processed successfully', data });
    } else {
      res.status(403).json({ error: 'Invalid signature' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
