import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import {SearchPage} from '@/components/pages/search'

export default async function OrganizationSearch() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return <SearchPage />
}