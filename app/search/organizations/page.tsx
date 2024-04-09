import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function OrganizationSearch() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <>
        <h1>Organizations</h1>
        <p>Search for organizations</p>
    </>
  )
}