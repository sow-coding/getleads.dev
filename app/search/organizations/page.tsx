import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import Employees_ranges from '@/components/filters/employees_ranges/employees_ranges'

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
        <Employees_ranges />
    </>
  )
}