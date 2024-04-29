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
  const userType = apiData['meta']['custom_data']['userType'];
  const orderType = apiData['meta']['custom_data']['orderType'];

  const { data: user, error } = await supabase.auth.admin.updateUserById(
    userId,
    { user_metadata: { 
      paid: true ,
      userType: userType,
    } }
  )
  if (error) {
    console.log("Error updating user: ", error.message, userId)
    return new Response(error.message, { status: 500 });
  }

  if (orderType === 'classicToPremium') {
    const { data, error } = await supabase.auth.admin.getUserById(userId)
    if (error) {
      console.log("Error getting user: ", error.message, userId)
      return new Response(error.message, { status: 500 });
    } else if (data.user.user_metadata?.userType === 'classic') {
      const { data, error } = await supabase.auth.admin.updateUserById(
        userId,
        { user_metadata: { 
          userType: 'premium',
        } }
      )
      if (error) {
        console.log("Error updating user from classic to Premium, mdr il croit je suis dumb", error.message, userId)
        return new Response(error.message, { status: 500 });
      }
    }
  }
  return new Response('OK');
}