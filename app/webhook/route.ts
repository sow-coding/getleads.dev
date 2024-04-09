import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient()

  const crypto = require('crypto');

  const rawBody = await request.text()

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
  const signature = Buffer.from(request.headers.get('X-Signature') || '', 'utf8');

  if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error('Invalid signature.');
  }

  const apiData = JSON.parse(rawBody)

  const userId = apiData['meta']['custom_data']['nkn'];

  const { data: user, error } = await supabase.auth.admin.updateUserById(
    userId,
    { user_metadata: { paid: true } }
  )
  if (error) {
    console.log("Error updating user: ", error.message, userId)
    return new Response(error.message, { status: 500 });
  }
  return new Response('OK');
}