import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.getUser()

  const createdAt = new Date(data.user.created_at);
  const today = new Date();
  const diffTime = Math.abs(today - createdAt);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (error || !data?.user) {
    redirect("/login")
  } else if (data.user.user_metadata.paid === false) {
    if (diffDays > 3) {
      redirect("/payment")
    }
  }

  return <p>Hello {data.user.email}</p>
}