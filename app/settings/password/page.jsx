import React from 'react'
import { NewPassword } from "../../../components/pages/newPassword"
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

async function Password() {
  const supabase = createClient()
  const {data, error} = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect("/login")
  } else if (data.user.user_metadata.paid === false) {
    if (diffDays > 3) {
      redirect("/payment")
    }
  }
  return <NewPassword />
}

export default Password