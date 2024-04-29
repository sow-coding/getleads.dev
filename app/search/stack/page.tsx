import React from 'react'
import {StackPage} from "../../../components/pagesAsComponent/stack"
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

async function Stack() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return <StackPage />
}

export default Stack