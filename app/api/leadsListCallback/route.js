import crypto from 'crypto';

function verifySignature(body, signature, secret) {
  const hash = crypto.createHash('sha256').update(secret + body).digest('hex');
  return hash === signature;
}

export async function POST (req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  // Assurez-vous que le contenu est correctement traité en tant que 'raw'
  const rawBody = Buffer.from(req.body).toString();
  const signature = req.headers['wappalyzer-signature'];
  const secret = process.env.CALLBACK_WAPPALYZER; // Votre secret de signature

  if (!verifySignature(rawBody, signature, secret)) {
    res.status(403).json({ error: 'Invalid signature' });
    return;
  }

  // Si la signature est valide, parsez le corps et continuez
  try {
    const data = JSON.parse(rawBody); // Convertissez le corps brut en JSON
    res.status(200).json({ message: 'Callback processed successfully', data });
  } catch (err) {
    res.status(400).json({ error: 'Bad Request', details: err.message });
  }
}

// Assurez-vous que le middleware de Next.js ne parse pas le corps
export const config = {
  api: {
    bodyParser: false,
  },
};
