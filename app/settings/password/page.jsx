import React from 'react'
import { NewPassword } from "../../../components/pagesAsComponent/newPassword"
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

async function Password() {
  const supabase = createClient()
  const {data, error} = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    redirect("/login")
  } 
  return <NewPassword />
}

export default Password